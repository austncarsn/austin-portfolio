import { X } from "lucide-react";
import React from "react";

interface SidebarProps {
  activeId?: string;
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function PlaybookSidebar({
  activeId,
  mobileOpen,
  onClose,
}: SidebarProps): React.ReactElement {
  const overlayClass = mobileOpen ? "playbook-sidebar overlay open" : "playbook-sidebar overlay";

  return (
    <aside id="playbook-sidebar" className={overlayClass} aria-label="Playbook navigation">
      <div className="site-title">
        <strong>AI Playbook</strong>
        <span>Plain English Spec</span>
      </div>
      {mobileOpen && (
        <div className="playbook-sidebar-close">
          <button type="button" aria-label="Close navigation" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      )}

      <nav>
        <div className="menu-section">
          <span className="menu-label">01 / The Token Problem</span>
          <ul className="menu-links">
            <li>
              <a href="#overview" className={activeId === "overview" ? "active" : ""}>
                Overview
              </a>
            </li>
            <li>
              <a href="#mcp-vs-cli" className={activeId === "mcp-vs-cli" ? "active" : ""}>
                AI Memory vs. Commands
              </a>
            </li>
            <li>
              <a href="#bloat-vs-poison" className={activeId === "bloat-vs-poison" ? "active" : ""}>
                Why the AI Breaks
              </a>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <span className="menu-label">02 / Writing Project Rules</span>
          <ul className="menu-links">
            <li>
              <a href="#writing-rules" className={activeId === "writing-rules" ? "active" : ""}>
                How to Write Rules
              </a>
            </li>
            <li>
              <a href="#agents-skeleton" className={activeId === "agents-skeleton" ? "active" : ""}>
                Copy AGENTS.md Template
              </a>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <span className="menu-label">03 / Stuck Loops</span>
          <ul className="menu-links">
            <li>
              <a href="#stuck-loops" className={activeId === "stuck-loops" ? "active" : ""}>
                3 Loop Circuit Breakers
              </a>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <span className="menu-label">04 / Code Review</span>
          <ul className="menu-links">
            <li>
              <a href="#test-sandboxes" className={activeId === "test-sandboxes" ? "active" : ""}>
                Setting Up Local Tests
              </a>
            </li>
            <li>
              <a
                href="#adversarial-checklist"
                className={activeId === "adversarial-checklist" ? "active" : ""}
              >
                Pre-Merge Code Checklist
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
