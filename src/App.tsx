import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { CaseStudy } from "./components/CaseStudy";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HeroDivider from "./components/HeroDivider";
import Projects from "./components/Projects";
import ThemeToggle from "./components/ThemeToggle";
import { projects } from "./data/projects";
import "./styles/globals.css";

export default function App() {
  const [dark, setDark] = useState(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
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

  const path = window.location.pathname;
  if (path.startsWith("/work/")) {
    const projectId = path.split("/")[2] || "";
    const normalizedRouteId = projectId.toLowerCase().replace(/[^a-z0-9]/g, "");

    const project = projects.find((p) => {
      const slugId = p.slug?.toLowerCase().replace(/[^a-z0-9]/g, "");
      const urlId = p.url
        ?.split("/")
        .filter(Boolean)
        .pop()
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      const titleId = p.title.toLowerCase().replace(/[^a-z0-9]/g, "");

      return (
        slugId === normalizedRouteId ||
        urlId === normalizedRouteId ||
        titleId === normalizedRouteId
      );
    });

    if (project) {
      return <CaseStudy project={project} />;
    }

    return (
      <main style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
        <div
          style={{
            color: "var(--ink)",
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
          }}
        >
          <div style={{ maxWidth: "32rem", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                marginBottom: "1rem",
              }}
            >
              Project not found
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                marginBottom: "1rem",
              }}
            >
              We couldn’t find that work page.
            </h1>
            <p
              style={{
                lineHeight: 1.8,
                color: "var(--ink-4)",
                marginBottom: "2rem",
              }}
            >
              If you followed a link and landed here, try the selected work list
              on the homepage instead.
            </p>
            <a
              href="/"
              style={{ color: "var(--ac-blue)", textDecoration: "underline" }}
            >
              Back to home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <ThemeToggle dark={dark} onToggle={toggleTheme} />
      <Hero />
      <HeroDivider />
      <Projects />
      <Footer />
    </main>
  );
}
