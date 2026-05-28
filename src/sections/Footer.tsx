import styles from './Footer.module.css'
import { personal } from '../data'

export function Footer() {
  const [first] = personal.name.split(' ')
  return (
    <footer className={styles.footer}>
      <span className={styles.left}>
        <em>{first}</em>
      </span>
      <span className={styles.right}>Made with care ✦ East Java</span>
    </footer>
  )
}
