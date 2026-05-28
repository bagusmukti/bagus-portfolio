import styles from './Skills.module.css'
import { useReveal } from '../hooks/useReveal'
import { MagneticTag } from '../components/MagneticTag'
import { skills } from '../data'

type DelayClass = 1 | 2 | 3 | 4 | 5

export function Skills() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="skills" ref={ref} className={styles.skills}>
      <div className={styles.header}>
        <div className={`${styles.sectionTag} reveal`}>Skills</div>
        <div className={styles.headerRow}>
          <h2 className={`${styles.h2} reveal d1`}>What I know</h2>
          <p className={`${styles.subtitle} reveal d1`}>Tools and tech I use every day.</p>
        </div>
      </div>

      <div className={styles.list}>
        {skills.map((s, i) => {
          const d = Math.min(i + 1, 5) as DelayClass
          return (
            <div key={s.cat} className={`${styles.row} reveal d${d}`}>
              <span className={styles.cat}>{s.cat}</span>
              <div className={styles.tags}>
                {s.tags.map((tag) => (
                  <MagneticTag key={tag} label={tag} />
                ))}
              </div>
              <span className={styles.level}>{s.level}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
