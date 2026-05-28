import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Project } from "../../data/projects";
import { getProjectScreenshots, projects } from "../../data/projects";
import {
  ArchiveLabelUnderline,
  CurlArrowDown,
  EngineeringMarginArrow,
  EngineeringWaveUnderline,
  FigBracketAnnotation,
  InkFilterDefs,
  OutcomeStarMark,
  OverviewUnderline,
  ReturnArrowAnnotation,
  StatusCircleAnnotation,
  TitleBracketAnnotation,
} from "../InkAnnotations";

// ── Motion ──────────────────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const typeIn = {
  hidden: { opacity: 0, y: 2 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// ── Style constants ──────────────────────────────────────────────────
const pageStyle: React.CSSProperties = {
  background: "var(--paper)",
  color: "var(--ink)",
  minHeight: "100vh",
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  lineHeight: 1.6,
  padding: "8rem 1.5rem 4rem",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "var(--container-max)",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
};

const labelStyle: React.CSSProperties = {
  color: "var(--ink-3)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  fontSize: "0.85rem",
};

const valueStyle: React.CSSProperties = {
  color: "var(--ink)",
};

const dividerStyle: React.CSSProperties = {
  borderTop: "1px dashed var(--rule-strong)",
  width: "100%",
  margin: "1.5rem 0",
};

const linkStyle: React.CSSProperties = {
  color: "var(--ink)",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
  textDecorationThickness: "1px",
};

// ── Components ──────────────────────────────────────────────────────

function FadeImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} Screenshot pending.`}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--paper-2)",
          border: "1px solid var(--rule)",
          minHeight: "12rem",
        }}
      >
        <span style={labelStyle}>[ IMAGE_UNAVAILABLE ]</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.4s ease",
        filter: "grayscale(15%) contrast(1.05)",
      }}
    />
  );
}

function TypewriterRow({
  label,
  value,
  isLink,
  href,
}: {
  label: string;
  value: string;
  isLink?: boolean;
  href?: string;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "1rem" }}>
      <span style={labelStyle}>{label}</span>
      {isLink && href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
          {value}
        </a>
      ) : (
        <span style={valueStyle}>{value}</span>
      )}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <span style={labelStyle}>// {title}</span>
      <div style={{ borderTop: "1px dashed var(--rule-strong)", marginTop: "0.5rem" }} />
    </div>
  );
}

// ── Content model ───────────────────────────────────────────────────
interface EngineeringCard {
  title: string;
  body: string;
}
interface CaseStudyContent {
  label: string;
  vision: string;
  engineering: EngineeringCard[];
  outcome?: string;
}

const buildContent = (project: Project): CaseStudyContent => {
  const slug = project.slug ?? "";
  const title = project.title.toLowerCase();
  const isSnapshot = !project.liveUrl && project.status === "Prototype";
  const fallbackEngineering =
    project.engineering ?? project.learned ?? "No engineering notes recorded.";

  if (
    title.includes("orbital ui") ||
    slug === "cowboy-2050" ||
    title.includes("cowboy 2050") ||
    slug === "floral-origami" ||
    title.includes("floral origami")
  ) {
    return {
      label: "Project Snapshot",
      vision: project.overview ?? project.description,
      engineering: [
        { title: "Approach", body: project.approach ?? project.description },
        { title: "Build", body: fallbackEngineering },
      ],
      outcome: project.outcome,
    };
  }

  return {
    label: isSnapshot ? "Project Snapshot" : "Case Study",
    vision: project.overview ?? project.description,
    engineering: [
      { title: "Approach", body: project.approach ?? project.learned ?? project.description },
      { title: "Build", body: fallbackEngineering },
    ],
    outcome: project.outcome ?? project.summary ?? project.description,
  };
};

function shouldShowCaseStudyImages(project: Project): boolean {
  return project.slug !== "orbital-ui-concept";
}

// ── Scroll-triggered annotation wrapper ────────────────────────────
// Plain div with ref so useInView fires correctly on scroll entry
function InViewSection({
  children,
  style,
  onVisible,
}: {
  children: (inView: boolean) => React.ReactNode;
  style?: React.CSSProperties;
  onVisible?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  React.useEffect(() => {
    if (inView) onVisible?.();
  }, [inView, onVisible]);

  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      {children(inView)}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────
export default function CaseStudy(): JSX.Element {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(
    (p) => (p.slug ?? p.title.toLowerCase().replace(/\s+/g, "-")) === projectId
  );

  if (!project) {
    return (
      <div
        style={{ ...pageStyle, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "1rem" }}>[ ERROR: RECORD_NOT_FOUND ]</div>
          <Link to="/" style={linkStyle}>
            ← RETURN_TO_INDEX
          </Link>
        </div>
      </div>
    );
  }

  const content = buildContent(project);
  const images = shouldShowCaseStudyImages(project) ? getProjectScreenshots(project) : [];
  const liveUrl = project.liveUrl ?? (!project.url.startsWith("/work") ? project.url : undefined);

  return (
    <div style={pageStyle}>
      {/* Shared SVG displacement filters — rendered once at top of page */}
      <InkFilterDefs />

      <motion.main style={containerStyle} variants={stagger} initial="hidden" animate="show">
        {/* ── Metadata Header ─────────────────────────────────────── */}
        <motion.section variants={typeIn}>
          <InViewSection>
            {(inView) => (
              <>
                {/* Archive label + blue wavy underline */}
                <div style={{ ...labelStyle, marginBottom: "2.5rem" }}>
                  [ ARCHIVE RECORD :: {new Date().getFullYear()} ]
                  <ArchiveLabelUnderline animate={inView} />
                </div>

                {/* Red bracket in left margin around the metadata rows */}
                <div style={{ position: "relative" }}>
                  <TitleBracketAnnotation animate={inView} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <TypewriterRow label="TITLE:" value={project.title} />
                    <TypewriterRow label="DATE:" value={project.date} />
                    <TypewriterRow label="CLASS:" value={project.label} />
                    {project.status && (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "100px 1fr",
                          gap: "1rem",
                        }}
                      >
                        <span style={labelStyle}>STATUS:</span>
                        {/* Blue oval circling the status value */}
                        <span style={{ position: "relative", display: "inline-block" }}>
                          <StatusCircleAnnotation animate={inView} />
                          <span style={valueStyle}>{project.status}</span>
                        </span>
                      </div>
                    )}
                    {liveUrl && (
                      <TypewriterRow
                        label="LINK:"
                        value="[ VIEW_DEPLOYMENT ]"
                        isLink
                        href={liveUrl}
                      />
                    )}
                  </div>
                </div>

                <div style={dividerStyle} />
              </>
            )}
          </InViewSection>
        </motion.section>

        {/* ── Overview ─────────────────────────────────────────────── */}
        <motion.section variants={typeIn}>
          <InViewSection>
            {(inView) => (
              <>
                {/* Red double-underline on section header */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <span style={labelStyle}>// OVERVIEW</span>
                  <OverviewUnderline animate={inView} />
                  <div
                    style={{
                      borderTop: "1px dashed var(--rule-strong)",
                      marginTop: "0.25rem",
                    }}
                  />
                </div>
                <p style={{ whiteSpace: "pre-wrap" }}>{content.vision}</p>

                {/* Red curl arrow in right margin pointing down toward Exhibits */}
                {images.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      right: -80,
                      bottom: -100,
                      opacity: 0.9,
                    }}
                  >
                    <CurlArrowDown animate={inView} />
                  </div>
                )}
              </>
            )}
          </InViewSection>
        </motion.section>

        {/* ── Exhibits ─────────────────────────────────────────────── */}
        {images.length > 0 && (
          <motion.section variants={typeIn}>
            <InViewSection>
              {(inView) => (
                <>
                  <SectionHeader title="EXHIBITS" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "3rem",
                      marginTop: "1.5rem",
                    }}
                  >
                    {images.map((src, i) => (
                      <figure key={src} style={{ margin: 0 }}>
                        {/* Blue corner brackets drawn over each image */}
                        <div
                          style={{
                            position: "relative",
                            display: "block",
                            width: "100%",
                          }}
                        >
                          <FadeImage
                            src={src}
                            alt={`${project.title} exhibit ${i + 1}`}
                            style={{
                              width: "100%",
                              height: "auto",
                              border: "1px solid var(--rule-strong)",
                              display: "block",
                              backgroundColor: "var(--paper-2)",
                            }}
                          />
                          <FigBracketAnnotation animate={inView} />
                        </div>
                        <figcaption
                          style={{
                            ...labelStyle,
                            marginTop: "0.75rem",
                            display: "flex",
                            gap: "1rem",
                          }}
                        >
                          <span>[FIG. 0{i + 1}]</span>
                          <span>{i === 0 ? "PRIMARY CAPTURE" : "SUPPORTING CAPTURE"}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </>
              )}
            </InViewSection>
          </motion.section>
        )}

        {/* ── Engineering Notes ────────────────────────────────────── */}
        {content.engineering.length > 0 && (
          <motion.section variants={typeIn}>
            <InViewSection>
              {(inView) => (
                <>
                  {/* Red downward arrow in left margin */}
                  <EngineeringMarginArrow animate={inView} />

                  {/* Blue wavy underline on section header */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <span style={labelStyle}>// ENGINEERING_NOTES</span>
                    <EngineeringWaveUnderline animate={inView} />
                    <div
                      style={{
                        borderTop: "1px dashed var(--rule-strong)",
                        marginTop: "0.25rem",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {content.engineering.map((card) => (
                      <div key={card.title}>
                        <h3
                          style={{
                            ...labelStyle,
                            color: "var(--ink)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          &gt; {card.title.toUpperCase()}
                        </h3>
                        <p style={{ whiteSpace: "pre-wrap" }}>{card.body}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </InViewSection>
          </motion.section>
        )}

        {/* ── Outcome ──────────────────────────────────────────────── */}
        {content.outcome && (
          <motion.section variants={typeIn}>
            <InViewSection>
              {(inView) => (
                <>
                  {/* Red asterisk star in left margin */}
                  <OutcomeStarMark animate={inView} />
                  <SectionHeader title="OUTCOME" />
                  <p style={{ whiteSpace: "pre-wrap" }}>{content.outcome}</p>
                </>
              )}
            </InViewSection>
          </motion.section>
        )}

        {/* ── Footer ───────────────────────────────────────────────── */}
        <motion.footer variants={typeIn}>
          <InViewSection>
            {(inView) => (
              <>
                <div style={dividerStyle} />
                {/* Blue curved underline + left-pointing arrow on return link */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <ReturnArrowAnnotation animate={inView} />
                  <Link
                    to="/"
                    style={{ ...linkStyle, textDecoration: "none", display: "inline-block" }}
                  >
                    [ ← RETURN_TO_DIRECTORY ]
                  </Link>
                </div>
                <div style={{ ...labelStyle, marginTop: "4rem", textAlign: "center" }}>
                  *** END OF RECORD ***
                </div>
              </>
            )}
          </InViewSection>
        </motion.footer>
      </motion.main>
    </div>
  );
}
