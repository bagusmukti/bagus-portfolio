import styles from './Footer.module.css'
import { personal } from '../safeData'
import { MdEmail } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <em className={styles.left}>{(personal.name ?? '').split(' ')[0]}</em>

      <div className={styles.center}>
        <span>© {year} · All rights reserved.</span>
        <span>Made with love</span>
      </div>

      <div className={styles.socials}>
        {personal.email && (
          <a href={`mailto:${personal.email}`} className={styles.iconBtn} aria-label="Email">
            <MdEmail />
          </a>
        )}
        {personal.linkedin && (
          <a href={personal.linkedin} className={styles.iconBtn} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        )}
        {personal.github && (
          <a href={personal.github} className={styles.iconBtn} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        )}
      </div>
    </footer>
  )
}
