import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import styles from './ThemeToggle.module.css'

interface Props {
  dark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ dark, onToggle }: Props) {
  const reduced = useReducedMotion()

  const iconTransition = reduced
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }

  const iconVariants = reduced
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: (rotate: number) => ({ opacity: 0, rotate, scale: 0.6 }),
        animate: { opacity: 1, rotate: 0, scale: 1 },
        exit: (rotate: number) => ({ opacity: 0, rotate, scale: 0.6 }),
      }

  return (
    <motion.button
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={styles.button}
      whileHover={reduced ? undefined : { opacity: 0.75 }}
      whileTap={reduced ? undefined : { scale: 0.94 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span
            key="sun"
            className={styles.icon}
            custom={-45}
            initial={reduced ? {} : { opacity: 0, rotate: -45, scale: 0.6 }}
            animate={reduced ? {} : { opacity: 1, rotate: 0, scale: 1 }}
            exit={reduced ? {} : { opacity: 0, rotate: 45, scale: 0.6 }}
            transition={iconTransition}
            variants={iconVariants}
          >
            <Sun size={15} strokeWidth={1.5} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            className={styles.icon}
            custom={45}
            initial={reduced ? {} : { opacity: 0, rotate: 45, scale: 0.6 }}
            animate={reduced ? {} : { opacity: 1, rotate: 0, scale: 1 }}
            exit={reduced ? {} : { opacity: 0, rotate: -45, scale: 0.6 }}
            transition={iconTransition}
            variants={iconVariants}
          >
            <Moon size={15} strokeWidth={1.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
