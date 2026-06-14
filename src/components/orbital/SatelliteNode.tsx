import { motion } from "framer-motion";
import { memo, useState, type CSSProperties } from "react";

export interface SatelliteData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitTilt: number;
  phaseOffset: number;
}

interface SatelliteNodeProps {
  data: SatelliteData;
  index: number;
  total: number;
  onClick: (id: string) => void;
  isTransitioning: boolean;
}

function SatelliteNodeComponent({
  data,
  index,
  total,
  onClick,
  isTransitioning,
}: SatelliteNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const phase = (360 / total) * index + data.phaseOffset;
  const orbitDuration = Math.max(28, 58 - data.orbitSpeed * 1200);
  const customProperties = {
    "--orbit-radius": `clamp(118px, 18vw, 210px)`,
    "--orbit-tilt": `${data.orbitTilt}deg`,
    "--phase": phase,
    "--orbit-duration": `${orbitDuration}s`,
    "--accent-color": data.accentColor,
  } as CSSProperties;

  return (
    <motion.div
      className="satellite-orbit absolute"
      style={customProperties}
      animate={{
        opacity: isTransitioning ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div className="satellite-counter absolute">
        <motion.button
          className="satellite-button relative flex flex-col items-center"
          type="button"
          aria-label={`Open ${data.title}`}
          style={{
            color: data.accentColor,
          }}
          animate={{
            scale: isHovered ? 1.07 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          onClick={() => onClick(data.id)}
        >
          <span className="satellite-sphere relative flex items-center justify-center rounded-full">
            <span className="satellite-icon">{data.icon}</span>
          </span>

          <span className="satellite-label mt-3 text-center">
            <span className="satellite-title block">{data.title}</span>
            <span className="satellite-subtitle block">{data.subtitle}</span>
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export const SatelliteNode = memo(SatelliteNodeComponent);
