# Claude project memory

This repository is a single-page portfolio site built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and `@fontsource/inter`.

## Default behavior
- Work in small, focused increments.
- Explain the plan briefly before changing code.
- Name the files you expect to edit.
- Prefer surgical edits over broad rewrites.
- Preserve the current architecture unless the task clearly requires structural change.

## Project-specific rules
- Keep this as a single-page site. Do not add routes or extra pages unless explicitly requested.
- Preserve the 680px max-width pattern used across the main sections.
- Keep the Inter font system defined in `src/styles/globals.css`.
- Keep the hero name on the `.hero-name` class instead of moving that styling into the `h1` rule.
- Add or edit project entries only in `src/data/projects.ts`.
- When adding a project, fill in all five fields: `title`, `label`, `description`, `learned`, and `url`.
- Dark mode is class-based on `<html>` and is controlled from `src/App.tsx`.
- Reuse existing patterns before adding new abstractions.
- Do not add new dependencies unless they materially simplify the work and have been approved.

## Code standards
- Keep TypeScript strict and avoid weakening types.
- Preserve semantic HTML and accessible interactions.
- Keep components readable and composable.
- Avoid unrelated file churn.

## Validation
After meaningful changes, run all three — all must pass before shipping:
- `npm run build` — tsc type check + Vite production build
- `npm run typecheck` — standalone `tsc --noEmit`
- `npm run lint` — ESLint across `src/**/*.{ts,tsx}`

Automated tests are **not configured**. `npm run test` is a temporary placeholder that prints a notice and exits 0. It does not provide real coverage. Do not treat a passing `test` run as meaningful validation. Vitest is deferred until there is logic worth testing.

If a command fails:
- identify the actual root cause
- fix the smallest thing that resolves it
- rerun the relevant checks

## Output expectations
At the end of a task:
1. Summarize the change.
2. List files touched.
3. Report verification results.
4. Call out any risks, tradeoffs, or follow-up work.
