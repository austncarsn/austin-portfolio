import type { Project } from '../data/projects'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        width: '300px',
        padding: '1.25rem',
        borderRadius: '12px',
        border: '1px solid var(--color-border-strong)',
        backgroundColor: 'var(--color-bg)',
        textDecoration: 'none',
        transition: 'all 150ms ease',
      }}
      className="project-card"
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: 'var(--color-text-primary)' }}>
            {project.title}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
            {project.label}
          </span>
        </div>
        <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--color-text-secondary)', margin: 0 }}>
          {project.description}
        </p>
      </div>
      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', color: 'var(--color-accent)' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>View Project ↗</span>
      </div>
    </a>
  )
}
