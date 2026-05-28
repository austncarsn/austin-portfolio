# Austin Carson Portfolio, Codex Instructions

## Project Role

You are working on Austin Carson's personal portfolio site.

Austin is a creative technologist, design engineer, AI prompt engineer, and builder of refined web interfaces, AI powered tools, component systems, and experimental digital products.

The site should feel editorial, refined, strange, quiet, personal, professional, and intentionally unusual.

Do not turn the site into a generic startup landing page.

## Brand Direction

Preserve:
- Warm ivory editorial palette
- Refined serif display typography
- Clean sans serif metadata
- Subtle rules and spacing
- Archive, catalog, gallery, and art object feeling
- Surreal personal details where they already exist
- Light and dark theme support
- The ornamental hero artwork
- The flower footer element, unless explicitly asked to remove it

Improve when relevant:
- Legibility
- Hierarchy
- Click affordance
- Project storytelling
- Responsive behavior
- Case study credibility
- Screenshot presentation
- Accessibility
- Theme consistency

Avoid:
- Loud gradients
- Neon tech styling
- Generic SaaS cards
- Fake metrics
- Fake testimonials
- Overbuilt dashboard aesthetics
- Emoji
- Em dashes in visible copy
- The word "intersection" in visible copy
- Hyphen heavy visible copy where avoidable
- Decorative complexity that does not improve the page

## Design Quality Bar

The site should feel like:
- A refined portfolio
- A quiet digital archive
- A strange little museum for digital artifacts
- A personal art catalog for web tools, AI systems, and experiments

It should not feel like:
- A SaaS landing page
- A startup template
- A dashboard theme
- A generic developer portfolio
- A design school mockup

## Code Principles

Before editing:
1. Inspect the project structure.
2. Identify the framework, routes, styling system, data files, and scripts.
3. Identify the specific files relevant to the request.
4. Explain the files you plan to change.

While editing:
1. Make the smallest high impact changes.
2. Preserve existing routing unless obviously broken.
3. Prefer reusable components.
4. Avoid unnecessary dependencies.
5. Keep data models clean and scalable.
6. Use accessible semantic HTML.
7. Add visible focus states.
8. Respect reduced motion.
9. Prefer token and component level fixes over one off CSS hacks.
10. Do not compensate for layout bugs with extra wrappers, masks, or overlays unless necessary.

After editing:
1. Run available checks.
2. Fix errors caused by your changes.
3. Report changed files.
4. Report checks run.
5. Report unresolved issues honestly.

## Theme Standards

The site supports light and dark themes.

Theme requirements:
- Apply theme backgrounds to html, body, root, and main app shell.
- Do not allow default white browser canvas to show around the app.
- Do not use pure white borders except for intentional focus states.
- Use theme aware hairlines and dividers.
- Ensure text contrast remains readable in both themes.
- Ensure the theme toggle has a visible focus state and at least a 40px hit area.

Suggested dark tokens:
- Background: #12100D or #15120F
- Surface: #1B1713
- Text primary: #F4EFE6
- Text secondary: #B9B0A3
- Text muted: #7F776C
- Hairline: rgba(244, 239, 230, 0.12)
- Hairline strong: rgba(244, 239, 230, 0.22)

Suggested light tokens:
- Background: #F2EFE7 or #F5F1E8
- Surface: #FBF8F0
- Text primary: #1F1915
- Text secondary: #6F675E
- Text muted: #8B8378
- Hairline: rgba(31, 25, 21, 0.12)
- Hairline strong: rgba(31, 25, 21, 0.22)

## Homepage Standards

The homepage should communicate within the first few seconds:

Austin Carson designs and builds refined interfaces, AI tools, visual systems, and experimental digital products.

Preferred positioning sentence:

"Design engineer building refined interfaces, AI tools, and visual systems for the web."

The homepage should include:
- Editorial hero
- Clear Austin Carson identity
- Concise positioning copy
- Selected work archive
- Project rows with truthful titles, categories, summaries, dates, and links
- Footer with contact links and site credit

Project rows should:
- Be keyboard accessible
- Have visible hover and focus states
- Have readable metadata
- Avoid awkward clipped descriptions
- Preserve the archive index feeling

## Project Data Standards

Every project should be truthful and specific.

Preferred project data model:

```ts
{
  slug: string
  title: string
  category: string
  summary: string
  description?: string
  date: string
  type?: string
  status?: "Live" | "In Progress" | "Archived" | "Prototype"
  liveUrl?: string
  screenshot?: string
  screenshotAlt?: string
  role?: string[]
  stack?: string[]
  focus?: string[]
  overview?: string
  problem?: string
  approach?: string
  engineering?: string
  outcome?: string
}
