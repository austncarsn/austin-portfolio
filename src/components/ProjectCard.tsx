import { useState } from "react";
import type { Project } from "../data/projects";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const [hover, setHover] = useState(false);

  const baseStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 0,
    width: "min(340px, 86vw)",
    minHeight: "245px",
    padding: "1.35rem",
    borderRadius: "22px",
    border:
      "1px solid color-mix(in srgb, var(--color-border-strong) 72%, transparent)",
    background:
      "linear-gradient(145deg, color-mix(in srgb, var(--color-bg) 96%, white), var(--color-bg))",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04), 0 18px 48px rgba(0, 0, 0, 0.06)",
    textDecoration: "none",
    overflow: "hidden",
    transition:
      "transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease",
  };

  const hoverStyle: React.CSSProperties = hover
    ? {
        transform: "translateY(-6px) scale(1.02)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
        borderColor: "color-mix(in srgb, var(--color-accent) 32%, transparent)",
      }
    : {};

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...baseStyle, ...hoverStyle }}
    >
      {/* Soft accent wash */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-35%",
          right: "-30%",
          width: "220px",
          height: "220px",
          borderRadius: "999px",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 68%)",
          filter: "blur(10px)",
          opacity: 0.72,
          pointerEvents: "none",
        }}
      />

      {/* Screenshot / thumbnail */}
      {project.screenshot ? (
        <div
          style={{
            width: "100%",
            height: "120px",
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "0.9rem",
            flexShrink: 0,
          }}
        >
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hover ? "scale(1.04)" : "scale(1)",
              transition: "transform 420ms cubic-bezier(.2,.9,.2,1)",
            }}
          />
        </div>
      ) : null}

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3
            style={{
              maxWidth: "210px",
              fontSize: "1.1rem",
              lineHeight: 1.15,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--color-text-primary)",
            }}
          >
            {project.title}
          </h3>

          <span
            style={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              minHeight: "1.55rem",
              padding: "0.35rem 0.55rem",
              borderRadius: "999px",
              border: "1px solid var(--color-border)",
              backgroundColor:
                "color-mix(in srgb, var(--color-bg) 82%, var(--color-accent) 8%)",
              fontSize: "0.68rem",
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:
                "color-mix(in srgb, var(--color-text-primary) 62%, transparent)",
            }}
          >
            {project.label}
          </span>
        </div>

        <p
          style={{
            fontSize: "0.92rem",
            lineHeight: 1.62,
            color: "var(--color-text-secondary)",
            margin: 0,
            minHeight: "3.2rem",
          }}
        >
          {project.description}
        </p>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginTop: "1.75rem",
          paddingTop: "1rem",
          borderTop:
            "1px solid color-mix(in srgb, var(--color-border) 78%, transparent)",
        }}
      >
        <span
          style={{
            fontSize: "0.76rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
          }}
        >
          View Project
        </span>

        <span
          aria-hidden="true"
          style={{
            display: "grid",
            placeItems: "center",
            width: "2rem",
            height: "2rem",
            borderRadius: "999px",
            border:
              "1px solid color-mix(in srgb, var(--color-accent) 32%, transparent)",
            color: "var(--color-accent)",
            fontSize: "0.9rem",
            transition: "transform 220ms ease, background-color 220ms ease",
            transform: hover ? "translateX(4px)" : "none",
          }}
        >
          ↗
        </span>
      </div>
    </a>
  );
}
