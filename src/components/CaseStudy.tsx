import { motion } from "framer-motion";
import React from "react";
import { Project } from "../data/projects";
import { FloralOrigamiInteractive } from "./FloralOrigamiInteractive";
import { OrbitalUI } from "./OrbitalUI";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.2, 0.6, 0.2, 1] },
  }),
};

interface StatProps {
  label: string;
  value: string;
}

const Stat = ({ label, value }: StatProps) => (
  <div className="flex flex-col gap-1">
    <span className="ac-meta">{label}</span>
    <span
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--t-h3)",
        fontWeight: 400,
        color: "var(--ink)",
      }}
    >
      {value}
    </span>
  </div>
);

interface SectionProps {
  eyebrow: string;
  children: React.ReactNode;
  tinted?: boolean;
}

const Section = ({ eyebrow, children, tinted = false }: SectionProps) => (
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

export const CaseStudy = ({ project }: { project: Project }) => {
  const isOrbital = project.title === "Orbital UI Concept";
  const isCowboy =
    project.slug === "cowboy2050" ||
    project.title.toLowerCase().includes("cowboy 2050");
  const isFloral =
    project.slug === "floral-origami" ||
    project.title.toLowerCase().includes("floral origami");
  const caseStudyImages = project.screenshots?.length
    ? project.screenshots
    : project.screenshot
      ? [project.screenshot]
      : [];
  const primaryCaseStudyImage = caseStudyImages[0];
  const secondaryCaseStudyImages = caseStudyImages.slice(1);

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen antialiased"
    >
      {/* ── Hero ── */}
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
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "var(--bone)",
              marginTop: "1.25rem",
              marginBottom: "2rem",
            }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "var(--ink-3)",
              maxWidth: "38rem",
            }}
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
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-small)",
                    color: "var(--ac-blue)",
                    letterSpacing: "var(--track-mono)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  View Project ↗
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* ── Screenshot / preview ── */}
      {primaryCaseStudyImage && (
        <div
          style={{
            background: "var(--paper-3)",
            borderTop: "1px dashed var(--rule)",
          }}
          className="px-6 md:px-12 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <div style={{ display: "grid", gap: "1rem" }}>
              <img
                src={primaryCaseStudyImage}
                alt={`${project.title} screenshot`}
                style={{
                  width: "100%",
                  borderRadius: "var(--r-2)",
                  border: "1px solid var(--rule)",
                  display: "block",
                }}
              />

              {secondaryCaseStudyImages.length > 0 && (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {secondaryCaseStudyImages.map((image, index) => (
                      <img
                        key={image}
                        src={image}
                        alt={`${project.title} reference ${index + 2}`}
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

                  <p className="ac-meta">Desktop reference frames from the live deploy.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── The Vision ── */}
      <Section eyebrow="The Vision">
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {isOrbital ? (
            <>
              <p className="ac-prose" style={{ maxWidth: "38rem" }}>
                A spatial exploration of data navigation utilizing 3D orbital
                mechanics to break the traditional 2D grid layout.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <OrbitalUI />
              </div>
            </>
          ) : isCowboy ? (
            <>
              <p className="ac-prose" style={{ maxWidth: "38rem" }}>
                The objective was to craft a premium western archive landing
                experience with a modern digital interface — combining cinematic
                brand storytelling, responsive layout, and polished motion
                transitions.
              </p>
            </>
          ) : isFloral ? (
            <>
              <p className="ac-prose" style={{ maxWidth: "38rem" }}>
                A neon interactive experiment that blends motion-driven UI,
                stage-based input, and responsive particle animation.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <FloralOrigamiInteractive />
              </div>
            </>
          ) : (
            <p className="ac-prose" style={{ maxWidth: "38rem" }}>
              {project.description}
            </p>
          )}
        </div>
      </Section>

      {/* ── Engineering ── */}
      <Section eyebrow="Engineering" tinted>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {isOrbital ? (
            <>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-small)",
                    letterSpacing: "var(--track-mono)",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  3D Perspective
                </h3>
                <p className="ac-body">
                  Engineered a complex 3D perspective system using trigonometry
                  and requestAnimationFrame to create a seamless, orbital
                  navigation experience.
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-small)",
                    letterSpacing: "var(--track-mono)",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Spatial Logic
                </h3>
                <p className="ac-body">
                  Broke the traditional 2D grid to allow users to traverse
                  information in a spherical coordinate system.
                </p>
              </div>
            </>
          ) : isCowboy ? (
            <>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-small)",
                    letterSpacing: "var(--track-mono)",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Design System
                </h3>
                <p className="ac-body">
                  Defined a custom 2050 Western token palette in CSS custom
                  properties, supporting a light/dark theme, consistent shadows,
                  and branded color hierarchy.
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-small)",
                    letterSpacing: "var(--track-mono)",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Interaction
                </h3>
                <p className="ac-body">
                  Built a motion-led homepage with scroll reveals, parallax
                  accents, a marquee, and responsive navigation for an immersive
                  brand-first experience.
                </p>
              </div>
            </>
          ) : isFloral ? (
            <>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-small)",
                    letterSpacing: "var(--track-mono)",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Motion-driven UI
                </h3>
                <p className="ac-body">
                  Crafted a stage-based interaction surface with motion/react
                  and layered neon glow styling for a tactile, responsive
                  experience.
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-small)",
                    letterSpacing: "var(--track-mono)",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Interaction system
                </h3>
                <p className="ac-body">
                  Built an event-driven press counter with animated particles,
                  stage transitions, and reactive button feedback for a playful
                  physics-inspired interface.
                </p>
              </div>
            </>
          ) : (
            <div className="md:col-span-2">
              <p className="ac-body">{project.learned}</p>
            </div>
          )}
        </div>
      </Section>

      {/* ── Outcome ── */}
      <Section eyebrow="Outcome">
        <blockquote
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.25,
            color: "var(--ink)",
            borderLeft: "2px solid var(--rule)",
            paddingLeft: "1.5rem",
            maxWidth: "36rem",
          }}
        >
          {isCowboy
            ? "A polished modern western demo shop built for brand storytelling, motion-led interaction, and static deployment readiness."
            : project.description}
        </blockquote>
      </Section>

      {/* ── Footer nav ── */}
      <div
        style={{
          borderTop: "1px dashed var(--rule)",
          background: "var(--paper)",
          padding: "2rem 1.5rem",
        }}
        className="md:px-12"
      >
        <div className="max-w-4xl mx-auto">
          <a
            href="/"
            className="ac-eyebrow"
            style={{ textDecoration: "none", color: "var(--ink-3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
          >
            ← Back to work
          </a>
        </div>
      </div>
    </div>
  );
};
