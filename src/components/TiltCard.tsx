import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import styles from './TiltCard.module.css'

const MAX_TILT = 15
const SPRING = { stiffness: 260, damping: 28, mass: 0.6 }

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  const rotateX = useTransform(y, [-1, 1], [MAX_TILT, -MAX_TILT])
  const rotateY = useTransform(x, [-1, 1], [-MAX_TILT, MAX_TILT])

  // drop-shadow follows PNG shape (not box), shifts with tilt direction
  const shadowX = useTransform(x, [-1, 1], ['-14px', '14px'])
  const shadowY = useTransform(y, [-1, 1], ['-14px', '14px'])
  const filter = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) =>
      `drop-shadow(${sx} ${sy} 40px color-mix(in srgb, var(--color-accent) 28%, transparent))`
  )

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.tiltWrap} ${className ?? ''}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        filter,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  )
}
