import { motion } from "framer-motion";
import React from "react";
import { Project } from "../data/projects";
import { FloralOrigamiInteractive } from "./FloralOrigamiInteractive";
import { OrbitalUI } from "./OrbitalUI";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.2, 0.6, 0.2, 1] },
  }),
};

interface StatProps {
  label: string;
  value: string;
}

const Stat = ({ label, value }: StatProps) => (
  <div className="flex flex-col gap-1">
    <span className="ac-meta" style={{ opacity: 0.4 }}>
      {label}
    </span>
    <span
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "var(--t-h3)",
        fontWeight: 300,
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
    className="py-24 px-6 md:px-12"
  >
    <div className="max-w-4xl mx-auto">
      <p className="ac-eyebrow mb-12" style={{ letterSpacing: "0.2em" }}>
        {eyebrow}
      </p>
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
  const heroImage = caseStudyImages[0];
  const hasCaseStudyGallery = caseStudyImages.length > 1;

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen antialiased"
    >
      {/* ── REDESIGNED HERO ── */}
      <header
        style={{
          background: "var(--cameo-onyx)",
          color: "var(--bone)",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          position: "relative",
          overflow: "hidden",
        }}
        className="px-6 md:px-12"
      >
        {/* Background Geometric Element */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            background:
              "radial-gradient(circle, rgba(91,155,213,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            gridColumn: "span 12",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Top-left coordinates / breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              top: "clamp(2rem, 5vw, 5rem)",
              left: "clamp(2rem, 5vw, 5rem)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-micro)",
              letterSpacing: "var(--track-mono)",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            {project.label} / {project.date} / index_01
          </motion.div>

          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mb-4"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--t-micro)",
                  letterSpacing: "var(--track-mono)",
                  textTransform: "uppercase",
                  color: "var(--ac-blue)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 1,
                    background: "var(--ac-blue)",
                  }}
                />
                {project.label}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 10vw, 8rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: "var(--bone)",
                marginTop: "1rem",
                marginBottom: "2.5rem",
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
                fontSize: "clamp(1rem, 1.2vw, 1.3rem)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.5)",
                maxWidth: "32rem",
                marginBottom: "4rem",
              }}
            >
              {project.description}
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex gap-12 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Stat label="Type" value={project.label} />
              <Stat label="Date" value={project.date} />
              {project.url && project.url !== "#" && (
                <div className="flex flex-col gap-1">
                  <span className="ac-meta" style={{ opacity: 0.4 }}>
                    Live
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--t-small)",
                      color: "var(--ac-blue)",
                      textDecoration: "none",
                      letterSpacing: "var(--track-mono-tight)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    Access ↗
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Absolute Image Layer - Minimalist Reveal */}
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, filter: "grayscale(100%) brightness(0.5)" }}
            animate={{ opacity: 0.4, filter: "grayscale(50%) brightness(0.6)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <img
              src={heroImage}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </motion.div>
        )}
      </header>

      {/* ── Image Gallery ── */}
      {hasCaseStudyGallery && (
        <div
          style={{
            background: "var(--cameo-onyx)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
          className="px-6 md:px-12 pb-24"
        >
          <div
            style={{
              maxWidth: "72rem",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {caseStudyImages.slice(1).map((image, index) => (
              <motion.img
                key={image}
                src={image}
                alt={`${project.title} view ${index + 2}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                style={{
                  width: "100%",
                  aspectRatio: "16 / 10",
                  objectFit: "cover",
                  borderRadius: "var(--r-2)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  filter: "saturate(0.9) brightness(0.8)",
                }}
              />
            ))}
          </div>
          <div style={{ maxWidth: "72rem", margin: "1.5rem auto 0" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-micro)",
                letterSpacing: "var(--track-mono)",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Production Reference Frames
            </span>
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

