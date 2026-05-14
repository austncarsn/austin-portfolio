import styles from './HeroDivider.module.css'

export default function HeroDivider() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      {/* top double-rule cap */}
      <div className={styles.cap} />
      {/* dense ruled band */}
      <div className={styles.ruled} />
      {/* thick sage shelf */}
      <div className={styles.shelf} />
    </div>
  )
}
