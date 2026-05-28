import React from "react";
import { flushSync } from "react-dom";
import { Route, BrowserRouter as Router, Routes, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import { Hero } from "./components/Hero";
import PlaybookPage from "./components/Playbook/PlaybookPage";
import Projects from "./components/Projects";
import CaseStudy from "./components/sections/CaseStudy";
import SiteHeader from "./components/SiteHeader";
import { projects } from "./data/projects";
import "./styles/globals.css";

function CaseStudyRoute() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(
    (p) => (p.slug ?? p.title.toLowerCase().replace(/\s+/g, "-")) === projectId
  );
  if (!project) return <p style={{ padding: "4rem" }}>Project not found.</p>;
  return <CaseStudy />;
}

export default function App(): JSX.Element {
  const [dark, setDark] = React.useState(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => {
    const next = !dark;
    if (!document.startViewTransition) {
      setDark(next);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => setDark(next));
    });
  };

  return (
    <Router>
      <main className="app-shell">
        <SiteHeader dark={dark} onToggle={toggleTheme} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Projects />
                <Footer />
              </>
            }
          />
          <Route
            path="/work"
            element={
              <>
                <Projects />
                <Footer />
              </>
            }
          />
          <Route
            path="/work/:projectId"
            element={
              <>
                <CaseStudyRoute />
                <Footer />
              </>
            }
          />
          <Route
            path="/playbook"
            element={
              <>
                <PlaybookPage />
                <Footer />
              </>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}
