import styles from './Experience.module.css'
import { useReveal } from '../hooks/useReveal'
import { experience } from '../safeData'

type DelayClass = 1 | 2 | 3 | 4

export function Experience() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="experience" ref={ref} className={styles.exp}>
      <div className={styles.headerWrap}>
        <div className={`${styles.sectionTag} reveal`}>Experience</div>
        <div className={styles.headerRow}>
          <h2 className={`${styles.h2} reveal d1`}>Where I've worked</h2>
          <p className={`${styles.subtitle} reveal d1`}>A timeline of roles and impact.</p>
        </div>
      </div>

      <div className={styles.list}>
        {(experience ?? []).map((e, i) => {
          const d = Math.min(i + 1, 4) as DelayClass
          return (
            <div key={e.company} className={`${styles.item} reveal d${d}`}>
              <div className={styles.left}>
                <span className={styles.period}>{e.period}</span>
                <span className={styles.company}>{e.company}</span>
              </div>
              <div className={styles.right}>
                <h3 className={styles.role}>{e.role}</h3>
                <p className={styles.desc}>{e.desc}</p>
                <div className={styles.stack}>
                  {(e.stack ?? []).map((tag) => (
                    <span key={tag} className={styles.pill}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
