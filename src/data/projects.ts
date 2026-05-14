export interface Project {
  title: string;
  slug?: string;
  description: string;
  learned: string;
  url: string;
  label: string;
  date: string;
  screenshot?: string;
}

export const projects: Project[] = [
  {
    title: "Montana Civic Data",
    label: "Data",
    date: "May 2026",
    description:
      "A reference atlas documenting every Montana municipality — 499 places across 56 counties — with demographic, government, and historical records sourced and linked for each location.",
    learned:
      "Data pipeline design, building searchable/filterable interfaces over large datasets, and structuring reference sites with editorial clarity.",
    url: "https://montana-civic-data.vercel.app/",
    screenshot: "/screenshots/montana-civic-data.png",
  },
  {
    title: "Daily Mike",
    label: "App",
    date: "Jan 2026",
    description:
      "Personal React dashboard with a Star Trek/Borg aesthetic. Includes poker strategy tools, stock analysis, a Star Trek quiz, and personal log content.",
    learned:
      "Large-scale Tailwind/shadcn component architecture, file structure refactoring, and building multiple tools under a single cohesive design system.",
    url: "https://mikethecookie.com/",
    screenshot: "/screenshots/daily-mike.png",
  },
  {
    title: "Cameo Web",
    label: "App",
    date: "Oct 2025",
    description:
      "A web application project exploring UI interaction patterns and component design.",
    learned:
      "Component composition and building reusable UI patterns in React.",
    url: "https://cameo-web.vercel.app/",
    screenshot: "/screenshots/cameo-web.gif",
  },
  {
    title: "East Texas History",
    label: "Site",
    date: "Aug 2025",
    description:
      "A content-focused website dedicated to archiving and presenting East Texas historical records and imagery.",
    learned:
      "Content architecture, image handling, and building sites with editorial structure.",
    url: "https://east-texas-heritage.vercel.app/",
    screenshot: "/screenshots/east-texas-history.png",
  },
  {
    title: "AI Text Sanitizer",
    label: "Tool",
    date: "May 2026",
    description:
      "A browser-based tool for humanizing AI-generated text — strips robotic patterns, normalizes phrasing, and surfaces a cleaner editorial voice.",
    learned:
      "Building single-file browser tools with no build step, and designing clear input/output UX for text transformation workflows.",
    url: "#",
  },
  {
    title: "Figma Make Mastery Guide",
    label: "Guide",
    date: "Mar 2026",
    description:
      "A synthesized research guide covering prompt engineering patterns for Figma Make, v0, Bolt, and Lovable.",
    learned:
      "Prompt engineering for AI design tools and how to distill research into actionable reference material.",
    url: "https://refmake.vercel.app/",
    screenshot: "/screenshots/figma-make-mastery.png",
  },
  {
    title: "Orbital UI Concept",
    label: "Experimental UX",
    date: "May 2026",
    description:
      "A spatial exploration of data navigation utilizing 3D orbital mechanics to break the traditional 2D grid layout.",
    learned:
      "Engineered a complex 3D perspective system using trigonometry and requestAnimationFrame to create a seamless, orbital navigation experience.",
    url: "#",
  },
  {
    title: "Cowboy 2050 Demo Shop",
    slug: "cowboy2050",
    label: "Brand Experience",
    date: "May 2026",
    description:
      "A Vite + React demo landing experience for a modern western archive, combining premium brand expression with polished motion, responsive layout, and theme-driven UI tokens.",
    learned:
      "Built a token-first design system, crafted motion-led homepage interactions, and optimized the static Vite build for deployment-ready delivery.",
    url: "/work/cowboy-2050",
    screenshot: "/screenshots/cowboy-2050.png",
  },
];
