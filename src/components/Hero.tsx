import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EASE = [0.22, 0.6, 0.22, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const capabilities = ["Design", "Engineering", "Systems"];

export default function Hero() {
  return (
    <motion.section
      className="hero-outer"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Introduction"
    >
      <div aria-hidden="true" className="hero-atmosphere" />

      <div className="hero-catalog-shell">
        <div className="hero-topline" aria-hidden="true">
          <span>Catalog ID</span>
          <span>AC-2026-01</span>
          <span>Personal Interface System</span>
        </div>

        <div className="hero-cover">
          <div className="hero-cover-main">
            <motion.h1 variants={itemVariants} className="hero-name">
              Austin
              <br />
              Carson
            </motion.h1>

            <motion.div variants={itemVariants} className="hero-rule" aria-hidden="true" />

            <motion.p variants={itemVariants} className="hero-positioning">
              Design engineer building refined interfaces, AI tools, and visual
              systems for the web.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-actions">
              <Link to="/#work" className="hero-action hero-action--primary">
                <span>View projects</span>
                <span aria-hidden="true">↗</span>
              </Link>
              <Link to="/playbook" className="hero-action hero-action--secondary">
                <span>Playbook</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-catalog-card" aria-hidden="true">
              <span>
                Catalog ID
                <strong>AC-2026-07</strong>
              </span>
              <img src="/assets/favicons/ac-favicon.png" alt="" />
            </motion.div>
          </div>

          <motion.aside variants={itemVariants} className="hero-discipline-card" aria-hidden="true">
            <span className="hero-corner hero-corner--tl" />
            <span className="hero-corner hero-corner--tr" />
            <span className="hero-corner hero-corner--bl" />
            <span className="hero-corner hero-corner--br" />
            {capabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </motion.aside>
        </div>

        <motion.figure variants={itemVariants} className="hero-specimen-wrap">
          <span className="hero-corner hero-corner--tl" />
          <span className="hero-corner hero-corner--tr" />
          <span className="hero-corner hero-corner--bl" />
          <span className="hero-corner hero-corner--br" />

          <figcaption className="hero-specimen-id">
            <span>//001</span>
            <span>Shrimp Specimen</span>
          </figcaption>

          <span className="hero-specimen-label hero-specimen-label--left">
            Penaeus Vannamei
          </span>
          <span className="hero-specimen-label hero-specimen-label--right">
            Class: Malacostraca
          </span>

          <img
            src="/assets/images/shrimp_4k.webp"
            alt="Shrimp specimen floating above a catalog plinth"
            className="hero-specimen-img"
          />

          <div className="hero-specimen-note hero-specimen-note--left" aria-hidden="true">
            <span>Observation</span>
            <span>Structure</span>
          </div>

          <div className="hero-specimen-note hero-specimen-note--right" aria-hidden="true">
            <span>Fig. A</span>
          </div>
        </motion.figure>

        <motion.div variants={itemVariants} className="hero-data-bar" aria-label="Portfolio metadata">
          <div className="hero-data-cell">
            <span className="hero-data-label">Location</span>
            <span className="hero-data-value">Missoula, Montana</span>
            <span className="hero-data-sub">46.8721° N / 113.9940° W</span>
          </div>
          <div className="hero-data-cell">
            <span className="hero-data-label">System</span>
            <span className="hero-data-value">SHRIMPS v1.0</span>
            <span className="hero-data-sub hero-data-active">
              <span className="hero-data-dot hero-data-dot--green" /> Active
            </span>
          </div>
          <div className="hero-data-cell hero-data-cell--caps">
            <span className="hero-data-label">Capabilities</span>
            <div className="hero-data-caps-grid">
              <span>Interface Design</span>
              <span>Frontend Engineering</span>
              <span>Creative Coding</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
