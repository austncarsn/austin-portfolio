import "../styles/orbital.css";
import { OrbitalSystem } from "./orbital/OrbitalSystem";

export const OrbitalUI = () => {
  const embedUrl = (
    import.meta as unknown as { env: { VITE_ORBITAL_UI_EMBED?: string } }
  ).env.VITE_ORBITAL_UI_EMBED;

  return (
    <div className="relative w-full h-[min(720px,80vh)] flex items-center justify-center overflow-hidden orbital-embed">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title="Orbital UI Demo"
          className="w-full h-full border-0 rounded-[var(--r-2)]"
          style={{ background: "transparent" }}
        />
      ) : (
        <OrbitalSystem />
      )}
    </div>
  );
};
