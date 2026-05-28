import styles from './About.module.css'
import { useReveal } from '../hooks/useReveal'
import { personal } from '../data'

const CHIP_STYLES = ['ci', 'cp', 'cl', 'ci', 'cp'] as const

export function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="about" ref={ref} className={styles.about}>
      <div className={styles.sidebar}>
        <div className={`${styles.avatarWrap} reveal`}>
          <div className={styles.avatarRing}>
            <div className={styles.avatarInner}>
              {personal.photo ? (
                <img src={personal.photo} alt={personal.name} className={styles.photo} />
              ) : (
                <svg viewBox="0 0 60 60" fill="none" className={styles.personIcon}>
                  <circle cx="30" cy="22" r="11" fill="var(--ind-m)" />
                  <ellipse cx="30" cy="50" rx="18" ry="12" fill="var(--ind-m)" />
                </svg>
              )}
            </div>
          </div>
        </div>

        <div className={`${styles.sidebarName} reveal d1`}>
          <span className={styles.sideName}>{personal.name}</span>
          <span className={styles.sideRole}>{personal.role}</span>
        </div>

        <hr className={styles.rule} />

        <dl className={`${styles.metaList} reveal d2`}>
          {[
            { k: 'Based in', v: personal.location },
            { k: 'Degree', v: 'S.Kom · Computer Science' },
            { k: 'Experience', v: '3+ Years' },
            { k: 'Languages', v: 'ID / EN' },
            { k: 'Status', v: null as string | null },
          ].map(({ k, v }) => (
            <div key={k} className={styles.metaRow}>
              <dt className={styles.metaKey}>{k}</dt>
              <dd className={styles.metaVal}>
                {k === 'Status' ? (
                  <span className={styles.statusPill}>Open ✦</span>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.main}>
        <div className={`${styles.sectionTag} reveal`}>About me</div>
        <h2 className={`${styles.h2} reveal d1`}>
          A developer who<br />
          <em className={styles.em}>thinks before typing.</em>
        </h2>

        <div className={`${styles.bio} reveal d2`}>
          {personal.bio.split('\n').map((line, i) =>
            line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
          )}
        </div>

        <div className={`${styles.chips} reveal d3`}>
          {personal.chips.map((chip, i) => (
            <span key={chip} className={`${styles.chip} ${styles[CHIP_STYLES[i % CHIP_STYLES.length]]}`}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
