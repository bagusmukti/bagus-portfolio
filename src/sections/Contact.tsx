import styles from './Contact.module.css'
import { useReveal } from '../hooks/useReveal'
import { personal } from '../safeData'
import { MdEmail } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

const contacts = [
  { label: 'Email',     Icon: MdEmail,      href: `mailto:${personal.email}`,  value: personal.email },
  { label: 'LinkedIn',  Icon: FaLinkedin,   href: personal.linkedin,            value: 'linkedin.com/in/bagusmuktipurnomo' },
  { label: 'GitHub',    Icon: FaGithub,     href: personal.github,              value: 'github.com/bagusmukti' },
  { label: 'Instagram', Icon: FaInstagram,  href: personal.instagram,           value: '@bagusmuktiii' },
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

        <div className={`${styles.links} reveal d3`}>
          {contacts
            .filter((c) => c.href)
            .map(({ label, Icon, href, value }) => (
              <a
                key={label}
                href={href!}
                className={styles.contactLink}
                target={href!.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                <span className={styles.iconWrap}>
                  <Icon />
                </span>
                <span className={styles.linkInfo}>
                  <span className={styles.linkLabel}>{label}</span>
                  <span className={styles.linkValue}>{value}</span>
                </span>
              </a>
            ))}
        </div>

      </div>
    </section>
  )
}
