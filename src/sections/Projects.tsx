import styles from './Projects.module.css'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../safeData'

const THUMB_GRAD: Record<string, string> = {
  ind:  'linear-gradient(135deg, var(--ind-p) 0%, var(--bg) 100%)',
  pch:  'linear-gradient(135deg, var(--pch-p) 0%, var(--bg) 100%)',
  lav:  'linear-gradient(135deg, rgba(200,197,240,0.4) 0%, var(--bg) 100%)',
  mint: 'linear-gradient(135deg, rgba(168,216,200,0.4) 0%, var(--bg) 100%)',
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
          <p className={`${styles.subtitle} reveal d1`}>Things I've designed and built using the STAR method (Situation, Task, Action, Result).</p>
        </div>
      </div>

      <div className={styles.grid}>
        {(projects ?? []).map((p, i) => {
          const d = Math.min(i + 1, 4) as DelayClass
          return (
            <article key={p.num} className={`${styles.card} reveal d${d}`}>
              <div
                className={styles.thumb}
                style={{ background: p.image ? undefined : (THUMB_GRAD[p.color] ?? THUMB_GRAD.ind) }}
              >
                {p.image ? (
                  <img src={p.image} alt={p.title} className={styles.thumbImg} />
                ) : (
                  <>
                    <span className={styles.thumbWatermark}>{p.num}</span>
                    <span className={styles.thumbTitle}>{p.title}</span>
                  </>
                )}
              </div>

              <div className={styles.body}>
                <div className={styles.stack}>
                  {(p.stack ?? []).map((tag: string) => (
                    <span key={tag} className={styles.stackPill}>{tag}</span>
                  ))}
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <ul className={styles.starList}>
                  {(['situation', 'task', 'action', 'result'] as const).map((key, idx) => (
                    <li key={key} className={styles.starRow}>
                      <span className={styles.starKey}>{'STAR'[idx]}</span>
                      <span className={styles.starVal}>{p.star[key]}</span>
                    </li>
                  ))}
                </ul>
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
