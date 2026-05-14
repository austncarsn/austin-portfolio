import { useEffect, useState } from "react";
import type { Project } from "../data/projects";
import { projects } from "../data/projects";
import styles from "./Projects.module.css";

function ScreenshotPreview({
  src,
  screenshots,
  title,
}: {
  src?: string;
  screenshots?: string[];
  title: string;
}) {
  const images = screenshots?.length ? screenshots : src ? [src] : [];
  const rotationKey = images.join("|");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);

    if (images.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [images.length, rotationKey]);

  if (!images.length) return null;

  const activeImage = images[activeIndex];

  return (
    <div className={styles.screenshotWrap}>
      <img
        key={activeImage}
        className={styles.screenshot}
        src={activeImage}
        alt={`${title} preview ${activeIndex + 1}`}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget
            .closest(`.${styles.screenshotWrap}`)
            ?.classList.add(styles.isMissing);
        }}
      />

      {images.length > 1 && (
        <div className={styles.screenshotStatus} aria-hidden="true">
          <span className={styles.screenshotCount}>
            {String(activeIndex + 1).padStart(2, "0")} /
            {String(images.length).padStart(2, "0")}
          </span>

          <div className={styles.screenshotDots}>
            {images.map((image, index) => (
              <span
                key={`${image}-${index}`}
                className={`${styles.screenshotDot} ${
                  index === activeIndex ? styles.screenshotDotActive : ""
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectMeta({ project, index }: { project: Project; index: number }) {
  return (
    <div className={styles.meta}>
      <span className={styles.index}>{String(index).padStart(2, "0")}</span>

      <span className={styles.label}>{project.label}</span>

      {project.date && (
        <>
          <span className={styles.metaDot} aria-hidden="true" />
          <span className={styles.date}>{project.date}</span>
        </>
      )}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const isExternal = project.url.startsWith("http");

  return (
    <a
      className={styles.featuredCard}
      href={project.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${project.title}, ${project.description}${isExternal ? ", opens in new tab" : ""}`}
    >
      <div className={styles.featuredContent}>
        <ProjectMeta project={project} index={1} />

        <div className={styles.featuredText}>
          <h3 className={styles.featuredTitle}>{project.title}</h3>

          <p className={styles.description}>{project.description}</p>

          {project.learned && (
            <p className={styles.learned}>
              <span className={styles.learnedLabel}>Takeaway</span>
              {project.learned}
            </p>
          )}
        </div>

        <div className={styles.ctaRow}>
          <span className={styles.ctaText}>View project</span>
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </div>
      </div>

      <ScreenshotPreview
        src={project.screenshot}
        screenshots={project.screenshots}
        title={project.title}
      />
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isExternal = project.url.startsWith("http");

  return (
    <a
      className={styles.card}
      href={project.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${project.title}, ${project.description}${isExternal ? ", opens in new tab" : ""}`}
    >
      <div className={styles.cardTop}>
        <ProjectMeta project={project} index={index} />

        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      </div>

      <ScreenshotPreview
        src={project.screenshot}
        screenshots={project.screenshots}
        title={project.title}
      />

      <div className={styles.cardBody}>
        <h3 className={styles.title}>{project.title}</h3>

        <div className={styles.infoWrap}>
          <p className={styles.description}>{project.description}</p>

          {project.learned && (
            <p className={styles.learned}>
              <span className={styles.learnedLabel}>Takeaway</span>
              {project.learned}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  if (!projects.length) return null;

  const [featured, ...rest] = projects;

  return (
    <>
      <div className="divider-bar" />

      <section
        id="work"
        className={styles.section}
        aria-labelledby="work-heading"
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headingBlock}>
              <span className={styles.kicker}>Selected work</span>
              <h2 className={styles.heading} id="work-heading">
                Develop<em className={styles.headingItalic}>ments</em>
              </h2>
            </div>

            <div className={styles.headerRight}>
              <span className={styles.count} aria-hidden="true">
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <FeaturedCard project={featured} />

          {rest.length > 0 && (
            <div className={styles.grid}>
              {rest.map((project, i) => (
                <ProjectCard
                  key={project.url ?? project.title}
                  project={project}
                  index={i + 2}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="divider-bar" />
    </>
  );
}
