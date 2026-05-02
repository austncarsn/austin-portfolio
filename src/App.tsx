import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import './styles/globals.css'

export default function App() {
  const [dark, setDark] = useState(() => {
    const stored = window.localStorage.getItem('theme')

    if (stored === 'dark') return true
    if (stored === 'light') return false

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    window.localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleTheme = () => {
    const next = !dark
    if (!document.startViewTransition) {
      setDark(next)
      return
    }
    document.startViewTransition(() => {
      flushSync(() => setDark(next))
    })
  }

  return (
    <main style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <ThemeToggle dark={dark} onToggle={toggleTheme} />
      <Hero />
      <Projects />
      <Footer />
    </main>
  )
}
