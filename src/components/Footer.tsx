const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/austincarson' },
  { label: 'GitHub', href: 'https://github.com/austncarsn' },
  { label: 'Email', href: 'mailto:austncarsn@gmail.com' },
]

export default function Footer() {
  return (
    <footer
      style={{
        padding: '3rem 1.5rem',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ display: 'flex', gap: '3rem' }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none'
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '0.05em',
          color: 'var(--color-text-secondary)',
          opacity: 0.8,
          marginTop: '0.5rem'
        }}>
          © {new Date().getFullYear()} Austin Carson. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
