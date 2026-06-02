import styles from './Hero.module.css'
import { Particles } from '../components/Particles'
import { useTyping } from '../hooks/useTyping'
import { personal } from '../safeData'

interface Props {
  onNav: (id: string) => void
}

export function Hero({ onNav }: Props) {
  const typedText = useTyping()

  return (
    <section id="hero" className={styles.hero}>
      <Particles />

      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.inner}>
        <span className={styles.welcome}>Welcome to my website</span>

        <div className={styles.content}>
          <div className={styles.badge}>
            ✦ Software Engineer · Indonesia
          </div>

          <h1 className={styles.h1}>
            Hi, I build things that<br />
            <span className={styles.typingText}>
              {typedText}
              <span className={styles.cursor} />
            </span>
          </h1>

          <p className={styles.sub}>
            I'm a software engineer who loves crafting products end to end 
            from database schema to delightful UI. Clean code, honest design, shipped with care.
          </p>

          <div className={styles.btns}>
            <button className={styles.btnInd} onClick={() => onNav('projects')}>
              View my work
            </button>
          </div>
        </div>

        <div className={styles.statsRow}>
          {(personal.stats ?? []).map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span className={styles.scrollArrow}>↓</span>
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </section>
  )
}
