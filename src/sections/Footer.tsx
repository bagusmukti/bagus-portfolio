import styles from './Footer.module.css'
import { personal } from '../safeData'

export function Footer() {
  const [first] = (personal.name ?? '').split(' ')
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <span className={styles.left}>
        <em>{first}</em>
      </span>
      <span className={styles.center}>© {year} · All rights reserved.</span>
      <span className={styles.right}>Made with care ✦ East Java</span>
    </footer>
  )
}
