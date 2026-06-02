import styles from './Projects.module.css'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../safeData'

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
        {(projects ?? []).map((p, i) => {
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
                  {(p.stack ?? []).map((tag) => (
                    <span key={tag} className={styles.stackPill}>{tag}</span>
                  ))}
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>

              <div className={styles.footer}>
                <span className={styles.year}>{p.year}</span>
                <a
                  href={p.githubUrl ?? '#'}
                  className={styles.viewBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Code ↗
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
