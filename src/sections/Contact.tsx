import styles from './Contact.module.css'
import { useReveal } from '../hooks/useReveal'
import { personal } from '../safeData'

const contacts = [
  { label: 'Email',     href: `mailto:${personal.email}` },
  { label: 'LinkedIn',  href: personal.linkedin },
  { label: 'GitHub',    href: personal.github },
  { label: 'Instagram', href: personal.instagram },
]

export function Contact() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="contact" ref={ref} className={styles.contact}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <div className={`${styles.sectionTag} reveal`}>Contact</div>
          <h2 className={`${styles.h2} reveal d1`}>
            Let's make something <em className={styles.em}>great.</em>
          </h2>
          <p className={`${styles.body} reveal d2`}>
            Whether you have a project in mind, a role to discuss, or just want to say hello —
            feel free to reach out through any of these channels.
          </p>
        </div>

        <ul className={`${styles.links} reveal d3`}>
          {contacts
            .filter((c) => c.href)
            .map(({ label, href }) => (
              <li key={label} className={styles.item}>
                <a
                  href={href!}
                  className={styles.contactLink}
                  target={href!.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                >
                  <span className={styles.linkLabel}>{label}</span>
                  <span className={styles.arrow}>↗</span>
                </a>
              </li>
            ))}
        </ul>

      </div>
    </section>
  )
}
