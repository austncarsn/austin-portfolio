import { Link } from "react-router-dom";
import { Box, CircleDot, Eye, Network, Sparkles } from "lucide-react";

type LinkItem = { label: string; href: string; internal?: boolean };

const links: LinkItem[] = [
  { label: "Playbook", href: "/playbook", internal: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/austincarson" },
  { label: "GitHub", href: "https://github.com/austncarsn" },
  { label: "Email", href: "mailto:austncarsn@gmail.com" },
];

const capabilityIcons = [
  { label: "Interface Design", Icon: Box },
  { label: "Frontend Engineering", Icon: Network },
  { label: "Creative Coding", Icon: Sparkles },
  { label: "Systems Thinking", Icon: Eye },
  { label: "Experiments", Icon: CircleDot },
];

function now() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return {
    date: `${month}.${day}.${year}`,
    time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function Footer() {
  const { date, time } = now();

  return (
    <footer className="site-footer-v2">

      {/* ── Main grid ─────────────────────────────────── */}
      <div className="sfv2-grid">

        {/* Location cell */}
        <div className="sfv2-cell">
          <span className="sfv2-cell-label">Location</span>
          <span className="sfv2-cell-heading">Missoula, Montana</span>
          <span className="sfv2-cell-sub">46.8721° N</span>
          <span className="sfv2-cell-sub">113.9940° W</span>
          <span className="sfv2-status-dot" aria-hidden="true" />
        </div>

        {/* System cell */}
        <div className="sfv2-cell">
          <span className="sfv2-cell-label">System</span>
          <span className="sfv2-cell-heading">SHRIMPS v1.0</span>
          <span className="sfv2-cell-sub sfv2-cell-sub--accent">Design System</span>
        </div>

        {/* Capabilities cell */}
        <div className="sfv2-cell sfv2-cell--caps">
          <span className="sfv2-cell-label">Capabilities</span>
          <div className="sfv2-caps-list">
            {capabilityIcons.map(({ label, Icon }) => (
              <span key={label} className="sfv2-cap-item">
                <Icon size={24} strokeWidth={1.35} aria-hidden="true" />
                <span>{label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Last updated ticket */}
        <div className="sfv2-ticket">
          <span className="sfv2-ticket-label">Last Updated</span>
          <span className="sfv2-ticket-date">{date}</span>
          <span className="sfv2-ticket-time">{time}</span>
          <span className="sfv2-ticket-rule" />
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────── */}
      <div className="sfv2-bottom">
        <div className="sfv2-stamp">
          <img src="/assets/favicons/ac-favicon.png" alt="" />
        </div>

        <div className="sfv2-bottom-copy">
          <p>© {new Date().getFullYear()} Austin Carson</p>
          <p>All rights reserved.</p>
        </div>

        <nav className="sfv2-links" aria-label="Footer links">
          {links.map((link: LinkItem) => {
            if (link.internal) {
              return (
                <Link key={link.label} to={link.href} className="sfv2-link">
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="sfv2-link"
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* ── CTA line ──────────────────────────────────── */}
      <div className="sfv2-cta">
        <p className="sfv2-cta-line">
          Available for refined web interfaces,<br />
          AI tool design &amp; visual systems.
        </p>
      </div>

    </footer>
  );
}
