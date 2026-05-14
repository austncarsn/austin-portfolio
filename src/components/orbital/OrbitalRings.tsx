import { memo } from "react";

interface OrbitalRingsProps {
  radii: number[];
  tilts: number[];
}

function OrbitalRingsComponent({ radii, tilts }: OrbitalRingsProps) {
  const colors = ["#00e5ff", "#ffab00", "#76ff03"];

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 0,
        height: 0,
        zIndex: 5,
      }}
    >
      {radii.map((radius, i) => {
        const tilt = tilts[i] || 0;
        const color = colors[i % colors.length];

        return (
          <div
            key={i}
            className="orbital-ring absolute"
            style={{
              left: -radius,
              top: -radius * 0.4,
              width: radius * 2,
              height: radius * 0.8,
              animationDelay: `${i * -3}s`,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${radius * 2} ${radius * 0.8}`}
              style={{
                transform: `rotateX(${tilt}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <ellipse
                cx={radius}
                cy={radius * 0.4}
                rx={radius - 2}
                ry={radius * 0.4 - 2}
                fill="none"
                stroke={color}
                strokeWidth={0.5}
                opacity={0.25}
              />
              <ellipse
                cx={radius}
                cy={radius * 0.4}
                rx={radius - 2}
                ry={radius * 0.4 - 2}
                fill="none"
                stroke={color}
                strokeWidth={0.3}
                strokeDasharray="4 8"
                opacity={0.15}
              />
            </svg>
            <div
              className="absolute"
              style={{
                left: "10%",
                top: "10%",
                width: "80%",
                height: "80%",
                background: `radial-gradient(ellipse, ${color}08 0%, transparent 70%)`,
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export const OrbitalRings = memo(OrbitalRingsComponent);
