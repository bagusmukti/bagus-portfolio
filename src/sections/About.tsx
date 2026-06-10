import styles from './About.module.css'
import { useReveal } from '../hooks/useReveal'
import { personal } from '../safeData'
import { MagneticTag } from '../components/MagneticTag'

const CHIP_COLORS = [
  {
    bg: 'var(--ind-p)',           color: 'var(--ind)',   border: 'var(--ind-m)',
    hoverBg: 'var(--ind-p)',      hoverColor: 'var(--ind)',   hoverBorder: 'var(--ind-m)',
    hoverShadow: '0 4px 14px rgba(74,69,128,0.22)',
  },
  {
    bg: 'var(--pch-p)',           color: 'var(--pch)',   border: 'rgba(232,130,106,0.2)',
    hoverBg: 'rgba(232,130,106,0.18)', hoverColor: 'var(--pch)', hoverBorder: 'var(--pch)',
    hoverShadow: '0 4px 14px rgba(232,130,106,0.22)',
  },
  {
    bg: 'rgba(200,197,240,0.25)', color: 'var(--ind-l)', border: 'var(--lav)',
    hoverBg: 'rgba(200,197,240,0.5)', hoverColor: 'var(--ind-l)', hoverBorder: 'var(--ind-m)',
    hoverShadow: '0 4px 14px rgba(200,197,240,0.35)',
  },
]

const RIGHT_STATS = [
  { num: '2+',      label: 'Years Exp.' },
  { num: 'Surabaya, Indonesia', label: 'Location' },
  { num: 'ID/EN',   label: 'Languages' },
]

export function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="about" ref={ref} className={styles.about}>

      {/* ── LEFT: narrative ── */}
      <div className={styles.main}>
        <div className={`${styles.sectionTag} reveal`}>About me</div>
        <h2 className={`${styles.h2} reveal d1`}>
          A developer who<br />
          <em className={styles.em}>thinks before typing.</em>
        </h2>

        <div className={`${styles.bio} reveal d2`}>
          {(personal.bio ?? '').split('\n').map((line, i) =>
            line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
          )}
        </div>

        <div className={`${styles.chips} reveal d3`}>
          {(personal.chips ?? []).map((chip, i) => (
            <MagneticTag
              key={chip}
              label={chip}
              colors={CHIP_COLORS[i % CHIP_COLORS.length]}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT: stats ── */}
      <div className={styles.statsPanel}>
        {RIGHT_STATS.map(({ num, label }, i) => (
          <div key={i} className={`${styles.statCard} reveal d${i + 1}`}>
            <span className={`${styles.statNum} ${num.length > 6 ? styles.statNumSm : ''}`}>{num}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>

    </section>
  )
}
