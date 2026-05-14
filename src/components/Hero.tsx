import { useEffect, useRef } from 'react'
import cloudSticker from '../assets/cloud-sticker.png'
import heartSticker from '../assets/heart-sticker.png'
import shrimpsArtwork from '../assets/shrimps-artwork.png'
import styles from './Hero.module.css'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const artworkRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const artwork = artworkRef.current
    const glow = glowRef.current
    const scrollCue = scrollCueRef.current
    const name = nameRef.current
    if (!section || !name) return

    let rafId: number

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const scrolled = Math.max(0, -rect.top)

        // name: blurry at page load, sharpens as user scrolls into it
        // name is roughly 40% down the hero; use viewport position of the name itself
        const nameRect = name.getBoundingClientRect()
        const vh = window.innerHeight
        // 1 = name is at bottom of viewport (far), 0 = name is centred/above midpoint
        const rawDist = nameRect.top / vh
        // focus progress: 0→1 as name travels from 0.9vh to 0.35vh
        const focusP = Math.min(1, Math.max(0, (0.9 - rawDist) / 0.55))
        const blur = (1 - focusP) * 12
        name.style.filter = `blur(${blur}px)`
        name.style.opacity = String(0.35 + focusP * 0.65)

        // artwork drifts up slowly — deeper parallax layer
        if (artwork) artwork.style.transform = `translateY(${scrolled * 0.22}px)`

        // glow counter-drifts for depth
        if (glow) glow.style.transform = `translateX(-50%) translateY(calc(-8% + ${scrolled * -0.08}px))`

        // scroll cue fades quickly as user scrolls
        if (scrollCue) {
          const cueP = Math.min(1, scrolled / 80)
          scrollCue.style.opacity = String(1 - cueP)
          scrollCue.style.transform = `translateY(${cueP * 12}px)`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.blueOrb1} aria-hidden="true" />
      <div className={styles.blueOrb2} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div ref={glowRef} className={styles.glow} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true" />

      <div className={styles.inner}>
        <img
          ref={artworkRef}
          src={shrimpsArtwork}
          alt="Shrimps artwork"
          className={styles.artwork}
        />

        <p className={styles.eyebrow}>
          Design Engineer
          <span className={styles.eyebrowSep}>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <br className={styles.eyebrowBreak} />
          Creative Technologist
          <span className={styles.eyebrowSep}>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <br className={styles.eyebrowBreak} />
          Baddie
        </p>

        <div className={styles.stickerRow} aria-hidden="true">
          <img src={cloudSticker} alt="" className={styles.sticker} />
          <img src={heartSticker} alt="" className={`${styles.sticker} ${styles.stickerHeart}`} />
        </div>

        <h1 ref={nameRef} className={styles.name}>
          Austin
          <em className={styles.nameItalic}>Carson</em>
        </h1>

        <p className={styles.bio}>
          Product-minded design systems, AI workflows, and cinematic digital
          interfaces — built with precision, restraint, and just enough mischief.
        </p>

        <div ref={scrollCueRef} className={styles.scrollCue}>
          <span className={styles.scrollLine} aria-hidden="true" />
          <span className={styles.scrollLabel}>Work below</span>
        </div>
      </div>
    </section>
  )
}
