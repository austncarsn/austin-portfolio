const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/austincarson' },
  { label: 'GitHub', href: 'https://github.com/austncarsn' },
  { label: 'Email', href: 'mailto:austncarsn@gmail.com' },
]

export default function Footer() {
  return (
    <footer
      style={{
        padding: '4rem 1.5rem 0',
        maxWidth: '56rem',
        margin: '0 auto',
        marginTop: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '3rem',
        borderTop: '1px solid var(--rule)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ 
        display: 'flex', 
        gap: '2rem',
        flexWrap: 'wrap' 
      }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--t-micro)',
              letterSpacing: 'var(--track-mono)',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-3)')}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Tulip — anchored to bottom center */}
      <img
        src="/assets/icons/tulip.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          height: '192px',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '4rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-micro)',
          letterSpacing: 'var(--track-mono)',
          color: 'var(--ink-4)',
          textTransform: 'uppercase',
        }}>
          © {new Date().getFullYear()} Austin Carson
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-micro)',
          letterSpacing: 'var(--track-mono)',
          color: 'var(--ink-4)',
          textTransform: 'uppercase',
        }}>
          Site developed by AC
        </p>
      </div>
    </footer>
  )
}
