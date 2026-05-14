import React from 'react'
import { flushSync } from 'react-dom'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Footer from './components/Footer'
import CaseStudy from './components/sections/CaseStudy'
import ThemeToggle from './components/ThemeToggle'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import { projects } from './data/projects'
import './styles/globals.css'

function CaseStudyRoute() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projects.find(p =>
    (p.slug ?? p.title.toLowerCase().replace(/\s+/g, '-')) === projectId
  )
  if (!project) return <p style={{ padding: '4rem' }}>Project not found.</p>
  return <CaseStudy />
}

export default function App() {
  const [dark, setDark] = React.useState(() => {
    const stored = window.localStorage.getItem('theme')
    if (stored === 'dark') return true
    if (stored === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  React.useEffect(() => {
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
    <Router>
      <main style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', overflowX: 'hidden' }}>
        <ThemeToggle dark={dark} onToggle={toggleTheme} />
        <Routes>
          <Route path="/" element={
            <>
              {/* Fixed inset border frame — outer */}
              <div style={{
                position: 'fixed',
                inset: '0px',
                border: '12px solid #ffffff',
                borderRadius: '20px',
                pointerEvents: 'none',
                zIndex: 9999,
              }} />
              <Hero />
              <Projects />
              <Footer />
            </>
          } />
          <Route path="/work" element={
            <>
              <Projects />
              <Footer />
            </>
          } />
          <Route path="/work/:projectId" element={
            <>
              <CaseStudyRoute />
              <Footer />
            </>
          } />
        </Routes>
      </main>
    </Router>
  )
}
