import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SH_DARK = "#04040e";
const SH_LIGHT = "#14142a";
const PHONE_BG = "#0d0d1f";

const neu = (neon = "#ffffff", glow = 0.2) => ({
  background: PHONE_BG,
  boxShadow: `10px 10px 24px ${SH_DARK}, -10px -10px 24px ${SH_LIGHT}, 0 0 32px ${neon}${Math.round(
    glow * 255,
  )
    .toString(16)
    .padStart(2, "0")}`,
});

const neuInset = (neon = "#ffffff") => ({
  background: "#0b0b1a",
  boxShadow: `inset 6px 6px 14px ${SH_DARK}, inset -6px -6px 14px ${SH_LIGHT}, 0 0 10px ${neon}22`,
});

const stages = [
  {
    neon: "#ff2d55",
    title: "DO NOT PRESS THIS BUTTON",
    subtitle: "I am warning you.",
    emoji: "🔴",
    reaction: null,
  },
  {
    neon: "#ff6b35",
    title: "I SAID DON'T.",
    subtitle: "Why would you do that??",
    emoji: "😤",
    reaction: "You pressed it. You ACTUALLY pressed it.",
  },
  {
    neon: "#ffd700",
    title: "STOP IT. STOP IT RIGHT NOW.",
    subtitle: "I have a family.",
    emoji: "😰",
    reaction: "The button is trembling. It has feelings.",
  },
  {
    neon: "#39ff14",
    title: "ok fine whatever",
    subtitle: "clearly you can't be stopped",
    emoji: "🥲",
    reaction: "Three presses. Your therapist would have thoughts.",
  },
  {
    neon: "#00ffff",
    title: "ARE YOU NOT ENTERTAINED??",
    subtitle: "...you're kind of entertained aren't you",
    emoji: "🥸",
    reaction: "A pigeon somewhere just looked at you and shook its head.",
  },
  {
    neon: "#4488ff",
    title: "THIS IS FINE.",
    subtitle: "🐶☕🔥",
    emoji: "🔥",
    reaction: "Five presses. You are genuinely unwell and I respect it.",
  },
  {
    neon: "#bf5fff",
    title: "ok new plan",
    subtitle: "what if we pressed it again",
    emoji: "👀",
    reaction: "The button has filed a restraining order. You ignored it.",
  },
  {
    neon: "#ff69b4",
    title: "SEVEN TIMES?!",
    subtitle: "you pressed this button SEVEN TIMES",
    emoji: "💀",
    reaction: "Somewhere a butterfly flapped its wings. You ruined it.",
  },
  {
    neon: "#94a3b8",
    title: "i give up",
    subtitle: "just keep pressing it i don't care anymore",
    emoji: "😶",
    reaction: "Eight presses and nothing matters. Beautiful nihilism.",
  },
  {
    neon: "#ff00ff",
    title: "wait actually—",
    subtitle: "what if THIS time something cool happens",
    emoji: "✨",
    reaction:
      "Nothing happened. You knew nothing would happen. You pressed it anyway.",
  },
  {
    neon: "#ffd700",
    title: "THE PROPHECY IS FULFILLED",
    subtitle: "you have pressed the button 10 times. you are the chosen one.",
    emoji: "🎺",
    reaction: "A single trumpet plays in the distance. This was your destiny.",
  },
];

const floatingEmojis = ["💀", "✨", "🎉", "😵", "🚀", "👾", "⚡"];

function useTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function FlipPhone({ color }: { color?: string }) {
  const [pressCount, setPressCount] = useState(0);
  const [showReaction, setShowReaction] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; emoji: string }[]
  >([]);
  const [shake, setShake] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isChosenOne, setIsChosenOne] = useState(false);
  const particleId = useRef(0);
  const time = useTime();

  const stageIndex = Math.min(pressCount, stages.length - 1);
  const stage = stages[stageIndex];
  const neon = color ?? stage.neon;

  const handlePress = () => {
    const newCount = pressCount + 1;
    setPressCount(newCount);
    setShowReaction(true);
    setShake(true);
    setIsPressed(true);
    if (newCount >= 10) setIsChosenOne(true);

    const newParticles = Array.from({ length: newCount > 5 ? 6 : 3 }, () => ({
      id: particleId.current++,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      emoji: floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)],
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => setShake(false), 500);
    setTimeout(() => setIsPressed(false), 180);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
      );
    }, 1300);
  };

  const handleReset = () => {
    setPressCount(0);
    setShowReaction(false);
    setIsChosenOne(false);
    setParticles([]);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center"
      animate={shake ? { rotate: [-1.5, 1.5, -1, 1, 0] } : {}}
      transition={shake ? { duration: 0.4 } : {}}
      style={{
        filter: `drop-shadow(0 40px 60px ${neon}22) drop-shadow(0 20px 40px #00000088)`,
      }}
    >
      {/* TOP SCREEN */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: 320,
          height: 300,
          borderRadius: "36px 36px 8px 8px",
          ...neu(neon, 0.15),
          border: `1px solid ${neon}18`,
          transition: "border-color 0.8s ease",
        }}
      >
        <div
          className="absolute inset-2 rounded-3xl overflow-hidden flex flex-col"
          style={{ ...neuInset(neon), border: `1px solid ${neon}12` }}
        >
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, ${neon}14 1px, transparent 1px)`,
              backgroundSize: "18px 18px",
              transition: "background-image 0.8s ease",
            }}
          />

          {/* Status bar */}
          <div
            className="relative z-20 flex items-center justify-between px-4 pt-3 pb-1"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              color: `${neon}aa`,
            }}
          >
            <span style={{ textShadow: `0 0 8px ${neon}` }}>{time}</span>
            <div className="flex items-center gap-1">
              {[3, 5, 7, 9].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: h,
                    background: i < 3 ? neon : `${neon}33`,
                    borderRadius: 1,
                    boxShadow: i < 3 ? `0 0 4px ${neon}` : "none",
                  }}
                />
              ))}
              <span className="ml-1">▮▮</span>
            </div>
          </div>

          {/* Camera dot */}
          <div className="relative z-20 flex justify-center mb-1">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, ${neon}88, ${SH_DARK})`,
                boxShadow: `0 0 6px ${neon}66`,
              }}
            />
          </div>

          {/* Screen content */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center gap-3 px-5 pb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`emoji-${stageIndex}`}
                className="select-none"
                style={{
                  fontSize: "3rem",
                  filter: `drop-shadow(0 0 12px ${neon}88)`,
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {stage.emoji}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${stageIndex}`}
                className="text-center"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                  fontSize: pressCount >= 10 ? "0.7rem" : "0.75rem",
                  letterSpacing: "0.06em",
                  color: "#fff",
                  textShadow: `0 0 16px ${neon}bb, 0 0 32px ${neon}44`,
                  lineHeight: 1.4,
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {stage.title}
              </motion.div>
            </AnimatePresence>

            <motion.div
              style={{
                width: 60,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${neon}, transparent)`,
                boxShadow: `0 0 6px ${neon}`,
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`sub-${stageIndex}`}
                className="text-center"
                style={{
                  color: "#ffffff44",
                  fontSize: "0.65rem",
                  lineHeight: 1.5,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {stage.subtitle}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Corner brackets */}
        {["top-3 left-3", "top-3 right-3 rotate-90"].map((cls, i) => (
          <div key={i} className={`absolute ${cls} pointer-events-none z-30`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 6 L1 1 L6 1"
                stroke={neon}
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* HINGE */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 320, height: 22, zIndex: 10 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(180deg, #08081a, #121228, #08081a)`,
            boxShadow: `0 4px 16px #00000088, 0 -4px 16px #00000066, inset 0 1px 0 ${neon}22, inset 0 -1px 0 ${neon}11`,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, ${SH_LIGHT}, ${SH_DARK})`,
            boxShadow: `0 0 8px ${neon}44, 3px 3px 6px ${SH_DARK}, -2px -2px 4px ${SH_LIGHT}`,
            border: `1px solid ${neon}22`,
          }}
        />
        <div
          className="absolute left-4"
          style={{
            width: 32,
            height: 10,
            borderRadius: 5,
            background: `linear-gradient(180deg, ${SH_LIGHT}, ${SH_DARK}, ${SH_LIGHT})`,
            boxShadow: `inset 2px 2px 4px ${SH_DARK}`,
          }}
        />
        <div
          className="absolute right-4"
          style={{
            width: 32,
            height: 10,
            borderRadius: 5,
            background: `linear-gradient(180deg, ${SH_LIGHT}, ${SH_DARK}, ${SH_LIGHT})`,
            boxShadow: `inset 2px 2px 4px ${SH_DARK}`,
          }}
        />
        <motion.div
          className="absolute"
          style={{
            width: "70%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${neon}66, transparent)`,
            boxShadow: `0 0 6px ${neon}44`,
          }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* BOTTOM SCREEN */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: 320,
          height: 300,
          borderRadius: "8px 8px 36px 36px",
          ...neu(neon, 0.15),
          border: `1px solid ${neon}18`,
          transition: "border-color 0.8s ease",
        }}
      >
        <div
          className="absolute inset-2 rounded-[26px] overflow-hidden flex flex-col"
          style={{ ...neuInset(neon), border: `1px solid ${neon}12` }}
        >
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, ${neon}14 1px, transparent 1px)`,
              backgroundSize: "18px 18px",
              transition: "background-image 0.8s ease",
            }}
          />

          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute pointer-events-none z-30"
                style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: "1.4rem" }}
                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                animate={{ opacity: 0, scale: 2, y: -70 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                {p.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          <div
            className="relative z-20 text-center pt-4 pb-1"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.45rem",
              letterSpacing: "0.2em",
              color: `${neon}55`,
            }}
          >
            ∴ INTERACTION SURFACE ∴
          </div>

          <div className="relative z-20 flex-1 flex flex-col items-center justify-center gap-5 px-6">
            {/* Press counter */}
            <motion.div
              className="flex items-center gap-3"
              animate={{ scale: shake ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: `${neon}66`,
                }}
              >
                PRESSES
              </div>
              <motion.div
                key={pressCount}
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                  fontSize: "1.4rem",
                  color: neon,
                  textShadow: `0 0 12px ${neon}, 0 0 24px ${neon}66`,
                }}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 14 }}
              >
                {pressCount.toString().padStart(2, "0")}
              </motion.div>
            </motion.div>

            {/* THE BIG BUTTON */}
            <motion.button
              onClick={handlePress}
              className="relative rounded-full cursor-pointer select-none outline-none flex items-center justify-center"
              style={{
                width: 120,
                height: 120,
                ...(isPressed ? neuInset(neon) : neu(neon, 0.4)),
                border: `1.5px solid ${neon}44`,
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 900,
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                color: neon,
                textShadow: `0 0 10px ${neon}`,
                textAlign: "center",
                lineHeight: 1.4,
                transition:
                  "box-shadow 0.15s ease, border-color 0.6s, color 0.6s",
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              <span style={{ padding: "0 8px" }}>
                {pressCount === 0
                  ? "DO NOT\nPRESS"
                  : pressCount >= 10
                    ? "CHOSEN\nONE"
                    : "PRESS\nAGAIN"}
              </span>
              <motion.span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  border: `1px solid ${neon}`,
                  boxShadow: `0 0 10px ${neon}44`,
                }}
                animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: `1px solid ${neon}88` }}
                animate={{ scale: [1, 1.15], opacity: [0.4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.4,
                }}
              />
            </motion.button>

            {/* Reaction */}
            <AnimatePresence mode="wait">
              {showReaction && stage.reaction ? (
                <motion.div
                  key={`reaction-${pressCount}`}
                  className="text-center"
                  style={{
                    color: "#ffffff55",
                    fontSize: "0.62rem",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    maxWidth: 220,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span style={{ color: `${neon}99`, fontStyle: "normal" }}>
                    ›{" "}
                  </span>
                  {stage.reaction}
                </motion.div>
              ) : !showReaction ? (
                <motion.div
                  key="idle"
                  style={{
                    color: `${neon}33`,
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  · · · AWAITING INPUT · · ·
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 flex items-center justify-between px-8 pb-4 pt-2">
            {pressCount > 0 ? (
              <motion.button
                onClick={handleReset}
                className="cursor-pointer"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.45rem",
                  letterSpacing: "0.12em",
                  color: `${neon}55`,
                  background: "none",
                  border: "none",
                }}
                whileHover={{ color: neon }}
              >
                ↺ RESET
              </motion.button>
            ) : (
              <div />
            )}
            {isChosenOne && (
              <motion.div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.4rem",
                  letterSpacing: "0.12em",
                  color: `${neon}77`,
                  textShadow: `0 0 6px ${neon}`,
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦ CHOSEN ✦
              </motion.div>
            )}
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.45rem",
                letterSpacing: "0.12em",
                color: `${neon}33`,
              }}
            >
              2050
            </div>
          </div>
        </div>

        {["bottom-3 left-3", "bottom-3 right-3 rotate-180"].map((cls, i) => (
          <div key={i} className={`absolute ${cls} pointer-events-none z-30`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d={i === 0 ? "M1 6 L1 11 L6 11" : "M11 6 L11 11 L6 11"}
                stroke={neon}
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Phone shadow */}
      <div
        style={{
          width: 200,
          height: 12,
          marginTop: 16,
          background: `radial-gradient(ellipse, ${neon}22 0%, transparent 70%)`,
          filter: "blur(6px)",
        }}
      />
    </motion.div>
  );
}
