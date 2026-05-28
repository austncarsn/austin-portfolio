import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  dark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ dark, onToggle }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      className="theme-toggle"
      whileTap={{ scale: 0.96 }}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Sun size={16} strokeWidth={1.6} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Moon size={16} strokeWidth={1.6} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
