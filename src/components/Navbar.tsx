import styles from './Navbar.module.css'
import { personal } from '../data'
import { useActiveSection } from '../hooks/useActiveSection'

interface Props {
  onNav: (id: string) => void
}

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Work', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

export function Navbar({ onNav }: Props) {
  const activeSection = useActiveSection()
  const [first, ...rest] = personal.name.split(' ')
  const lastName = rest.join(' ')

  return (
    <nav className={styles.nav}>
      <button className={styles.logo} onClick={() => onNav('hero')}>
        {first}
        {lastName && (
          <>
            <span className={styles.dot}>.</span>
            {lastName}
          </>
        )}
        {!lastName && <span className={styles.dot}>.</span>}
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

      <div className={styles.badge}>
        <span className={styles.pulse} />
        Open to work
      </div>
    </nav>
  )
}
