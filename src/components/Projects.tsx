import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import styles from './Projects.module.css'

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className={styles.card}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${project.description} (opens in new tab)`}
    >
      <div className={styles.labelWrap}>
        <p className={styles.label}>{project.label}</p>
      </div>

      <div className={styles.titleWrap}>
        <h3 className={styles.title}>{project.title}</h3>
      </div>

      <div className={styles.infoWrap}>
        <p className={styles.description}>{project.description}</p>
        {project.learned && (
          <p className={styles.learned}>
            <span className={styles.learnedLabel}>Takeaway:</span> {project.learned}
          </p>
        )}
      </div>

      <div className={styles.arrowWrap}>
        <span className={styles.arrow} aria-hidden="true">↗</span>
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <>
      <div className="divider-bar" />
      <section id="work" className={styles.section} aria-labelledby="work-heading">
        <div className={styles.container}>
          <div className={styles.eyebrow} id="work-heading">
            Developments
            <div className={styles.eyebrowRule} />
          </div>

          <div className={styles.grid}>
            {projects.map((project) => (
              <ProjectCard key={project.url ?? project.title} project={project} />
            ))}
          </div>
        </div>
      </section>
      <div className="divider-bar" />
    </>
  )
}