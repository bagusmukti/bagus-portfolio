import styles from './Projects.module.css'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../data'

const THUMB_BG: Record<string, string> = {
  ind: 'var(--ind-p)',
  pch: 'var(--pch-p)',
  lav: 'rgba(200,197,240,0.25)',
  mint: 'rgba(168,216,200,0.2)',
}

type DelayClass = 1 | 2 | 3 | 4

export function Projects() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="projects" ref={ref} className={styles.projects}>
      <div className={styles.header}>
        <div className={`${styles.sectionTag} reveal`}>Work</div>
        <div className={styles.headerRow}>
          <h2 className={`${styles.h2} reveal d1`}>Selected projects</h2>
          <p className={`${styles.subtitle} reveal d1`}>Things I've designed and built.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {projects.map((p, i) => {
          const d = Math.min(i + 1, 4) as DelayClass
          return (
            <article key={p.num} className={`${styles.card} reveal d${d}`}>
              <div
                className={styles.thumb}
                style={{ background: p.image ? undefined : (THUMB_BG[p.color] ?? THUMB_BG.ind) }}
              >
                {p.image ? (
                  <img src={p.image} alt={p.title} className={styles.thumbImg} />
                ) : (
                  <>
                    <span className={styles.thumbNum}>{p.num}</span>
                    <svg className={styles.thumbIcon} viewBox="0 0 80 80" fill="none">
                      <rect x="10" y="20" width="60" height="40" rx="6" stroke="var(--ind-m)" strokeWidth="2" />
                      <path d="M10 30h60" stroke="var(--ind-m)" strokeWidth="2" />
                      <circle cx="18" cy="25" r="2" fill="var(--ind-m)" />
                      <circle cx="25" cy="25" r="2" fill="var(--ind-m)" />
                      <circle cx="32" cy="25" r="2" fill="var(--ind-m)" />
                    </svg>
                  </>
                )}
              </div>

              <div className={styles.body}>
                <div className={styles.stack}>
                  {p.stack.map((tag) => (
                    <span key={tag} className={styles.stackPill}>{tag}</span>
                  ))}
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>

              <div className={styles.footer}>
                <span className={styles.year}>{p.year}</span>
                <div className={styles.footerLinks}>
                  {p.githubUrl !== '#' && (
                    <a href={p.githubUrl} className={styles.iconLink} aria-label="GitHub">
                      <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
                        <path d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.88-1.16-.88-1.16-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.21 1.87.86 2.32.66.07-.51.28-.86.5-1.06-1.77-.2-3.63-.89-3.63-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.68 7.68 0 0 1 10 6.84c.68 0 1.36.09 2 .27 1.52-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.46.55.38C15.71 16.53 18 13.54 18 10c0-4.42-3.58-8-8-8z" fill="var(--ink3)" />
                      </svg>
                    </a>
                  )}
                  <a href={p.liveUrl} className={styles.arrowLink} aria-label="View project">
                    ↗
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
