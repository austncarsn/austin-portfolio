---
name: uncodixfy
description: Prevents generic AI/Codex UI patterns when generating frontend code. Use this skill whenever generating HTML, CSS, React, Vue, Svelte, or any frontend UI code to enforce clean, human-designed aesthetics inspired by Linear, Raycast, Stripe, and GitHub.
---

# Uncodixify — Local Skill

This repository includes a local copy of the `Uncodixfy` skill to guide UI generation toward "normal", human-designed interfaces and away from common AI/Codex UI patterns (floating glass shells, oversized radii, decorative badges, etc.).

Usage notes:
- Prefer using the project's existing color tokens and styles when applying the rules.
- Use this skill when generating or modifying UI components, layouts, or CSS.
- The skill is intentionally prescriptive: it lists "Keep it normal" rules and a set of "Hard No" patterns to avoid.

Core rules (summary):
- Sidebars, headers, sections, navigation, buttons, cards, forms, inputs, modals, dropdowns, tables, lists, tabs, badges, avatars, icons: keep them simple, functional, and restrained.
- Avoid oversized radii, floating glassmorphism, decorative gradients, eyebrow labels, transform-heavy hover animations, and other default "AI UI" moves.
- Use existing project colors when available; otherwise choose from the provided calm palettes.

For the full guidance, see the original project: https://github.com/cyxzdev/Uncodixfy
