import { motion } from "framer-motion";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Project } from "../../data/projects";
import { projects } from "../../data/projects";
// import { OrbitalUI } from "../ui/OrbitalUI"; // Component missing from source

// ── Motion ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.2, 0.6, 0.2, 1] },
  }),
};

// ── Style constants (hoisted; identity-stable) ──────────────────────
const subHeadStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--t-small)",
  letterSpacing: "var(--track-mono)",
  textTransform: "uppercase",
  color: "var(--ink)",
  marginBottom: "0.75rem",
};

const displayH1Style: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(3rem, 8vw, 7rem)",
  fontWeight: 300,
  lineHeight: 1.0,
  letterSpacing: "-0.02em",
  color: "var(--bone)",
  marginTop: "1.25rem",
  marginBottom: "2rem",
};

const heroLeadStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
  fontWeight: 300,
  lineHeight: 1.6,
  color: "var(--ink-3)",
  maxWidth: "38rem",
};

const statValueStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "var(--t-h3)",
  fontWeight: 400,
  color: "var(--ink)",
};

const liveLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--t-small)",
  color: "var(--ac-blue)",
  letterSpacing: "var(--track-mono)",
  textDecoration: "none",
};

const blockquoteStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
  fontWeight: 300,
  fontStyle: "italic",
  lineHeight: 1.25,
  color: "var(--ink)",
  borderLeft: "2px solid var(--rule)",
  paddingLeft: "1.5rem",
  maxWidth: "36rem",
};

// ── Primitives ──────────────────────────────────────────────────────
const SubHead = ({ children }: { children: React.ReactNode }) => (
  <h3 style={subHeadStyle}>{children}</h3>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="ac-meta">{label}</span>
    <span style={statValueStyle}>{value}</span>
  </div>
);

const Section = ({
  eyebrow,
  children,
  tinted = false,
}: {
  eyebrow: string;
  children: React.ReactNode;
  tinted?: boolean;
}) => (
  <section
    style={{
      background: tinted ? "var(--paper-2)" : "var(--paper)",
      borderTop: "1px dashed var(--rule)",
    }}
    className="py-20 px-6 md:px-12"
  >
    <div className="max-w-4xl mx-auto">
      <p className="ac-eyebrow mb-10">{eyebrow}</p>
      {children}
    </div>
  </section>
);

// ── Content model ───────────────────────────────────────────────────
interface EngineeringCard {
  title: string;
  body: string;
}

interface CaseStudyContent {
  vision: string;
  visionExtra?: "orbital" | "first-image" | null;
  engineering: EngineeringCard[];
  outcome?: string;
}

const buildContent = (project: Project): CaseStudyContent => {
  const slug = project.slug ?? "";
  const title = project.title.toLowerCase();

  if (project.title === "Orbital UI Concept") {
    return {
      vision:
        "A spatial exploration of data navigation utilizing 3D orbital mechanics to break the traditional 2D grid layout.",
      visionExtra: "orbital",
      engineering: [
        {
          title: "3D Perspective",
          body: "Engineered a complex 3D perspective system using trigonometry and requestAnimationFrame to create a seamless, orbital navigation experience.",
        },
        {
          title: "Spatial Logic",
          body: "Broke the traditional 2D grid to allow users to traverse information in a spherical coordinate system.",
        },
      ],
    };
  }

  if (slug === "cowboy2050" || title.includes("cowboy 2050")) {
    return {
      vision:
        "The objective was to craft a premium western archive landing experience with a modern digital interface, combining cinematic brand storytelling, responsive layout, and polished motion transitions.",
      engineering: [
        {
          title: "Design System",
          body: "Defined a custom 2050 Western token palette in CSS custom properties, supporting a light/dark theme, consistent shadows, and branded color hierarchy.",
        },
        {
          title: "Interaction",
          body: "Built a motion-led homepage with scroll reveals, parallax accents, a marquee, and responsive navigation for an immersive brand-first experience.",
        },
      ],
      outcome:
        "A polished modern western demo shop built for brand storytelling, motion-led interaction, and static deployment readiness.",
    };
  }

  if (slug === "floral-origami" || title.includes("floral origami")) {
    return {
      vision:
        "A neon interactive experiment that blends motion-driven UI, stage-based input, and responsive particle animation.",
      visionExtra: "first-image",
      engineering: [
        {
          title: "Motion-driven UI",
          body: "Crafted a stage-based interaction surface with motion/react and layered neon glow styling for a tactile, responsive experience.",
        },
        {
          title: "Interaction system",
          body: "Built an event-driven press counter with animated particles, stage transitions, and reactive button feedback for a playful physics-inspired interface.",
        },
      ],
    };
  }

  return {
    vision: project.description,
    engineering: [{ title: "Notes", body: project.learned ?? "" }],
  };
};

// ── Main ────────────────────────────────────────────────────────────
export default function CaseStudy() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(p => p.slug === projectId || p.title.toLowerCase().replace(/\s+/g, '-') === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--bone)]">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Project Not Found</h1>
          <Link to="/" className="ac-eyebrow hover:underline">← Back to home</Link>
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
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen antialiased"
    >
      <header
        style={{
          background: "var(--cameo-onyx)",
          color: "var(--bone)",
          minHeight: "92vh",
        }}
        className="flex flex-col justify-end px-6 md:px-12 pb-16 pt-32"
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <span className="ac-eyebrow" style={{ color: "var(--ink-3)" }}>
              {project.label} — Case Study
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={displayH1Style}
          >
            {project.title}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={heroLeadStyle}
          >
            {project.description}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-12 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ borderTop: "1px dashed rgba(255,255,255,0.12)" }}
          >
            <Stat label="Type" value={project.label} />
            <Stat label="Date" value={project.date} />
            {project.url && project.url !== "#" && (
              <div className="flex flex-col gap-1">
                <span className="ac-meta">Live</span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ac-live-link"
                  style={liveLinkStyle}
                >
                  View Project ↗
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {images.length > 0 && (
        <div
          style={{
            background: "var(--paper-3)",
            borderTop: "1px dashed var(--rule)",
          }}
          className="px-6 md:px-12 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: hasGallery
                  ? "repeat(auto-fit, minmax(260px, 1fr))"
                  : "1fr",
                gap: "1rem",
              }}
            >
              {images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} reference ${i + 1}`}
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 10",
                    objectFit: "cover",
                    borderRadius: "var(--r-2)",
                    border: "1px solid var(--rule)",
                    display: "block",
                  }}
                />
              ))}
            </div>
            {hasGallery && (
              <p className="ac-meta" style={{ marginTop: "1rem" }}>
                Desktop reference frames from the live deploy.
              </p>
            )}
          </div>
        </div>
      )}

      <Section eyebrow="The Vision">
        <div className="flex flex-col gap-8">
          <p className="ac-prose" style={{ maxWidth: "38rem" }}>
            {content.vision}
          </p>
          {content.visionExtra === "first-image" && images[0] && (
            <div style={{ marginTop: "1rem" }}>
              <img
                src={images[0]}
                alt={`${project.title} preview`}
                style={{
                  width: "100%",
                  borderRadius: "var(--r-2)",
                  border: "1px solid var(--rule)",
                  display: "block",
                }}
              />
            </div>
          )}
        </div>
      </Section>

      <Section eyebrow="Engineering" tinted>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {content.engineering.map((card) => (
            <div key={card.title}>
              <SubHead>{card.title}</SubHead>
              <p className="ac-body">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Outcome">
        <blockquote style={blockquoteStyle}>
          {content.outcome ?? project.description}
        </blockquote>
      </Section>

      <div
        style={{
          borderTop: "1px dashed var(--rule)",
          background: "var(--paper)",
          padding: "2rem 1.5rem",
        }}
        className="md:px-12"
      >
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="ac-eyebrow ac-back-link">
            ← Back to work
          </Link>
        </div>
      </div>
    </div>
  );
}
