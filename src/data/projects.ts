export interface Project {
  title: string;
  slug?: string;
  description: string;
  learned: string;
  url: string;
  label: string;
  date: string;
  screenshot?: string;
  screenshots?: string[];
}

export const projects: Project[] = [
  {
    title: "Montana Civic Data",
    label: "Interactive Atlas",
    date: "May 2026",
    description:
      "A definitive reference atlas documenting Montana's civic landscape — 499 municipalities across 56 counties — synthesizing demographic, government, and historical records into a structured digital archive.",
    learned:
      "Engineered a high-performance data pipeline to index vast civic records, building a searchable architectural interface that prioritizes editorial clarity and rapid information retrieval.",
    url: "https://montana-civic-data.vercel.app",
    screenshot: "/screenshots/montana-civic-data.png",
  },
  {
    title: "Daily Mike",
    label: "OS Dashboard",
    date: "Jan 2026",
    description:
      "A personalized command center with a Borg-inspired LCARS aesthetic. Integrates quantitative poker strategy tools, equity analysis, and a chronological personal log system.",
    learned:
      "Developed a scaled design system using Tailwind and shadcn, optimizing component architecture to maintain a singular high-fidelity aesthetic across diverse utility-driven modules.",
    url: "https://mikethecookie.com/",
    screenshot: "/screenshots/daily-mike.png",
  },
  {
    title: "Cameo Web",
    label: "UI Experiment",
    date: "Oct 2025",
    description:
      "A research-driven exploration of modern UI interaction patterns, focuses on fluid component transitions and a minimalist atomic design approach.",
    learned:
      "Iterated on component composition and state-driven UI transitions to establish a library of reusable, high-fidelity interaction patterns in React.",
    url: "https://cameo-web.vercel.app/",
    screenshot: "/screenshots/cameo-web.gif",
  },
  {
    title: "Floral Origami Interactive",
    slug: "floral-origami",
    label: "Interactive App",
    date: "May 2026",
    description:
      "A reactive Vite + React experience built with motion-driven neon UI, stage-based interaction, and a custom mini-game-inspired button flow.",
    learned:
      "Designed a motion-led interactive surface, layered neon styling, and an event-driven press-count state machine with particle animation.",
    url: "/work/floral-origami",
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
    screenshot: "/screenshots/cowboy-2050-hero.png",
    screenshots: [
      "/screenshots/cowboy-2050-hero.png",
      "/screenshots/cowboy-2050-edit.png",
      "/screenshots/cowboy-2050-wanted.png",
      "/screenshots/cowboy-2050-visit.png",
    ],
  },
];
