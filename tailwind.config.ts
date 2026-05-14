import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Cormorant Garamond', 'EB Garamond', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'Cormorant', 'Georgia', 'serif'],
        body: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
