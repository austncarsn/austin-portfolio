import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ContactForm } from "./ContactForm";

interface SiteHeaderProps {
  dark: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "/#work" },
  { label: "Playbook", href: "/playbook" },
];

export default function SiteHeader({ dark, onToggle }: SiteHeaderProps): React.ReactElement {
  const [contactOpen, setContactOpen] = React.useState(false);

  return (
    <header className="site-header" role="banner">
      <div className="site-header-inner">
        {/* ── Brand ─────────────────────────────────── */}
        <Link to="/" className="site-header-brand" aria-label="Austin Carson — home">
          <span className="site-header-stamp" aria-hidden="true">
            <img src="/assets/favicons/ac-favicon.png" alt="" loading="lazy" decoding="async" />
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
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} to={item.href} className="site-header-nav-item">
              <span className="site-header-nav-label">{item.label}</span>
              <span className="site-header-nav-line" />
            </NavLink>
          ))}
        </nav>

        {/* ── Right cluster ─────────────────────────── */}
        <div className="site-header-actions">
          <button
            type="button"
            className="site-header-contact-btn"
            onClick={() => setContactOpen(true)}
            aria-label="Open contact form"
          >
            Contact
          </button>

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
        </div>
      </div>

      <nav className="site-header-mobile-nav" aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.label} to={item.href} className="site-header-mobile-link">
            {item.label}
          </NavLink>
        ))}
        <button
          type="button"
          className="site-header-mobile-link site-header-mobile-contact"
          onClick={() => setContactOpen(true)}
        >
          Contact
        </button>
      </nav>

      {contactOpen && (
        <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Contact form">
          <div className="contact-modal-backdrop" onClick={() => setContactOpen(false)} />
          <ContactForm onClose={() => setContactOpen(false)} />
        </div>
      )}
    </header>
  );
}
