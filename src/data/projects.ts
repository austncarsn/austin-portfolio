export type ProjectStatus = "Live" | "In Progress" | "Archived" | "Prototype";

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  date: string;
  type?: string;
  status?: ProjectStatus;
  liveUrl?: string;
  url: string;
  label: string;
  screenshot?: string;
  screenshotAlt?: string;
  screenshots?: string[];
  role?: string[];
  stack?: string[];
  focus?: string[];
  overview?: string;
  problem?: string;
  approach?: string;
  engineering?: string;
  outcome?: string;
  learned: string;
}

export function getProjectScreenshotPath(
  project: Pick<Project, "slug" | "liveUrl" | "screenshot">
): string | undefined {
  if (project.liveUrl) {
    return `/project-screenshots/${project.slug}.png`;
  }

  return project.screenshot;
}

export function getProjectScreenshots(project: Project): string[] {
  if (project.screenshots?.length) {
    return project.screenshots;
  }

  if (project.liveUrl) {
    return [getProjectScreenshotPath(project)!];
  }

  const screenshot = getProjectScreenshotPath(project);
  return screenshot ? [screenshot] : [];
}

export const projects: Project[] = [
  {
    slug: "promptvault",
    title: "PromptVault",
    category: "Prompt System",
    label: "Prompt System",
    type: "Prompt System",
    status: "Live",
    date: "May 2026",
    summary: "A prompt tool for structured Figma Make instructions and design specs.",
    description:
      "A Figma Make prompt reference for turning UI ideas into clearer component, feature, and design system instructions.",
    learned:
      "Structured reusable prompt patterns for AI assisted interface design, with emphasis on repeatable output and fast copying.",
    liveUrl: "https://figma-prompt-generator.vercel.app/",
    url: "https://figma-prompt-generator.vercel.app/",
    screenshot: "/project-screenshots/promptvault.png",
    screenshotAlt: "PromptVault Figma Make prompt library interface.",
    role: ["Prompt architecture", "Interface design", "Frontend build"],
    focus: ["Figma Make prompts", "Component prompts", "Design system guidance"],
    overview:
      "PromptVault is a Figma Make prompt reference that organizes component, feature, and design system prompts into a reusable web tool.",
    approach:
      "The project treats prompts as structured interface assets rather than loose text snippets, making it easier to choose a prompt type and move into Figma Make with clearer instructions.",
    engineering:
      "The deployed React app supports prompt browsing, prompt composition, and copy ready output.",
    outcome:
      "A practical reference for generating clearer Figma Make instructions without presenting the work as a full design automation platform.",
  },
  {
    slug: "montana-civic-data",
    title: "Montana Civic Data",
    category: "Data Site",
    label: "Data Site",
    type: "Civic Atlas",
    status: "Live",
    date: "May 2026",
    summary: "A civic reference site for Montana municipalities, counties, and public data.",
    description:
      "A civic reference site organizing Montana places, counties, population records, local classifications, and linked source pages.",
    learned:
      "Data modeling, searchable directory design, and editorial presentation for a large place-based civic reference.",
    liveUrl: "https://montana-civic-data.vercel.app/",
    url: "https://montana-civic-data.vercel.app/",
    screenshot: "/project-screenshots/montana-civic-data.png",
    screenshotAlt: "Montana Civic Data directory and civic atlas homepage.",
    role: ["Data modeling", "Information architecture", "Frontend build"],
    focus: ["Civic data", "Place directory", "Linked source records"],
    overview:
      "Montana Civic Data is a statewide civic atlas for browsing Montana places by county, type, population, and local record pages.",
    approach:
      "The project frames civic data as a durable field notebook, pairing a searchable directory with individual place records and source context.",
    engineering:
      "The live site uses a structured place dataset, filters for county and place type, and generated routes for individual Montana communities.",
    outcome:
      "A clearer research surface for Montana local data that can deepen over time as more records and sources are added.",
  },
  {
    slug: "cookie-mike",
    title: "Cookie Mike",
    category: "Web App",
    label: "Web App",
    type: "Personal Dashboard",
    status: "Live",
    date: "Jan 2026",
    summary: "A personal dashboard with a custom interface and small utility panels.",
    description:
      "A personal React dashboard for Mike, pairing a custom visual system with a collection of private tools and experimental panels.",
    learned:
      "Multi-tool React composition, custom interface styling, and organizing personal utilities inside one coherent shell.",
    liveUrl: "https://mikethecookie.com/",
    url: "https://mikethecookie.com/",
    screenshot: "/project-screenshots/cookie-mike.png",
    screenshotAlt: "Cookie Mike personal dashboard homepage.",
    role: ["Frontend build", "Interface design", "Tool composition"],
    focus: ["Personal dashboard", "Utility panels", "Custom styling"],
    overview:
      "Cookie Mike is a personal web app built for Mike. The deploy metadata identifies it as Cookie Mike, so the portfolio title now follows the live application name.",
    approach:
      "The portfolio keeps the description specific but conservative because the live page metadata is intentionally personal and sparse.",
    engineering:
      "The app is delivered as a React front end with multiple dashboard-style surfaces behind a custom branded shell.",
    outcome:
      "A personal tool hub that is represented here without inflating private or not publicly documented features.",
  },
  {
    slug: "cameo-web",
    title: "Cameo Web",
    category: "Prototype",
    label: "Prototype",
    type: "Web Prototype",
    status: "Live",
    date: "Oct 2025",
    summary: "A web prototype for testing component structure and interaction direction.",
    description:
      "A deployed web prototype for exploring component composition, page structure, and visual system direction.",
    learned: "Component composition, interaction pacing, and reusable React interface patterns.",
    liveUrl: "https://cameo-web.vercel.app/",
    url: "https://cameo-web.vercel.app/",
    screenshot: "/project-screenshots/cameo-web.png",
    screenshotAlt: "Cameo Web prototype interface.",
    role: ["Prototype design", "Frontend build"],
    focus: ["Components", "Page structure", "Interaction direction"],
    overview:
      "Cameo Web is a deployed prototype. The public HTML identifies it as Cameo WebPage, and the portfolio presents it as a prototype rather than a finished product.",
    approach:
      "The work focuses on component structure and visual direction without claiming a specific product workflow that is not visible in the source metadata.",
    engineering:
      "The prototype is a Vite and React deploy with bundled interface code and a simple public route.",
    outcome:
      "A usable reference point for UI structure and interaction decisions, kept intentionally modest in the portfolio copy.",
  },
  {
    slug: "alienbaby",
    title: "Alien Baby",
    category: "Design System",
    label: "Design System",
    type: "Experimental Design System",
    status: "Live",
    date: "May 2026",
    summary:
      "An experimental design system prototype for synthetic minimalism and AI interface patterns.",
    description:
      "A live design system prototype exploring synthetic minimalism, named color signals, AI council states, and component library patterns.",
    learned:
      "Design token structure, themeable component states, and editorial presentation for an experimental interface system.",
    liveUrl: "https://template-alien-baby-experimental.vercel.app/",
    url: "https://template-alien-baby-experimental.vercel.app/",
    screenshots: [
      "/project-screenshots/alienbaby.png",
      "/project-screenshots/chatgpt-08-27-24-2026-05-17.png",
      "/project-screenshots/chatgpt-08-26-02-2026-05-17.png",
    ],
    screenshotAlt: "Alien Baby synthetic minimalism design system homepage.",
    role: ["Design system direction", "Interface design", "Frontend build"],
    focus: ["Synthetic minimalism", "Design tokens", "AI council states", "Component library"],
    overview:
      "Alien Baby is a live design system prototype built around a synthetic minimalism direction, combining restrained surfaces with more unusual AI interface motifs.",
    approach:
      "The project treats the design system as an artifact: navigation, metrics, named color signals, AI council panels, and component examples are presented as one coherent visual language.",
    engineering:
      "The deployed React interface includes themed sections for system overview, breathing surfaces, AI council states, color lexicon, signal depth, and component examples.",
    outcome:
      "A public prototype that documents a distinctive interface direction and gives the portfolio a richer design system case study in place of the older local origami snapshot.",
  },
  {
    slug: "the-ironic-precision",
    title: "The Ironic Precision",
    category: "Design System",
    label: "Design System",
    type: "Editorial Design System",
    status: "In Progress",
    date: "May 2026",
    summary:
      "A dark editorial design system exploring Swiss grid precision, restraint, and playful subversion.",
    description:
      "An editorial design system study built around postmodern Swiss references, dark surfaces, restrained typography, and small moments of visual contradiction.",
    learned:
      "Balancing austere design system structure with warmer, stranger details so the interface feels precise without becoming sterile.",
    url: "https://ai-language-design-study-6dimg23zb-handoff-iq.vercel.app/",
    screenshot: "/project-screenshots/the-ironic-precision.png",
    screenshotAlt: "The Ironic Precision dark editorial design system hero screen.",
    role: ["Design system direction", "Interface design", "Frontend build"],
    focus: ["Editorial systems", "Swiss grid structure", "Dark interface language", "Typography"],
    overview:
      "The Ironic Precision is a design system prototype where International Style restraint is pushed through a darker, more self aware interface language.",
    approach:
      "The system uses sparse navigation, thin rules, large typographic contrast, muted surfaces, and small accent colors to make rigidity feel intentional rather than cold.",
    engineering:
      "The Vercel preview URL is attached to the case study, with a captured hero reference used while the deploy remains behind Vercel protection.",
    outcome:
      "A case study scaffold is in place so the live deploy and screenshot can be added without changing the project structure later.",
  },
  {
    slug: "east-texas-heritage",
    title: "East Texas Heritage",
    category: "Archive",
    label: "Archive",
    type: "Regional History Site",
    status: "Live",
    date: "Aug 2025",
    summary: "A regional history site for East Texas records, imagery, and local stories.",
    description:
      "An editorial archive for East Texas history, regional records, imagery, and local storytelling.",
    learned:
      "Editorial content architecture, historical image handling, and building a regional archive with clear browsing paths.",
    liveUrl: "https://east-texas-heritage.vercel.app/",
    url: "https://east-texas-heritage.vercel.app/",
    screenshot: "/project-screenshots/east-texas-heritage.png",
    screenshotAlt: "East Texas Heritage regional history archive homepage.",
    role: ["Content architecture", "Frontend build", "Editorial design"],
    focus: ["Regional history", "Archive structure", "Historical imagery"],
    overview:
      "East Texas Heritage is the deployed project name, so the portfolio now uses that title throughout.",
    approach:
      "The work is represented as a regional archive and content site, based on the live deploy title and existing portfolio description.",
    engineering:
      "The site is a static React deploy focused on page structure, content presentation, and regional imagery.",
    outcome:
      "A focused archive experience for East Texas historical material, with room for additional records and narrative sections.",
  },
  {
    slug: "ai-text-sanitizer",
    title: "AI Text Sanitizer",
    category: "Tool",
    label: "Tool",
    type: "Browser Tool",
    status: "Prototype",
    date: "May 2026",
    summary: "A browser tool for cleaning robotic phrasing from AI generated text.",
    description:
      "A browser tool for cleaning AI generated copy by reducing robotic phrasing, smoothing repetition, and normalizing tone.",
    learned:
      "Designing clear input and output flows for text transformation without hiding the limits of automated rewriting.",
    url: "/html-projects/sanitizer.html",
    screenshot: "/project-screenshots/ai-text-sanitizer.png",
    screenshotAlt: "AI Text Sanitizer browser tool preview.",
    role: ["Tool design", "Frontend build", "Text workflow design"],
    focus: ["Text cleanup", "Input and output UX", "Editorial tone"],
    overview:
      "AI Text Sanitizer is a single-file browser tool for cleaning AI generated text, stripping hidden characters, normalizing punctuation, and smoothing common robotic phrasing.",
    approach:
      "The interface keeps the workflow direct: paste source text, choose cleanup options, generate a sanitized version, and review a short processing report.",
    engineering:
      "The tool is implemented as a standalone HTML, CSS, and vanilla JavaScript file with client-side text transforms for invisible characters, markdown cleanup, phrase replacement, contractions, and rhythm adjustment.",
    outcome:
      "A portable utility that can run as a static browser page without a backend or model dependency.",
  },
  {
    slug: "refmake",
    title: "REF/MAKE",
    category: "Guide",
    label: "Guide",
    type: "Reference Guide",
    status: "Live",
    date: "Mar 2026",
    summary: "A structured reference for Figma Make prompts and design workflow setup.",
    description:
      "A structured guide to Figma Make prompting patterns, design system setup, and practical AI design workflows.",
    learned:
      "Research synthesis, prompt system documentation, and turning AI design workflow notes into a navigable reference.",
    liveUrl: "https://refmake.vercel.app/",
    url: "https://refmake.vercel.app/",
    screenshot: "/project-screenshots/refmake.png",
    screenshotAlt: "REF/MAKE guide homepage.",
    role: ["Research synthesis", "Prompt writing", "Reference design"],
    focus: ["Figma Make", "AI design workflows", "Design system prompting"],
    overview:
      "REF/MAKE is the live project title. The portfolio now treats it as a guide and reference system rather than a generic mastery course.",
    approach:
      "The guide organizes prompt patterns and workflow setup into a reference format for designers working with Figma Make and related AI design tools.",
    engineering:
      "The deploy is a reference site with static guide content and structured navigation.",
    outcome:
      "A focused reference for producing clearer AI design instructions and reusable Figma Make workflows.",
  },
  {
    slug: "orbital-ui-concept",
    title: "Orbital UI Concept",
    category: "UI Concept",
    label: "UI Concept",
    type: "Interface Experiment",
    status: "Prototype",
    date: "May 2026",
    summary: "A spatial interface concept using orbital navigation and layered content.",
    description:
      "A spatial interface experiment using orbital navigation and layered content to move beyond a standard grid.",
    learned:
      "Spatial navigation modeling, motion timing, and the limits of experimental UI patterns when clarity matters.",
    url: "/work/orbital-ui-concept",
    screenshot: "/project-screenshots/orbital-ui-concept.png",
    screenshotAlt: "Orbital UI Concept spatial navigation prototype.",
    role: ["Interface concept", "Motion logic", "Prototype design"],
    focus: ["Spatial navigation", "Layered content", "Experimental UI"],
    overview:
      "Orbital UI Concept is an interface study. The local portfolio references the concept, but no separate source folder or live deploy was found.",
    approach:
      "The project is presented as an experiment in spatial navigation rather than a production application.",
    engineering:
      "The case study copy is limited to the concept described in portfolio data and avoids unsupported claims about measured usability or deep data navigation outcomes.",
    screenshots: [
      "/project-screenshots/orbital-ui-concept.png",
      "/project-screenshots/screencapture-localhost-5173-2026-05-17-21_56_16.png",
    ],
    outcome:
      "A directional UI concept that needs a live prototype or source reference before it can support a deeper case study.",
  },
  {
    slug: "cowboy-2050",
    title: "Cowboy 2050 Demo Shop",
    category: "Brand Experience",
    label: "Brand Experience",
    type: "Demo Shop",
    status: "Prototype",
    date: "May 2026",
    summary: "A themed demo shop blending western archive references with future retail.",
    description:
      "A themed ecommerce demo blending western archive references, futuristic styling, product storytelling, and motion led page sections.",
    learned:
      "Token first visual systems, motion led homepage composition, and static Vite deployment for a themed brand demo.",
    liveUrl: "https://cowboy-2050-demo-shop.vercel.app/",
    url: "/work/cowboy-2050",
    screenshot: "/project-screenshots/cowboy-2050.png",
    screenshotAlt: "Cowboy 2050 Demo Shop western futuristic product page.",
    screenshots: [
      "/project-screenshots/cowboy-2050-hero.png",
      "/project-screenshots/cowboy-2050-edit.png",
      "/project-screenshots/cowboy-2050-wanted.png",
      "/project-screenshots/cowboy-2050-visit.png",
    ],
    role: ["Brand experience", "Frontend build", "Motion design"],
    focus: ["Western archive references", "Product storytelling", "Theme tokens"],
    overview:
      "Cowboy 2050 Demo Shop is a themed ecommerce demonstration, not a real retail operation.",
    approach:
      "The project combines archive inspired western language with futuristic interface styling to test a distinct brand world.",
    engineering:
      "The live Vercel deploy provides refreshed reference screenshots for the hero, current edit, wanted board, and visit sections.",
    outcome:
      "A polished static demo shop suitable for showing themed interface direction and brand storytelling.",
  },
];
