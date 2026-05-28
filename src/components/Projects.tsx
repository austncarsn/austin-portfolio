import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";
import { getProjectScreenshots, projects } from "../data/projects";
import styles from "./Projects.module.css";

const EASE = [0.2, 0.6, 0.2, 1] as const;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE },
  },
};

const FILTERS = ["All", "Projects", "Design Systems", "AI Interfaces", "Archives"] as const;

type Filter = (typeof FILTERS)[number];

function getSlug(project: Project): string {
  return project.slug ?? project.title.toLowerCase().replace(/\s+/g, "-");
}

function getTone(index: number): string {
  const tones = ["blue", "sage", "shrimp", "lavender", "ivory"] as const;
  return tones[index % tones.length];
}

function matchesFilter(project: Project, filter: Filter): boolean {
  if (filter === "All") return true;

  const searchable = `${project.category} ${project.label} ${project.type ?? ""}`.toLowerCase();

  if (filter === "Projects") {
    return /app|tool|web|prototype|brand/.test(searchable);
  }

  if (filter === "Design Systems") {
    return /system|prompt|design/.test(searchable);
  }

  if (filter === "AI Interfaces") {
    return /ai|prompt|figma|tool/.test(searchable);
  }

  return /archive|guide|data|civic/.test(searchable);
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps): JSX.Element {
  const [failed, setFailed] = useState(false);
  const screenshots = getProjectScreenshots(project);
  const screenshot = screenshots[0];
  const hasMedia = Boolean(screenshot && !failed);
  const category = project.type ?? project.category;

  return (
    <motion.li className={styles.card} variants={cardVariants} data-tone={getTone(index)}>
      <Link
        className={styles.cardLink}
        to={`/work/${getSlug(project)}`}
        aria-label={`${project.title}, ${category}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <span className={styles.cardTopline}>
          <span>{category}</span>
        </span>

        <span className={styles.cardBody}>
          <span className={styles.cardCopy}>
            <span className={styles.cardTitle}>{project.title}</span>
            <span className={styles.cardSummary}>{project.summary}</span>
          </span>
        </span>

        <span className={styles.cardMedia} aria-hidden="true">
          {hasMedia ? (
            <img
              src={screenshot}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          ) : (
            <span className={styles.mediaFallback}>Screenshot pending</span>
          )}
        </span>

        <span className={styles.cardFooter}>
          <span>View project</span>
          <span aria-hidden="true" className={styles.cardArrow}>
            ↗
          </span>
        </span>
      </Link>
    </motion.li>
  );
}

export default function Projects(): JSX.Element | null {
  const [filter, setFilter] = useState<Filter>("All");

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, filter)),
    [filter]
  );

  if (!projects.length) return null;

  return (
    <section id="work" aria-label="Selected work" className={styles.section} style={{ position: "relative" }}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.heading}>Projects</h2>
            <p className={styles.intro}>
              Selected interfaces, systems, experiments, and tools for the web.
            </p>
          </div>
        </div>

        <div className={styles.filters} role="group" aria-label="Project filters">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              className={styles.filterButton}
              data-active={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <motion.ul
          className={styles.grid}
          variants={listVariants}
          initial="visible"
          animate="visible"
        >
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.slug ?? project.title} project={project} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
