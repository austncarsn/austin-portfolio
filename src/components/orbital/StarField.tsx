import { memo, useMemo } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  animDelay: number;
  animDuration: number;
}

function StarFieldComponent() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 120 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      animDelay: Math.random() * 6,
      animDuration: 4 + Math.random() * 5,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor:
              i % 5 === 0 ? "#00e5ff" : i % 7 === 0 ? "#ffab00" : "#ffffff",
            opacity: star.opacity,
            animation: `starTwinkle ${star.animDuration}s ease-in-out ${star.animDelay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export const StarField = memo(StarFieldComponent);
