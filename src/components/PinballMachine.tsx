import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const FIELD_W = 210;
const FIELD_H = 360;
const BALL_R = 7;
const GRAVITY = 0.28;
const MAX_SPEED = 13;
const SH_DARK = "#04040e";
const SH_LIGHT = "#14142a";
const CABINET_BG = "#0d0d1f";

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const BUMPER_DEFS = [
  { x: 72, y: 88, r: 20, score: 100 },
  { x: 138, y: 72, r: 20, score: 100 },
  { x: 102, y: 138, r: 20, score: 100 },
  { x: 44, y: 178, r: 13, score: 50 },
  { x: 166, y: 166, r: 13, score: 50 },
];

const LEFT_GUIDE = { x1: 0, y1: 252, x2: 34, y2: 314 };
const RIGHT_GUIDE = { x1: FIELD_W, y1: 252, x2: FIELD_W - 34, y2: 314 };

const L_PIV = { x: 48, y: 328 };
const R_PIV = { x: 162, y: 328 };
const FLIPPER_LEN = 52;
const L_DOWN_A = Math.PI * 0.25;
const L_UP_A = -Math.PI * 0.23;
const R_DOWN_A = Math.PI - Math.PI * 0.25;
const R_UP_A = Math.PI + Math.PI * 0.23;

function flipperEndpoints(pivot: { x: number; y: number }, angle: number) {
  return {
    x1: pivot.x,
    y1: pivot.y,
    x2: pivot.x + Math.cos(angle) * FLIPPER_LEN,
    y2: pivot.y + Math.sin(angle) * FLIPPER_LEN,
  };
}

function closestOnSeg(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const dx = x2 - x1,
    dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return { x: x1, y: y1 };
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / len2));
  return { x: x1 + t * dx, y: y1 + t * dy };
}

interface GameState {
  ball: { x: number; y: number; vx: number; vy: number };
  leftUp: boolean;
  rightUp: boolean;
  prevLeftUp: boolean;
  prevRightUp: boolean;
  score: number;
  lives: number;
  bumpers: ((typeof BUMPER_DEFS)[number] & { flash: number })[];
  launched: boolean;
  gameOver: boolean;
  leftAngle: number;
  rightAngle: number;
}

function freshState(): GameState {
  return {
    ball: { x: FIELD_W - 13, y: 280, vx: 0, vy: 0 },
    leftUp: false,
    rightUp: false,
    prevLeftUp: false,
    prevRightUp: false,
    score: 0,
    lives: 3,
    bumpers: BUMPER_DEFS.map((b) => ({ ...b, flash: 0 })),
    launched: false,
    gameOver: false,
    leftAngle: L_DOWN_A,
    rightAngle: R_DOWN_A,
  };
}

export function PinballMachine({ neon }: { neon: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neonRef = useRef(neon);
  const gameRef = useRef<GameState>(freshState());
  const rafRef = useRef<number>(0);

  const [displayScore, setDisplayScore] = useState(0);
  const [displayLives, setDisplayLives] = useState(3);

  useEffect(() => {
    neonRef.current = neon;
  }, [neon]);

  const launch = useCallback(() => {
    const g = gameRef.current;
    if (g.gameOver) {
      const s = freshState();
      Object.assign(gameRef.current, s);
      gameRef.current.ball = { x: FIELD_W - 13, y: 270, vx: -1.5, vy: -9 };
      gameRef.current.launched = true;
      setDisplayScore(0);
      setDisplayLives(3);
    } else if (!g.launched) {
      g.ball = { x: FIELD_W - 13, y: 270, vx: -1.5, vy: -9 };
      g.launched = true;
    }
  }, []);

  // Keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (["ArrowLeft", "z", "Z", "a", "A"].includes(e.key)) g.leftUp = true;
      if (["ArrowRight", "x", "X", "d", "D"].includes(e.key)) g.rightUp = true;
      if (e.key === " ") {
        e.preventDefault();
        launch();
      }
    };
    const up = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (["ArrowLeft", "z", "Z", "a", "A"].includes(e.key)) g.leftUp = false;
      if (["ArrowRight", "x", "X", "d", "D"].includes(e.key)) g.rightUp = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [launch]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const tick = () => {
      const g = gameRef.current;
      const nc = neonRef.current;
      const nca = (a: number) => hexToRgba(nc, a);

      // Animate flipper angles (smooth lerp)
      const tL = g.leftUp ? L_UP_A : L_DOWN_A;
      const tR = g.rightUp ? R_UP_A : R_DOWN_A;
      g.leftAngle += (tL - g.leftAngle) * 0.35;
      g.rightAngle += (tR - g.rightAngle) * 0.35;

      const leftJust = !g.prevLeftUp && g.leftUp;
      const rightJust = !g.prevRightUp && g.rightUp;

      if (g.launched && !g.gameOver) {
        // Physics
        g.ball.vy += GRAVITY;
        g.ball.x += g.ball.vx;
        g.ball.y += g.ball.vy;

        // Wall collisions
        if (g.ball.x - BALL_R < 0) {
          g.ball.x = BALL_R;
          g.ball.vx = Math.abs(g.ball.vx) * 0.72;
        }
        if (g.ball.x + BALL_R > FIELD_W) {
          g.ball.x = FIELD_W - BALL_R;
          g.ball.vx = -Math.abs(g.ball.vx) * 0.72;
        }
        if (g.ball.y - BALL_R < 0) {
          g.ball.y = BALL_R;
          g.ball.vy = Math.abs(g.ball.vy) * 0.65;
        }

        // Guide walls
        for (const guide of [LEFT_GUIDE, RIGHT_GUIDE]) {
          const cp = closestOnSeg(
            g.ball.x,
            g.ball.y,
            guide.x1,
            guide.y1,
            guide.x2,
            guide.y2,
          );
          const ddx = g.ball.x - cp.x,
            ddy = g.ball.y - cp.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < BALL_R + 3 && dist > 0.01) {
            const nx = ddx / dist,
              ny = ddy / dist;
            g.ball.x = cp.x + nx * (BALL_R + 3);
            g.ball.y = cp.y + ny * (BALL_R + 3);
            const dot = g.ball.vx * nx + g.ball.vy * ny;
            g.ball.vx -= 1.5 * dot * nx;
            g.ball.vy -= 1.5 * dot * ny;
          }
        }

        // Bumpers
        for (const b of g.bumpers) {
          const ddx = g.ball.x - b.x,
            ddy = g.ball.y - b.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          const minD = BALL_R + b.r;
          if (dist < minD && dist > 0.01) {
            const nx = ddx / dist,
              ny = ddy / dist;
            g.ball.x = b.x + nx * (minD + 1);
            g.ball.y = b.y + ny * (minD + 1);
            const dot = g.ball.vx * nx + g.ball.vy * ny;
            g.ball.vx -= 2.4 * dot * nx;
            g.ball.vy -= 2.4 * dot * ny;
            const spd = Math.sqrt(g.ball.vx ** 2 + g.ball.vy ** 2);
            if (spd < 5.5) {
              g.ball.vx = nx * 6;
              g.ball.vy = ny * 6;
            }
            g.score += b.score;
            b.flash = 10;
            setDisplayScore(g.score);
          }
          if (b.flash > 0) b.flash--;
        }

        // Flippers
        const flippers = [
          { pivot: L_PIV, angle: g.leftAngle, justFired: leftJust },
          { pivot: R_PIV, angle: g.rightAngle, justFired: rightJust },
        ];
        for (const fl of flippers) {
          const ep = flipperEndpoints(fl.pivot, fl.angle);
          const cp = closestOnSeg(
            g.ball.x,
            g.ball.y,
            ep.x1,
            ep.y1,
            ep.x2,
            ep.y2,
          );
          const ddx = g.ball.x - cp.x,
            ddy = g.ball.y - cp.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          const THICK = BALL_R + 5;
          if (dist < THICK && dist > 0.01) {
            const nx = ddx / dist,
              ny = ddy / dist;
            g.ball.x = cp.x + nx * THICK;
            g.ball.y = cp.y + ny * THICK;
            const dot = g.ball.vx * nx + g.ball.vy * ny;
            if (dot < 0) {
              g.ball.vx -= 2 * dot * nx;
              g.ball.vy -= 2 * dot * ny;
            }
            if (fl.justFired) {
              g.ball.vy = Math.min(g.ball.vy - 7, -9);
              g.ball.vx += fl.pivot === L_PIV ? 2 : -2;
            }
          }
        }

        g.prevLeftUp = g.leftUp;
        g.prevRightUp = g.rightUp;

        // Speed cap
        const spd = Math.sqrt(g.ball.vx ** 2 + g.ball.vy ** 2);
        if (spd > MAX_SPEED) {
          g.ball.vx = (g.ball.vx / spd) * MAX_SPEED;
          g.ball.vy = (g.ball.vy / spd) * MAX_SPEED;
        }

        // Drain
        if (g.ball.y > FIELD_H + 40) {
          g.lives--;
          setDisplayLives(g.lives);
          if (g.lives <= 0) {
            g.gameOver = true;
            g.launched = false;
          } else {
            g.launched = false;
            g.ball = { x: FIELD_W - 13, y: 280, vx: 0, vy: 0 };
            setTimeout(() => {
              if (!gameRef.current.gameOver) {
                gameRef.current.ball = {
                  x: FIELD_W - 13,
                  y: 270,
                  vx: -1.5,
                  vy: -9,
                };
                gameRef.current.launched = true;
              }
            }, 900);
          }
        }
      } else {
        g.prevLeftUp = g.leftUp;
        g.prevRightUp = g.rightUp;
      }

      // ── DRAW ──
      ctx.clearRect(0, 0, FIELD_W, FIELD_H);

      // BG
      ctx.fillStyle = "#06060f";
      ctx.fillRect(0, 0, FIELD_W, FIELD_H);

      // Grid
      ctx.strokeStyle = nca(0.06);
      ctx.lineWidth = 0.5;
      for (let x = 0; x < FIELD_W; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, FIELD_H);
        ctx.stroke();
      }
      for (let y = 0; y < FIELD_H; y += 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(FIELD_W, y);
        ctx.stroke();
      }

      // Guide walls
      for (const guide of [LEFT_GUIDE, RIGHT_GUIDE]) {
        ctx.lineCap = "round";
        ctx.strokeStyle = nca(0.15);
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(guide.x1, guide.y1);
        ctx.lineTo(guide.x2, guide.y2);
        ctx.stroke();
        ctx.strokeStyle = nca(0.45);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(guide.x1, guide.y1);
        ctx.lineTo(guide.x2, guide.y2);
        ctx.stroke();
      }

      // Drain gutter hint
      ctx.strokeStyle = nca(0.12);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(FIELD_W / 2, FIELD_H - 24);
      ctx.lineTo(FIELD_W / 2, FIELD_H);
      ctx.stroke();
      ctx.setLineDash([]);

      // Bumpers
      for (const b of g.bumpers) {
        const flash = b.flash > 0;
        // Outer glow
        const grad = ctx.createRadialGradient(
          b.x,
          b.y,
          b.r * 0.2,
          b.x,
          b.y,
          b.r * (flash ? 2.8 : 2),
        );
        grad.addColorStop(0, nca(flash ? 0.8 : 0.3));
        grad.addColorStop(1, nca(0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * (flash ? 2.8 : 2), 0, Math.PI * 2);
        ctx.fill();
        // Body
        ctx.fillStyle = flash ? nc : "#10102a";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        // Ring
        ctx.strokeStyle = nca(flash ? 1 : 0.6);
        ctx.lineWidth = flash ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
        // Label
        ctx.fillStyle = flash ? "#000" : nca(0.7);
        ctx.font = `bold ${b.r > 15 ? 8 : 7}px "Orbitron", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.score.toString(), b.x, b.y);
      }

      // Flippers
      for (const { pivot, angle, up } of [
        { pivot: L_PIV, angle: g.leftAngle, up: g.leftUp },
        { pivot: R_PIV, angle: g.rightAngle, up: g.rightUp },
      ]) {
        const ep = flipperEndpoints(pivot, angle);
        ctx.lineCap = "round";
        // Glow
        ctx.strokeStyle = nca(up ? 0.35 : 0.15);
        ctx.lineWidth = 18;
        ctx.beginPath();
        ctx.moveTo(ep.x1, ep.y1);
        ctx.lineTo(ep.x2, ep.y2);
        ctx.stroke();
        // Body
        ctx.strokeStyle = nca(up ? 1 : 0.55);
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(ep.x1, ep.y1);
        ctx.lineTo(ep.x2, ep.y2);
        ctx.stroke();
        // Highlight
        ctx.strokeStyle = up ? "rgba(255,255,255,0.5)" : nca(0.2);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ep.x1, ep.y1);
        ctx.lineTo(ep.x2, ep.y2);
        ctx.stroke();
        // Pivot dot
        ctx.fillStyle = nc;
        ctx.beginPath();
        ctx.arc(pivot.x, pivot.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ball
      if (!g.gameOver || !g.launched) {
        // Glow
        const bg = ctx.createRadialGradient(
          g.ball.x,
          g.ball.y,
          0,
          g.ball.x,
          g.ball.y,
          BALL_R * 3.5,
        );
        bg.addColorStop(0, nca(0.6));
        bg.addColorStop(1, nca(0));
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(g.ball.x, g.ball.y, BALL_R * 3.5, 0, Math.PI * 2);
        ctx.fill();
        // Body
        const ballGrad = ctx.createRadialGradient(
          g.ball.x - 2,
          g.ball.y - 2,
          0.5,
          g.ball.x,
          g.ball.y,
          BALL_R,
        );
        ballGrad.addColorStop(0, "#ffffff");
        ballGrad.addColorStop(0.45, nc);
        ballGrad.addColorStop(1, nca(0.6));
        ctx.fillStyle = ballGrad;
        ctx.beginPath();
        ctx.arc(g.ball.x, g.ball.y, BALL_R, 0, Math.PI * 2);
        ctx.fill();
      }

      // Launch prompt
      if (!g.launched && !g.gameOver) {
        ctx.fillStyle = nca(0.35);
        ctx.font = "9px 'Orbitron', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("· TAP TO LAUNCH ·", FIELD_W / 2, FIELD_H - 28);
      }

      // Game over overlay
      if (g.gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(0, 0, FIELD_W, FIELD_H);
        ctx.fillStyle = nc;
        ctx.shadowColor = nc;
        ctx.shadowBlur = 22;
        ctx.font = "bold 17px 'Orbitron', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER", FIELD_W / 2, FIELD_H / 2 - 18);
        ctx.shadowBlur = 0;
        ctx.fillStyle = nca(0.45);
        ctx.font = "9px 'Orbitron', monospace";
        ctx.fillText("TAP TO RESTART", FIELD_W / 2, FIELD_H / 2 + 12);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const neuFlat = () => ({
    background: CABINET_BG,
    boxShadow: `6px 6px 16px ${SH_DARK}, -6px -6px 16px ${SH_LIGHT}`,
  });

  const neuInset = () => ({
    background: "#08081a",
    boxShadow: `inset 5px 5px 12px ${SH_DARK}, inset -5px -5px 12px ${SH_LIGHT}`,
  });

  return (
    <div
      className="flex flex-col items-center"
      style={{
        width: 258,
        ...neuFlat(),
        borderRadius: 30,
        padding: "16px 14px 18px",
        border: `1px solid ${hexToRgba(neon, 0.12)}`,
        transition: "border-color 0.8s ease",
        flexShrink: 0,
      }}
    >
      {/* Machine name header */}
      <div
        className="w-full text-center mb-2"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "0.5rem",
          letterSpacing: "0.22em",
          color: hexToRgba(neon, 0.4),
          textShadow: `0 0 8px ${hexToRgba(neon, 0.3)}`,
        }}
      >
        ∴ NEURO-BALL 2050 ∴
      </div>

      {/* Backglass score panel */}
      <div
        className="w-full rounded-2xl px-4 py-3 mb-3 flex flex-col items-center gap-1.5"
        style={{ ...neuInset(), border: `1px solid ${hexToRgba(neon, 0.1)}` }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.42rem",
            letterSpacing: "0.2em",
            color: hexToRgba(neon, 0.45),
          }}
        >
          SCORE
        </div>
        <motion.div
          key={displayScore}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: "1.25rem",
            color: neon,
            textShadow: `0 0 14px ${neon}, 0 0 28px ${hexToRgba(neon, 0.4)}`,
            letterSpacing: "0.1em",
          }}
          initial={{ scale: 1.4, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 14 }}
        >
          {displayScore.toString().padStart(6, "0")}
        </motion.div>

        {/* Lives dots */}
        <div className="flex gap-2 mt-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i < displayLives ? neon : hexToRgba(neon, 0.15),
                boxShadow: i < displayLives ? `0 0 7px ${neon}` : "none",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Playfield canvas */}
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          ...neuInset(),
          padding: 9,
          border: `1px solid ${hexToRgba(neon, 0.1)}`,
        }}
        onClick={launch}
      >
        {/* Corner bracket decorations */}
        {[
          "top-2 left-2",
          "top-2 right-2 rotate-90",
          "bottom-2 left-2 -rotate-90",
          "bottom-2 right-2 rotate-180",
        ].map((cls, i) => (
          <div key={i} className={`absolute ${cls} pointer-events-none z-10`}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1 5 L1 1 L5 1"
                stroke={neon}
                strokeWidth="1"
                strokeOpacity="0.4"
              />
            </svg>
          </div>
        ))}
        <canvas
          ref={canvasRef}
          width={FIELD_W}
          height={FIELD_H}
          style={{ display: "block", borderRadius: 10 }}
        />
      </div>

      {/* Flipper buttons */}
      <div className="flex items-center justify-between w-full mt-3 px-1">
        <motion.button
          className="rounded-full cursor-pointer select-none outline-none flex items-center justify-center gap-1"
          style={{
            width: 80,
            height: 34,
            ...neuFlat(),
            border: `1px solid ${hexToRgba(neon, 0.18)}`,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.48rem",
            letterSpacing: "0.08em",
            color: hexToRgba(neon, 0.7),
            transition: "color 0.1s",
          }}
          onMouseDown={() => {
            gameRef.current.leftUp = true;
          }}
          onMouseUp={() => {
            gameRef.current.leftUp = false;
          }}
          onMouseLeave={() => {
            gameRef.current.leftUp = false;
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            gameRef.current.leftUp = true;
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            gameRef.current.leftUp = false;
          }}
          whileTap={{
            scale: 0.93,
            boxShadow: `inset 4px 4px 10px ${SH_DARK}, inset -4px -4px 10px ${SH_LIGHT}`,
          }}
        >
          ◄ LEFT
        </motion.button>

        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.38rem",
            letterSpacing: "0.08em",
            color: hexToRgba(neon, 0.25),
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          Z / ←<br />X / →
        </div>

        <motion.button
          className="rounded-full cursor-pointer select-none outline-none flex items-center justify-center gap-1"
          style={{
            width: 80,
            height: 34,
            ...neuFlat(),
            border: `1px solid ${hexToRgba(neon, 0.18)}`,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.48rem",
            letterSpacing: "0.08em",
            color: hexToRgba(neon, 0.7),
            transition: "color 0.1s",
          }}
          onMouseDown={() => {
            gameRef.current.rightUp = true;
          }}
          onMouseUp={() => {
            gameRef.current.rightUp = false;
          }}
          onMouseLeave={() => {
            gameRef.current.rightUp = false;
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            gameRef.current.rightUp = true;
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            gameRef.current.rightUp = false;
          }}
          whileTap={{
            scale: 0.93,
            boxShadow: `inset 4px 4px 10px ${SH_DARK}, inset -4px -4px 10px ${SH_LIGHT}`,
          }}
        >
          RIGHT ►
        </motion.button>
      </div>

      {/* Bottom label */}
      <div
        className="mt-3 flex items-center gap-2"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "0.38rem",
          letterSpacing: "0.14em",
          color: hexToRgba(neon, 0.2),
        }}
      >
        <div
          style={{
            width: 20,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${neon})`,
            opacity: 0.3,
          }}
        />
        PRESS SPACE TO LAUNCH
        <div
          style={{
            width: 20,
            height: 1,
            background: `linear-gradient(90deg, ${neon}, transparent)`,
            opacity: 0.3,
          }}
        />
      </div>
    </div>
  );
}
