export interface Project {
  title: string
  description: string
  learned: string
  url: string
  label: string
}

export const projects: Project[] = [
  {
    title: 'Daily Mike',
    label: 'App',
    description:
      'Personal React dashboard with a Star Trek/Borg aesthetic. Includes poker strategy tools, stock analysis, a Star Trek quiz, and personal log content.',
    learned:
      'Large-scale Tailwind/shadcn component architecture, file structure refactoring, and building multiple tools under a single cohesive design system.',
    url: 'https://mikethecookie.com/',
  },
  {
    title: 'Cameo Web',
    label: 'App',
    description:
      'A web application project exploring UI interaction patterns and component design.',
    learned:
      'Component composition and building reusable UI patterns in React.',
    url: 'https://cameo-web.vercel.app/',
  },
  {
    title: 'East Texas History',
    label: 'Site',
    description:
      'A content-focused website dedicated to archiving and presenting East Texas historical records and imagery.',
    learned:
      'Content architecture, image handling, and building sites with editorial structure.',
    url: 'https://east-texas-heritage.vercel.app/',
  },
  {
    title: 'Figma Make Mastery Guide',
    label: 'Guide',
    description:
      'A synthesized research guide covering prompt engineering patterns for Figma Make, v0, Bolt, and Lovable.',
    learned:
      'Prompt engineering for AI design tools and how to distill research into actionable reference material.',
    url: 'https://refmake.vercel.app/',
  },
]
