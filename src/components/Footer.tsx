import { Link } from "react-router-dom";

type LinkItem = { label: string; href: string; internal?: boolean };

const links: LinkItem[] = [
  { label: "Playbook", href: "/playbook", internal: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/austincarson" },
  { label: "GitHub", href: "https://github.com/austncarsn" },
  { label: "Email", href: "mailto:austncarsn@gmail.com" },
];

export default function Footer(): JSX.Element {
  return (
    <footer className="site-footer-v2">
      {/* ── Bottom bar ────────────────────────────────── */}
      <div className="sfv2-bottom">
        <div className="sfv2-stamp">
          <img src="/assets/favicons/ac-favicon.png" alt="" loading="lazy" decoding="async" />
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
          Available for refined web interfaces,
          <br />
          AI tool design &amp; visual systems.
        </p>
      </div>
    </footer>
  );
}
