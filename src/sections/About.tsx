import styles from './About.module.css'
import { useReveal } from '../hooks/useReveal'
import { personal } from '../safeData'
import { MagneticTag } from '../components/MagneticTag'
import { ThemeToggle } from '../components/ThemeToggle'

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

interface Props {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function About({ theme, onToggleTheme }: Props) {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="about" ref={ref} className={styles.about}>
      {/* ── LEFT: photo + name + role ── */}
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
      </div>

      {/* ── CENTER: narrative ── */}
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <div className={`${styles.sectionTag} reveal`}>About me</div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
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
