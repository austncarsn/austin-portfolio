import { motion } from "framer-motion";
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Project } from "../../data/projects";
import { projects } from "../../data/projects";

// ── Motion ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 0.6, 0.22, 1] },
  }),
};

// ── Style constants ──────────────────────────────────────────────────
const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--t-micro)",
  letterSpacing: "var(--track-mono)",
  textTransform: "uppercase",
  color: "var(--ink-3)",
};

const displayH1Style: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(3rem, 8vw, 6.5rem)",
  fontWeight: 400,
  lineHeight: 0.96,
  letterSpacing: "-0.025em",
  color: "var(--bone)",
  marginTop: "1rem",
  marginBottom: "1.75rem",
};

const heroLeadStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
  fontWeight: 300,
  lineHeight: 1.68,
  color: "var(--ink-3)",
  maxWidth: "36rem",
};

const statLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--t-micro)",
  letterSpacing: "var(--track-mono)",
  textTransform: "uppercase",
  color: "var(--ink-4)",
  marginBottom: "0.35rem",
  display: "block",
};

const statValueStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "var(--t-h3)",
  fontWeight: 400,
  color: "var(--ink-2)",
};

const liveLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--t-micro)",
  letterSpacing: "var(--track-mono-tight)",
  textDecoration: "none",
  color: "var(--ac-blue)",
  textTransform: "uppercase",
};

const subHeadStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--t-small)",
  letterSpacing: "var(--track-mono)",
  textTransform: "uppercase",
  color: "var(--ink)",
  marginBottom: "0.75rem",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
  fontWeight: 300,
  lineHeight: 1.65,
  color: "var(--ink-2)",
};

const proseStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
  fontWeight: 400,
  lineHeight: 1.55,
  color: "var(--ink)",
  maxWidth: "38rem",
};

const blockquoteStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
  fontWeight: 300,
  fontStyle: "italic",
  lineHeight: 1.28,
  color: "var(--ink)",
  borderLeft: "2px solid var(--rule)",
  paddingLeft: "1.5rem",
  maxWidth: "36rem",
};

// ── Primitives ──────────────────────────────────────────────────────
const Stat = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <span style={statLabelStyle}>{label}</span>
    <span style={statValueStyle}>{value}</span>
  </div>
);

// ── Lazy image with fade-in ──────────────────────────────────────────
function FadeImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    />
  )
}

// ── Content model ───────────────────────────────────────────────────
interface EngineeringCard { title: string; body: string }
interface CaseStudyContent {
  vision: string;
  visionExtra?: "orbital" | "first-image" | null;
  engineering: EngineeringCard[];
  outcome?: string;
}

const buildContent = (project: Project): CaseStudyContent => {
  const slug = project.slug ?? "";
  const title = project.title.toLowerCase();

  if (title.includes("orbital ui")) {
    return {
      vision: "A spatial exploration of data navigation utilizing 3D orbital mechanics to break the traditional 2D grid layout.",
      visionExtra: "orbital",
      engineering: [
        { title: "3D Perspective", body: "Engineered a complex 3D perspective system using trigonometry and requestAnimationFrame to create a seamless, orbital navigation experience." },
        { title: "Spatial Logic", body: "Broke the traditional 2D grid to allow users to traverse information in a spherical coordinate system." },
      ],
      outcome: "An experimental spatial UI that demonstrates how non-euclidean navigation can reduce cognitive load for deeply nested data structures.",
    };
  }

  if (slug === "cowboy2050" || title.includes("cowboy 2050")) {
    return {
      vision: "Craft a premium western archive landing experience with a modern digital interface — combining cinematic brand storytelling, responsive layout, and polished motion transitions.",
      engineering: [
        { title: "Design System", body: "Defined a custom 2050 Western token palette in CSS custom properties, supporting light/dark theme, consistent shadows, and a branded color hierarchy." },
        { title: "Interaction", body: "Built a motion-led homepage with scroll reveals, parallax accents, a marquee, and responsive navigation for an immersive brand-first experience." },
      ],
      outcome: "A polished modern western demo shop built for brand storytelling, motion-led interaction, and static deployment readiness.",
    };
  }

  if (slug === "floral-origami" || title.includes("floral origami")) {
    return {
      vision: "A neon interactive experiment that blends motion-driven UI, stage-based input, and responsive particle animation.",
      visionExtra: "first-image",
      engineering: [
        { title: "Motion-Driven UI", body: "Crafted a stage-based interaction surface with Framer Motion and layered neon glow styling for a tactile, responsive experience." },
        { title: "Interaction System", body: "Built an event-driven press counter with animated particles, stage transitions, and reactive button feedback for a playful physics-inspired interface." },
      ],
      outcome: "A focused micro-experience that proves a single well-designed interaction can carry an entire product's emotional character.",
    };
  }

  if (title.includes("montana civic")) {
    return {
      vision: project.description,
      engineering: [
        { title: "Data Pipeline", body: "Sourced and structured 499 municipality records across 56 Montana counties into a queryable schema with demographic, government, and historical fields." },
        { title: "Interface", body: "Built a searchable, filterable reference atlas with editorial clarity — prioritizing fast lookup over visual complexity." },
      ],
      outcome: project.learned,
    };
  }

  if (title.includes("figma prompt")) {
    return {
      vision: project.description,
      engineering: [
        { title: "Prompt Architecture", body: "Designed a structured prompt-building interface that guides users through constraint selection, style tokens, and output format for AI design workflows." },
        { title: "UX", body: "Streamlined a repetitive workflow into a single-page utility with immediate copy-to-clipboard output — zero friction from idea to prompt." },
      ],
      outcome: project.learned,
    };
  }

  return {
    vision: project.description,
    engineering: [{ title: "Approach", body: project.learned ?? "" }],
    outcome: project.description,
  };
};

// ── Main ─────────────────────────────────────────────────────────────
export default function CaseStudy() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(
    (p) => p.slug === projectId || p.title.toLowerCase().replace(/\s+/g, "-") === projectId
  );

  if (!project) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--paper)",
      }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 300, color: "var(--ink)", marginBottom: "1.5rem" }}>
            Project Not Found
          </h1>
          <Link to="/" style={{ ...eyebrowStyle, color: "var(--ac-blue)", textDecoration: "none" }}>
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const content = buildContent(project);
  const images = project.screenshots?.length
    ? project.screenshots
    : project.screenshot
    ? [project.screenshot]
    : [];
  const hasGallery = images.length > 1;

  return (
    <div style={{ background: "var(--paper)", color: "var(--ink)" }}>

      {/* ── Hero ── */}
      <header style={{
        position: "relative",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "5rem 1.5rem 3.5rem",
        overflow: "hidden",
        background: "var(--cameo-onyx)",
      }}>
        {/* Background image — blurred, scaled up to avoid edge bleed */}
        {images[0] && (
          <>
            <div style={{
              position: "absolute",
              inset: "-8%",
              backgroundImage: `url(${images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(18px) saturate(0.7) brightness(0.45)",
              transform: "scale(1.04)",
              zIndex: 0,
            }} />
            {/* Bottom-weighted gradient so text stays legible */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,9,6,0.35) 0%, rgba(10,9,6,0.55) 55%, rgba(10,9,6,0.82) 100%)",
              zIndex: 1,
            }} />
          </>
        )}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "56rem", margin: "0 auto", width: "100%" }}>

          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <span style={eyebrowStyle}>{project.label} — Case Study</span>
          </motion.div>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show" style={displayH1Style}>
            {project.title}
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show" style={heroLeadStyle}>
            {project.description}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px dashed rgba(255,255,255,0.1)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, auto))",
              gap: "2rem",
            }}
          >
            <Stat label="Type" value={project.label} />
            <Stat label="Date" value={project.date} />
            {project.url && project.url !== "#" && !project.url.startsWith("/work") && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={statLabelStyle}>Live</span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={liveLinkStyle}
                >
                  View Project ↗
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* ── Image gallery ── */}
      {images.length > 0 && (
        <div style={{
          background: "var(--paper-3)",
          borderTop: "1px dashed var(--rule)",
          padding: "2.5rem 1.5rem",
        }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: hasGallery ? "repeat(auto-fit, minmax(260px, 1fr))" : "1fr",
              gap: "0.875rem",
            }}>
              {images.map((src, i) => (
                <FadeImage
                  key={src}
                  src={src}
                  alt={`${project.title} — screen ${i + 1}`}
                  style={{
                    width: "100%",
                    aspectRatio: hasGallery ? "16 / 10" : "16 / 9",
                    objectFit: "cover",
                    borderRadius: "var(--r-2)",
                    border: "1px solid var(--rule)",
                    display: "block",
                  }}
                />
              ))}
            </div>
            {hasGallery && (
              <p style={{ ...eyebrowStyle, marginTop: "1rem", display: "block" }}>
                Reference frames from the live deploy
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <section style={{
        background: "var(--paper)",
        borderTop: "1px dashed var(--rule)",
        padding: "3.5rem 1.5rem",
      }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>

          {/* Vision */}
          <div>
            <p style={{ ...eyebrowStyle, marginBottom: "1rem", display: "block" }}>The Vision</p>
            <p style={proseStyle}>{content.vision}</p>
            {content.visionExtra === "first-image" && images[0] && (
              <FadeImage
                src={images[0]}
                alt={`${project.title} preview`}
                style={{
                  width: "100%",
                  borderRadius: "var(--r-2)",
                  border: "1px solid var(--rule)",
                  display: "block",
                  marginTop: "1.5rem",
                }}
              />
            )}
          </div>

          <div style={{ borderTop: "1px dashed var(--rule)" }} />

          {/* Engineering */}
          <div>
            <p style={{ ...eyebrowStyle, marginBottom: "1.5rem", display: "block" }}>Engineering</p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
            }}>
              {content.engineering.map((card) => (
                <div key={card.title}>
                  <h3 style={subHeadStyle}>{card.title}</h3>
                  <p style={bodyStyle}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          {content.outcome && (
            <>
              <div style={{ borderTop: "1px dashed var(--rule)" }} />

              {/* Outcome */}
              <div>
                <p style={{ ...eyebrowStyle, marginBottom: "1rem", display: "block" }}>Outcome</p>
                <blockquote style={blockquoteStyle}>
                  {content.outcome}
                </blockquote>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Back nav ── */}
      <div style={{
        borderTop: "1px dashed var(--rule)",
        background: "var(--paper)",
        padding: "2rem 1.5rem",
      }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-micro)",
              letterSpacing: "var(--track-mono)",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "var(--ink-3)",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
          >
            ← Back to work
          </Link>
        </div>
      </div>
    </div>
  );
}
