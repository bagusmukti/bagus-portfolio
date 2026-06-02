import { useState } from 'react'
import styles from './Contact.module.css'
import { useReveal } from '../hooks/useReveal'
import { personal } from '../safeData'

interface FormState {
  name: string
  email: string
  message: string
}

export function Contact() {
  const ref = useReveal<HTMLElement>()
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section id="contact" ref={ref} className={styles.contact}>
      <div className={styles.inner}>

        {/* ── HEADER ── */}
        <div className={styles.header}>
          <div className={`${styles.sectionTag} reveal`}>Contact</div>
          <h2 className={`${styles.h2} reveal d1`}>
            Let's make something <em className={styles.em}>great.</em>
          </h2>
          <p className={`${styles.body} reveal d2`}>
            Whether you have a project in mind, a role to discuss, or just want to say hello —
            my inbox is always open.
          </p>
        </div>

        {/* ── INFO CARDS ROW ── */}
        <div className={`${styles.infoRow} reveal d3`}>
          {[
            { k: 'Email', v: personal.email, href: `mailto:${personal.email}` },
            { k: 'Location', v: personal.location, href: undefined as string | undefined },
          ].map(({ k, v, href }) => (
            <div key={k} className={styles.infoCard}>
              <span className={styles.infoKey}>{k}</span>
              <span className={styles.infoVal}>
                {href ? (
                  <a href={href} className={styles.infoLink}>{v}</a>
                ) : v}
              </span>
            </div>
          ))}
        </div>

        {/* ── FORM BLOCK ── */}
        <div className={`${styles.formBlock} reveal d4`}>
          <div className={styles.formTag}>Send a message</div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Your name</span>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Email address</span>
              <input
                className={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
              />
            </label>

            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.fieldLabel}>Message</span>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project…"
                rows={5}
                required
              />
            </label>

            <div className={styles.formFooter}>
              <div className={styles.socials}>
                {(
                  [
                    personal.github    ? { label: 'GitHub',    url: personal.github }    : null,
                    personal.linkedin  ? { label: 'LinkedIn',  url: personal.linkedin }  : null,
                    personal.instagram ? { label: 'Instagram', url: personal.instagram } : null,
                  ] as ({ label: string; url: string } | null)[]
                ).filter((x): x is { label: string; url: string } => x !== null)
                  .map(({ label, url }) => (
                  <a key={label} href={url} className={styles.socialPill} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ))}
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send message ✦
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  )
}
