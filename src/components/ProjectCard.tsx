import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <div className="project-card__body">
        <div className="project-card__header">
          <h3 className="project-card__title">{project.title}</h3>
          <span className="project-card__label">{project.label}</span>
        </div>
        <p className="project-card__description">{project.description}</p>
      </div>
      <div className="project-card__footer">
        <span>View Project ↗</span>
      </div>
    </a>
  )
}
