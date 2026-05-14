import styles from './Footer.module.css'

const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/austincarson' },
  { label: 'GitHub', href: 'https://github.com/austncarsn' },
  { label: 'Email', href: 'mailto:austncarsn@gmail.com' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.card}>
        <div className={styles.accentLine} aria-hidden="true" />
        <div className={styles.bottomGlow} aria-hidden="true" />

        <div className={styles.inner}>
          <nav aria-label="Footer links">
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={styles.link}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  >
                    {link.label}
                    <span className={styles.linkArrow} aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.divider} />

          <p className={styles.copyright}>
            © {new Date().getFullYear()} Austin Carson
          </p>
        </div>
      </div>
    </footer>
  )
}
