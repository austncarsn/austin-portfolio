import { motion } from "framer-motion";

interface NucleusProps {
  title: string;
  description: string;
  category: string;
  accentColor: string;
}

export function Nucleus({
  title,
  description,
  category,
  accentColor,
}: NucleusProps) {
  return (
    <div
      className="nucleus absolute flex items-center justify-center"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 20,
      }}
    >
      <div
        className="nucleus-glow nucleus-glow-outer absolute rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
        }}
      />
      <div
        className="nucleus-glow nucleus-glow-inner absolute rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
        }}
      />
      <div
        className="nucleus-core absolute rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${accentColor}90, ${accentColor}40 50%, #010102 100%)`,
          boxShadow: `0 0 44px ${accentColor}45, 0 0 88px ${accentColor}20, inset 0 0 32px ${accentColor}20`,
        }}
      />
      <motion.div
        className="nucleus-card absolute flex flex-col items-center text-center"
        style={{
          left: "50%",
          x: "-50%",
          border: `1px solid ${accentColor}30`,
          boxShadow: `inset 0 0 20px ${accentColor}15, 0 8px 32px rgba(0,0,0,0.6)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
      >
        <span
          className="nucleus-category uppercase mb-2"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: accentColor,
          }}
        >
          {category}
        </span>
        <h1
          className="nucleus-title mb-2"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#e0e0e0",
          }}
        >
          {title}
        </h1>
        <p
          className="nucleus-description"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {description}
        </p>
      </motion.div>
    </div>
  );
}
