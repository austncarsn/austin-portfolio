import { useRef, useEffect, useState } from 'react'
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion'

const stickers = [
  { src: '/assets/stickers/banana-sticker.png', alt: 'banana' },
  { src: '/assets/stickers/cloud-sticker.png', alt: 'cloud' },
  { src: '/assets/stickers/lipstick-sticker.png', alt: 'lipstick' },
  { src: '/assets/stickers/snowboard-sticker.png', alt: 'snowboard' },
  { src: '/assets/stickers/banana-sticker.png', alt: 'banana 2' },
  { src: '/assets/stickers/cloud-sticker.png', alt: 'cloud 2' },
  { src: '/assets/stickers/lipstick-sticker.png', alt: 'lipstick 2' },
  { src: '/assets/stickers/snowboard-sticker.png', alt: 'snowboard 2' },
]

const EASE = [0.22, 0.6, 0.22, 1] as const

// Staggered fade-up entrance variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE } },
}

export default function Hero() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const hovered = useRef(false)
  const offset = useRef(0)

  // Sticker strip scroll + wheel
  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const getHalf = () => inner.scrollWidth / 2

    const onWheel = (e: WheelEvent) => {
      if (!hovered.current) return
      e.preventDefault()
      const half = getHalf()
      offset.current = ((offset.current + e.deltaX + e.deltaY) % half + half) % half
      inner.style.transform = `translateX(-${offset.current}px)`
    }
    const onEnter = () => {
      hovered.current = true
      const m = new DOMMatrix(window.getComputedStyle(inner).transform)
      const half = getHalf()
      offset.current = ((-m.m41) % half + half) % half
      inner.style.animation = 'none'
      inner.style.transform = `translateX(-${offset.current}px)`
    }
    const onLeave = () => {
      hovered.current = false
      const half = getHalf()
      const pct = (offset.current / half) * 100
      inner.style.animation = `sticker-scroll 22s linear infinite`
      inner.style.animationDelay = `-${(pct / 100) * 22}s`
    }

    outer.addEventListener('wheel', onWheel, { passive: false })
    outer.addEventListener('mouseenter', onEnter)
    outer.addEventListener('mouseleave', onLeave)
    return () => {
      outer.removeEventListener('wheel', onWheel)
      outer.removeEventListener('mouseenter', onEnter)
      outer.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Scroll indicator: hide after user scrolls
  const [showScroll, setShowScroll] = useState(true)
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 60) setShowScroll(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Parallax: track scroll within the section
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0px', '-60px'])
  const ruleY = useTransform(scrollYProgress, [0, 1], ['0px', '-45px'])
  const bioY  = useTransform(scrollYProgress, [0, 1], ['0px', '-30px'])

  return (
    <motion.section
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '5rem 1.5rem 4rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* ── Blue haze blobs ── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '0%',
          width: '55%',
          height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(147,197,253,0.28) 0%, rgba(96,165,250,0.12) 45%, transparent 72%)',
          filter: 'blur(56px)',
          animation: 'hazeA 18s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-5%',
          right: '0%',
          width: '55%',
          height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(186,230,255,0.22) 0%, rgba(147,197,253,0.10) 50%, transparent 72%)',
          filter: 'blur(64px)',
          animation: 'hazeB 24s ease-in-out infinite',
        }} />
      </div>

      {/* ── Sticker strip ── */}
      <motion.div variants={itemVariants}>
        <div
          ref={outerRef}
          style={{
            overflow: 'hidden',
            marginBottom: '3rem',
            cursor: 'ew-resize',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div
            ref={innerRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              width: 'max-content',
              animation: 'sticker-scroll 22s linear infinite',
              padding: '0.5rem 0',
            }}
          >
            {stickers.map((s) => (
              <img
                key={s.alt}
                src={s.src}
                alt={s.alt}
                draggable={false}
                style={{
                  height: '72px',
                  width: 'auto',
                  objectFit: 'contain',
                  userSelect: 'none',
                  flexShrink: 0,
                  filter: [
                    'drop-shadow(0 2px 4px rgba(0,0,0,0.28))',
                    'drop-shadow(0 6px 14px rgba(0,0,0,0.18))',
                    'contrast(1.05) saturate(1.1)',
                  ].join(' '),
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Artwork ── */}
      <motion.div variants={itemVariants}>
        <div style={{ marginBottom: '2.75rem', display: 'flex', justifyContent: 'center' }}>
          <img
            src="/assets/images/shrimps-artwork-1.png"
            alt="Shrimps artwork"
            style={{
              width: '100%',
              maxWidth: '360px',
              height: 'auto',
              display: 'block',
              filter: 'contrast(1.08) saturate(1.06) brightness(1.02)',
              imageRendering: 'crisp-edges',
            }}
          />
        </div>
      </motion.div>

      {/* ── Name ── */}
      <motion.h1
        variants={itemVariants}
        className="hero-name"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(4rem, 11vw, 6.5rem)',
          lineHeight: '0.92',
          fontWeight: '500',
          marginBottom: '1.1rem',
          letterSpacing: '-0.03em',
          color: 'var(--ink)',
          y: nameY,
        }}
      >
        Austin<br />Carson
      </motion.h1>

      {/* ── Decorative rule ── */}
      <motion.div
        variants={itemVariants}
        style={{
          width: '2.5rem',
          height: '1px',
          background: 'var(--rule)',
          margin: '0 auto 1.1rem',
          y: ruleY,
        }}
      />

      {/* ── Description ── */}
      <motion.p
        variants={itemVariants}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(13px, 1.8vw, 15px)',
          fontWeight: '400',
          lineHeight: '1.68',
          letterSpacing: '0.01em',
          color: 'var(--ink-2)',
          maxWidth: '400px',
          margin: '0 auto',
          y: bioY,
        }}
      >
        Designer and builder making things on the internet.
        Focused on craft, curiosity, and the details that matter.
      </motion.p>

      {/* ── Scroll indicator ── */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{
              position: 'absolute',
              bottom: '0.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              pointerEvents: 'none',
            }}
          >
            {/* Smiley face */}
            <motion.div
              animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#39ff14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                lineHeight: 1,
                boxShadow: '0 0 12px rgba(57,255,20,0.55)',
                userSelect: 'none',
              }}
            >
              <span style={{ marginTop: '1px' }}>:)</span>
            </motion.div>
            {/* Bouncing arrow */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
              style={{
                color: '#39ff14',
                fontSize: '14px',
                lineHeight: 1,
                textShadow: '0 0 8px rgba(57,255,20,0.7)',
              }}
            >
              ↓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes sticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes hazeA {
          0%   { transform: translate(0, 0) scale(1); }
          35%  { transform: translate(8%, 6%) scale(1.08); }
          70%  { transform: translate(-4%, 10%) scale(0.94); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes hazeB {
          0%   { transform: translate(0, 0) scale(1); }
          40%  { transform: translate(-6%, -8%) scale(1.1); }
          75%  { transform: translate(5%, -4%) scale(0.96); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </motion.section>
  )
}
