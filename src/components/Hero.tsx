import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  },
});

const reveal = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0, ease: EASE, delay },
  },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay },
  },
});

function HeroContent({ onScrollToWork }: { onScrollToWork: (e: MouseEvent<HTMLAnchorElement>) => void }): JSX.Element {
  return (
    <div className="hc-content">
      <motion.p
        className="hc-eyebrow"
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="visible"
      >
        <span>Design Engineer</span>
        <span className="hc-eyebrow-dot" aria-hidden="true" />
        <span>AI Interfaces</span>
        <span className="hc-eyebrow-dot" aria-hidden="true" />
        <span>Visual Systems</span>
      </motion.p>

      <motion.h1
        className="hc-name"
        variants={fadeUp(0.22)}
        initial="hidden"
        animate="visible"
      >
        <span className="hc-name-line">Austin</span>
        <span className="hc-name-line">Carson</span>
      </motion.h1>

      <motion.div
        className="hc-divider"
        aria-hidden="true"
        variants={reveal(0.48)}
        initial="hidden"
        animate="visible"
      >
        <span className="hc-divider-line" />
        <span className="hc-divider-mark" aria-hidden="true" />
        <span className="hc-divider-line" />
      </motion.div>

      <motion.p
        className="hc-tagline"
        variants={fadeUp(0.56)}
        initial="hidden"
        animate="visible"
      >
        I build expressive digital systems, AI-powered interfaces, and visual
        tools that turn strange ideas into polished products.
      </motion.p>

      <motion.div
        className="hc-actions"
        variants={fadeUp(0.68)}
        initial="hidden"
        animate="visible"
      >
        <Link
          to="/#work"
          className="hc-btn hc-btn--primary"
          onClick={onScrollToWork}
        >
          <span>View Projects</span>
          <ArrowDown size={12} strokeWidth={2} aria-hidden="true" />
        </Link>
        <Link to="/playbook" className="hc-btn hc-btn--ghost">
          <span>Playbook</span>
          <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
        </Link>
      </motion.div>

      <motion.ul
        className="hc-tags"
        aria-label="Selected expertise"
        variants={fadeUp(0.8)}
        initial="hidden"
        animate="visible"
      >
        {[
          "Design Systems",
          "AI Interfaces",
          "Prototyping",
          "Creative Direction",
        ].map((tag) => (
          <li key={tag} className="hc-tag">
            {tag}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

function HeroVisualCluster(): JSX.Element {
  return (
    <div className="hvc-root" aria-hidden="true">

      {/* Atmospheric depth layer behind all objects */}
      <div className="hvc-atmosphere" />

      {/* SHRIMPS panel — primary object, centre of cluster */}
      <motion.div
        className="hvc-panel"
        variants={scaleIn(0.3)}
        initial="hidden"
        animate="visible"
      >
        <img
          src="/assets/images/shrimps-panel.png"
          alt=""
          className="hvc-panel-img"
          loading="eager"
          decoding="async"
        />
        {/* Grounded contact shadow */}
        <div className="hvc-panel-shadow" />
      </motion.div>

      {/* Squirrel on cloud — upper right, behind panel */}
      <motion.div
        className="hvc-artifact hvc-artifact--squirrel"
        variants={scaleIn(0.55)}
        initial="hidden"
        animate="visible"
      >
        <img
          src="/assets/images/squirrel-hero.png"
          alt=""
          className="hvc-artifact-img hvc-artifact-img--multiply"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Hamster cameo — lower left, in front of panel */}
      <motion.div
        className="hvc-artifact hvc-artifact--cameo"
        variants={scaleIn(0.7)}
        initial="hidden"
        animate="visible"
      >
        <img
          src="/assets/images/hamster-cameo.png"
          alt=""
          className="hvc-artifact-img"
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Tulip — lower right, foreground, partial crop */}
      <motion.div
        className="hvc-artifact hvc-artifact--tulip"
        variants={scaleIn(0.62)}
        initial="hidden"
        animate="visible"
      >
        <img
          src="/assets/images/hero-tulip.png"
          alt=""
          className="hvc-artifact-img"
          loading="lazy"
          decoding="async"
        />
      </motion.div>

    </div>
  );
}

export function Hero(): JSX.Element {
  const scrollToWork = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.href = "/#work";
  };

  return (
    <section className="hero" aria-label="Introduction">

      {/* Background: sky + statue photograph */}
      <div className="hero-bg" aria-hidden="true">
        <img
          src="/assets/images/hero-bg.png"
          alt=""
          className="hero-bg-img"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-bg-veil" />
      </div>

      {/* Two-column layout */}
      <div className="hero-layout">
        <HeroContent onScrollToWork={scrollToWork} />
        <HeroVisualCluster />
      </div>

      {/* Bottom gradient: scene dissolves into page */}
      <div className="hero-floor" aria-hidden="true" />

    </section>
  );
}
