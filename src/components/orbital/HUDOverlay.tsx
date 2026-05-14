import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface HUDOverlayProps {
  activeNode: string;
  totalNodes: number;
}

export function HUDOverlay({ activeNode, totalNodes }: HUDOverlayProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const monoStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "rgba(0, 229, 255, 0.5)",
    letterSpacing: "0.1em",
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
      <motion.div
        className="hud-panel absolute"
        style={{ top: 24, left: 24 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div
          style={{
            ...monoStyle,
            color: "#00e5ff",
            fontSize: 12,
            marginBottom: 4,
          }}
        >
          ORBITAL COMPENDIUM v2.50
        </div>
        <div style={monoStyle}>
          SYS.STATUS: <span style={{ color: "#76ff03" }}>NOMINAL</span>
        </div>
        <div style={monoStyle}>
          NODES.ACTIVE: {totalNodes} / {totalNodes}
        </div>
        <div style={monoStyle}>
          GRAV.LOCK: <span style={{ color: "#ffab00" }}>ENGAGED</span>
        </div>
      </motion.div>

      <motion.div
        className="hud-panel absolute"
        style={{ top: 24, right: 24, textAlign: "right" }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div style={monoStyle}>UTC {time.toISOString().slice(11, 19)}</div>
        <div style={monoStyle}>EPOCH {Math.floor(time.getTime() / 1000)}</div>
        <div style={{ ...monoStyle, marginTop: 8, color: "#ffab00" }}>
          FOCUS: {activeNode.toUpperCase()}
        </div>
      </motion.div>

      <svg
        className="absolute"
        style={{ top: 12, left: 12 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path
          d="M0 15 L0 0 L15 0"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
      <svg
        className="absolute"
        style={{ top: 12, right: 12 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path
          d="M25 0 L40 0 L40 15"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
      <svg
        className="absolute"
        style={{ bottom: 12, left: 12 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path
          d="M0 25 L0 40 L15 40"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
      <svg
        className="absolute"
        style={{ bottom: 12, right: 12 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
      >
        <path
          d="M25 40 L40 40 L40 25"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
