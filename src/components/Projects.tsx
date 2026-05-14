import { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { Project } from "../data/projects";
import { projects } from "../data/projects";
import styles from "./Projects.module.css";

// ── Helpers ──────────────────────────────────────────────────────────

function getSlug(project: Project): string {
  return project.slug ?? project.title.toLowerCase().replace(/\s+/g, "-");
}

// ── Animation constants ──────────────────────────────────────────────

const EASE = [0.2, 0.6, 0.2, 1] as const;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

// ── HoverPreview ─────────────────────────────────────────────────────

interface HoverPreviewProps {
  project: Project | null;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

function HoverPreview({ project, x, y }: HoverPreviewProps) {
  const src = project?.screenshots?.[0] ?? project?.screenshot;

  return (
    <AnimatePresence>
      {project && src && (
        <motion.div
          key={project.title}
          className={styles.preview}
          style={{
            x,
            y,
            translateX: "-50%",
            translateY: "-108%",
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.18, ease: EASE }}
        >
          <img
            className={styles.previewImg}
            src={src}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── ProjectRow ───────────────────────────────────────────────────────

interface ProjectRowProps {
  project: Project;
  index: number;
  onEnter: (p: Project) => void;
}

function ProjectRow({ project, index, onEnter }: ProjectRowProps) {
  const hasPreview = !!(project.screenshot || project.screenshots?.length);

  return (
    <motion.li
      className={styles.row}
      variants={rowVariants}
      onMouseEnter={hasPreview ? () => onEnter(project) : undefined}
    >
      <Link
        className={styles.rowLink}
        to={`/work/${getSlug(project)}`}
        aria-label={`${project.title} — ${project.label}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <span className={styles.rowIndex} aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>

        <span className={styles.rowLabel}>{project.label}</span>

        <span className={styles.rowTitle}>{project.title}</span>

        <span className={styles.rowDate}>{project.date}</span>

        <span className={styles.rowArrow} aria-hidden="true">
          ↗
        </span>
      </Link>
    </motion.li>
  );
}

// ── Projects ─────────────────────────────────────────────────────────

export default function Projects() {
  const [activePreview, setActivePreview] = useState<Project | null>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 280, damping: 28, mass: 0.6 });
  const springY = useSpring(cursorY, { stiffness: 280, damping: 28, mass: 0.6 });

  if (!projects.length) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  return (
    <>
      <div className="divider-bar" />

      <section
        id="work"
        aria-label="Selected work"
        className={styles.section}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActivePreview(null)}
      >
        <div className={styles.container}>
          <motion.ul
            className={styles.list}
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
          >
            {projects.map((project, i) => (
              <ProjectRow
                key={project.slug ?? project.title}
                project={project}
                index={i + 1}
                onEnter={setActivePreview}
              />
            ))}
          </motion.ul>
        </div>

        <HoverPreview project={activePreview} x={springX} y={springY} />
      </section>

      <div className="divider-bar" />
    </>
  );
}
