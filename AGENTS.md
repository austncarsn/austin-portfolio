# Project operating rules

## Stack
- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- `@fontsource/inter`

## Product constraints
- This is a single-page portfolio site. Do not add routes or additional pages unless explicitly requested.
- Keep the 680px max-width used by the main sections.
- Preserve the Inter-based typography system in `src/styles/globals.css`.
- Keep the hero name styling on `.hero-name`.
- Keep project content in `src/data/projects.ts`.
- When adding a project, provide `title`, `label`, `description`, `learned`, and `url`.
- Keep dark mode class-based on `<html>` and controlled in `src/App.tsx`.

## Working style
- Prefer small, surgical edits over broad rewrites.
- Reuse existing patterns before creating new abstractions.
- Preserve accessibility and semantic HTML.
- Keep diffs focused and easy to review.
- Do not introduce dependencies unless necessary and approved.
- Do not weaken types or add `any` without a concrete reason.
- Avoid unrelated churn in files outside the current task.

## Workflow
1. Restate the goal in one sentence.
2. Name the files you expect to touch.
3. Make the smallest correct change.
4. Run the required verification commands.
5. Summarize what changed, what you verified, and any remaining risks.

## Required verification

All three must pass before shipping any change:

| Script | Command | Purpose |
|---|---|---|
| build | `npm run build` | tsc type check + Vite production build |
| typecheck | `npm run typecheck` | Standalone `tsc --noEmit` |
| lint | `npm run lint` | ESLint across `src/**/*.{ts,tsx}` |

## Automated tests

**Not configured.** `npm run test` is a **temporary placeholder only** — it prints a notice and exits 0. It provides no real coverage. Do not treat a passing `test` run as meaningful validation.

Vitest is intentionally deferred until there is testable logic in the codebase. When it is added, remove the placeholder script and update this file.

## Definition of done
- Build passes
- Typecheck passes
- Lint passes
- No secrets added
- No unrelated file churn
- Runtime behavior remains unchanged unless the task explicitly calls for it

## Guardrails
- Do not read or print secrets from `.env*`, `secrets/`, or credential files.
- Ask before changing deployment, CI, auth, billing, or analytics behavior.
- Ask before deleting files or renaming public routes.

## Local agent skills
- `uncodixfy`: added as `skills/uncodixfy/SKILL.md` — guidance to avoid generic AI/Codex UI patterns when generating frontend code. To install the published skill use `npx skills add cyxzdev/Uncodixfy`, or reference this local copy for offline use.
