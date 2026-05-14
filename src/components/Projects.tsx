import { useRef, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  if (!images.length) return null;

  const activeImage = images[activeIndex];

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (images.length <= 1) return;

    const movement =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (Math.abs(movement) < 12) return;

    event.preventDefault();

    if (movement > 0) {
      showNext();
      return;
    }

    showPrevious();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (images.length <= 1) return;

    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (images.length <= 1 || pointerStartX.current === null) return;

    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(deltaX) < 36) return;

    if (deltaX < 0) {
      showNext();
      return;
    }

    showPrevious();
  };

  return (
    <div
      className={`${styles.screenshotWrap} ${
        images.length > 1 ? styles.screenshotInteractive : ""
      }`}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        pointerStartX.current = null;
      }}
    >
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
          <span className={styles.screenshotHint}>Hover and swipe</span>

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

      {images.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.screenshotNav} ${styles.screenshotNavPrev}`}
            aria-label={`Previous ${title} screenshot`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              showPrevious();
            }}
          >
            ←
          </button>

          <button
            type="button"
            className={`${styles.screenshotNav} ${styles.screenshotNavNext}`}
            aria-label={`Next ${title} screenshot`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              showNext();
            }}
          >
            →
          </button>
        </>
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
