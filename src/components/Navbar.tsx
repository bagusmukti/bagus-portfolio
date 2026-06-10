import styles from './Navbar.module.css'
import { personal } from '../safeData'
import { useActiveSection } from '../hooks/useActiveSection'

interface Props {
  onNav: (id: string) => void
}

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Work', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export function Navbar({ onNav }: Props) {
  const activeSection = useActiveSection()
  const parts = (personal.name ?? '').split(' ')
  const displayName = [parts[0], parts[1]].filter(Boolean).join(' ')

  return (
    <nav className={styles.nav}>
      <button className={styles.logo} onClick={() => onNav('hero')}>
        {displayName}
      </button>

      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.id}>
            <button
              className={`${styles.link} ${activeSection === l.id ? styles.active : ''}`}
              onClick={() => onNav(l.id)}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>

      <button className={styles.contactBtn} onClick={() => onNav('contact')}>
        Contact Me
      </button>
    </nav>
  )
}
