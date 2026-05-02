# Uncodixfy — Usage for this project

Purpose: map the `uncodixfy` rules to this repo's components and give concrete authoring guidance so contributors produce "normal" UI consistent with the project's design rules.

Primary principles
- Use existing tokens and styles in `src/styles/globals.css` whenever possible.
- Favor simple structure, restrained spacing, subtle borders, and small radii (8–12px).
- Avoid decorative gradients, floating glass panels, oversized radii (20–32px), eyebrow labels, and transform-heavy hover animations.

How to apply when authoring components

- Buttons
  - Radius: 8px. Solid fill or 1px border. No pill shapes.
  - Sizes: keep padding compact (8px vertical, 12–16px horizontal).
  - Focus: simple outline or subtle box-shadow (100–200ms ease).

- Cards (project items, lists)
  - Radius: 8–12px, subtle 1px border, background defined by project tokens.
  - Shadows: max `0 2px 8px rgba(0,0,0,0.08)` if needed; prefer none.
  - No floating detached shells or heavy glows.

- Layout & Spacing
  - Use consistent spacing scale (4/8/12/16/24/32px). Avoid overpadding sections.
  - Max-width patterns: keep 680px content width where applicable.

- Typography
  - Preserve `Inter` usage in `src/styles/globals.css` and keep clear hierarchy (h1/h2/p).
  - Avoid eyebrow small-caps/uppercase labels as decorative elements.

Component-by-component notes (this repo)
- `src/components/Hero.tsx`: keep the `hero-name` styling; avoid oversized decorative badges inside the hero. Use clear, readable sizes and maintain section spacing.
- `src/components/ProjectCard.tsx`: ensure card radius is 8–12px; use subtle border and minimal shadow. Show only functional badges (e.g., link icons), not decorative labels.
- `src/components/Projects.tsx`: keep the grid simple and responsive; avoid metric-card grids as default presentation.
- `src/components/FortuneBox.tsx`: simple bordered box with small radius; avoid animated morphed shapes for the reveal — prefer opacity/scale (100–200ms) if animation is needed.
- `src/components/ThemeToggle.tsx`: simple icon button with accessible label, 8px radius, no flashy gradients.
- `src/components/Footer.tsx`: small, minimal link set, low visual weight.

Prompt / Skill usage guidance
- When asking the agent to generate or change UI, include the local skill name or the file text in the system prompt. Example instruction snippet to include when requesting UI changes:

```
Use the Uncodixfy guidance in `skills/uncodixfy/SKILL.md` to avoid floating glass, oversized radii, eyebrow labels, and decorative gradients. Prefer subtle borders, small radii (8-12px), consistent spacing, and the project's existing colors.
```

Where to reference
- Local skill: `skills/uncodixfy/SKILL.md`
- Usage guidance (this file): `skills/uncodixfy/USAGE.md`

Next steps you might ask me to do
- Run a sweep of `src/components` and propose concrete small edits to bring each component fully into compliance.
- Add ESLint/StyleLint rules or Prettier configs that enforce some of these constraints automatically.
