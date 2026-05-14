import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { HUDOverlay } from "./HUDOverlay";
import { Nucleus } from "./Nucleus";
import { OrbitalRings } from "./OrbitalRings";
import { SatelliteNode, type SatelliteData } from "./SatelliteNode";
import { StarField } from "./StarField";

interface CompendiumEntry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  icon: string;
  accentColor: string;
}

const ENTRIES: CompendiumEntry[] = [
  {
    id: "quantum",
    title: "Quantum Mesh",
    subtitle: "Entangled Networks",
    description:
      "Distributed quantum processing across entangled node arrays. Zero-latency state synchronization through Bell-pair mediated channels.",
    category: "Infrastructure",
    icon: "\u269B",
    accentColor: "#00e5ff",
  },
  {
    id: "neural",
    title: "Neural Lattice",
    subtitle: "Synaptic Architecture",
    description:
      "Bio-inspired computational substrate utilizing synthetic neural pathways for adaptive, self-healing data routing.",
    category: "Compute",
    icon: "\u{1F9E0}",
    accentColor: "#e040fb",
  },
  {
    id: "stellar",
    title: "Stellar Forge",
    subtitle: "Energy Systems",
    description:
      "Dyson-class energy harvesting arrays converting stellar radiation into structured computational fuel.",
    category: "Energy",
    icon: "\u2600",
    accentColor: "#ffab00",
  },
  {
    id: "void",
    title: "Void Protocol",
    subtitle: "Dark Channels",
    description:
      "Encrypted communication through folded spacetime pockets. Undetectable, untraceable, instantaneous.",
    category: "Security",
    icon: "\u{1F30C}",
    accentColor: "#76ff03",
  },
  {
    id: "chrono",
    title: "Chrono Engine",
    subtitle: "Temporal Systems",
    description:
      "Time-crystal based computation enabling predictive modeling across branching probability manifolds.",
    category: "Temporal",
    icon: "\u231A",
    accentColor: "#00bcd4",
  },
  {
    id: "genome",
    title: "Genome Vault",
    subtitle: "Bio Repository",
    description:
      "Complete genetic archive of 12 million species encoded in diamond-lattice memory crystals.",
    category: "Biology",
    icon: "\u{1F9EC}",
    accentColor: "#ff6e40",
  },
];

const ORBIT_CONFIGS = [
  { radius: 260, speed: 0.015, tilt: 15, phaseOffset: 0 },
  { radius: 260, speed: 0.015, tilt: 15, phaseOffset: 60 },
  { radius: 260, speed: 0.015, tilt: 15, phaseOffset: 120 },
  { radius: 260, speed: 0.015, tilt: 15, phaseOffset: 180 },
  { radius: 260, speed: 0.015, tilt: 15, phaseOffset: 240 },
  { radius: 260, speed: 0.015, tilt: 15, phaseOffset: 300 },
];

export function OrbitalSystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeEntry = ENTRIES[activeIndex];
  const satellites: (SatelliteData & { entryIndex: number })[] = useMemo(
    () =>
      ENTRIES.filter((_, i) => i !== activeIndex).map((entry, i) => ({
        id: entry.id,
        title: entry.title,
        subtitle: entry.subtitle,
        icon: entry.icon,
        accentColor: entry.accentColor,
        orbitRadius: ORBIT_CONFIGS[i]?.radius || 260,
        orbitSpeed: ORBIT_CONFIGS[i]?.speed || 0.015,
        orbitTilt: ORBIT_CONFIGS[i]?.tilt || 15,
        phaseOffset: ORBIT_CONFIGS[i]?.phaseOffset || i * 72,
        entryIndex: ENTRIES.findIndex((e) => e.id === entry.id),
      })),
    [activeIndex],
  );

  const handleSatelliteClick = useCallback(
    (id: string) => {
      if (isTransitioning) return;
      const targetIndex = ENTRIES.findIndex((e) => e.id === id);
      if (targetIndex === -1 || targetIndex === activeIndex) return;

      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(targetIndex);
        setIsTransitioning(false);
      }, 600);
    },
    [activeIndex, isTransitioning],
  );

  const orbitalRadii = [220, 150, 290];
  const orbitalTilts = [15, -10, 8];

  return (
    <div className="orbital-shell fixed inset-0 overflow-hidden">
      <StarField />

      <div
        className="central-bloom absolute pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeEntry.accentColor}08 0%, ${activeEntry.accentColor}04 30%, transparent 70%)`,
        }}
      />

      <motion.div className="orbital-stage absolute inset-0">
        <OrbitalRings radii={orbitalRadii} tilts={orbitalTilts} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeEntry.id}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Nucleus
              title={activeEntry.title}
              description={activeEntry.description}
              category={activeEntry.category}
              accentColor={activeEntry.accentColor}
            />
          </motion.div>
        </AnimatePresence>

        {satellites.map((sat, i) => {
          return (
            <SatelliteNode
              key={sat.id}
              data={sat}
              index={i}
              total={satellites.length}
              onClick={handleSatelliteClick}
              isTransitioning={isTransitioning}
            />
          );
        })}
      </motion.div>

      <HUDOverlay activeNode={activeEntry.title} totalNodes={ENTRIES.length} />
    </div>
  );
}
