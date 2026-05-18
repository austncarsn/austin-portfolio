import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Grid3X3, Menu, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SiteHeaderProps {
  dark: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "/#work" },
  { label: "Systems", href: "/playbook" },
  { label: "Lab", href: "https://github.com/austncarsn", external: true },
  { label: "Notes", href: "mailto:austncarsn@gmail.com", external: true },
];

const NAV_UNDERLINE_COLORS: Record<string, string> = {
  Projects: "var(--ac-shrimp)",
  Systems: "var(--ac-sage)",
  Lab: "var(--ac-citron)",
  Notes: "var(--ink-3)",
};

export default function SiteHeader({ dark, onToggle }: SiteHeaderProps): React.ReactElement {
  return (
    <header className="site-header" role="banner">
      <div className="site-header-inner">

        {/* ── Brand ─────────────────────────────────── */}
        <Link to="/" className="site-header-brand" aria-label="Austin Carson — home">
          <span className="site-header-stamp" aria-hidden="true">
            <img src="/assets/favicons/ac-favicon.png" alt="" />
          </span>
          <span className="site-header-brand-text">
            <span className="site-header-wordmark">Austin Carson</span>
            <span className="site-header-domain">Design engineer</span>
          </span>
        </Link>

        {/* ── Divider ───────────────────────────────── */}
        <div className="site-header-sep" aria-hidden="true" />

        {/* ── Nav ───────────────────────────────────── */}
        <nav className="site-header-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="site-header-nav-item"
              >
                <span className="site-header-nav-label">{item.label}</span>
                <span
                  className="site-header-nav-line"
                  style={{ background: NAV_UNDERLINE_COLORS[item.label] }}
                />
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                className="site-header-nav-item"
              >
                <span className="site-header-nav-label">{item.label}</span>
                <span
                  className="site-header-nav-line"
                  style={{ background: NAV_UNDERLINE_COLORS[item.label] }}
                />
              </NavLink>
            )
          )}
        </nav>

        {/* ── Right cluster ─────────────────────────── */}
        <div className="site-header-actions">
          <span className="site-header-specimen" aria-hidden="true">
            <span className="site-header-specimen-label">Status</span>
            <span className="site-header-specimen-id">Available</span>
          </span>

          <span className="site-header-location" aria-hidden="true">
            <span>UTC-07:00</span>
            <span>Missoula, Montana</span>
          </span>

          <motion.button
            onClick={onToggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            className="site-header-theme-btn"
            whileTap={{ scale: 0.94 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {dark ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex" }}
                >
                  <Sun size={14} strokeWidth={1.8} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex" }}
                >
                  <Moon size={14} strokeWidth={1.8} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <a
            href="https://github.com/austncarsn"
            target="_blank"
            rel="noopener noreferrer"
            className="site-header-globe-btn"
            aria-label="GitHub profile"
          >
            <Grid3X3 size={15} strokeWidth={1.8} />
          </a>

          <button className="site-header-menu-btn" type="button" aria-label="Open navigation">
            <Menu size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* ── System meta strip ─────────────────────── */}
      <div className="site-header-meta" aria-hidden="true">
        <span className="site-header-meta-status-dot" />
        <span>Status</span>
        <span className="site-header-meta-available">Available</span>
        <span className="site-header-meta-dot">|</span>
        <span>UTC-06:00</span>
        <span className="site-header-meta-dot">|</span>
        <span>Austin, TX</span>
        <span className="site-header-meta-spacer" />
        <span>AC-2026</span>
      </div>
    </header>
  );
}
