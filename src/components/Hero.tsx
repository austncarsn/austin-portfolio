export default function Hero() {
  return (
    <section className="hero-section" style={{ textAlign: 'center', paddingTop: '6rem', paddingBottom: '4rem', maxWidth: '680px', margin: '0 auto', padding: '6rem 1.5rem 4rem 1.5rem' }}>
      <h1 className="hero-name" style={{ 
        fontFamily: 'var(--font-serif)',
        fontSize: '4.5rem', 
        lineHeight: '1', 
        fontWeight: '400', 
        marginBottom: '2.5rem', 
        letterSpacing: '-0.02em', 
        color: 'var(--color-text-primary)' 
      }}>
        Austin<br/>Carson
      </h1>
    </section>
  )
}
