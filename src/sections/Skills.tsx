import styles from './Skills.module.css'
import { useReveal } from '../hooks/useReveal'
import { MagneticTag } from '../components/MagneticTag'
import { skills } from '../safeData'
import {
  SiJavascript, SiReact, SiTypescript, SiTailwindcss,
  SiPhp, SiLaravel, SiDotnet,
  SiFlutter, SiDart,
  SiMysql, SiPostgresql, SiRedis,
  SiGit, SiFigma, SiGithubactions,
} from 'react-icons/si'
import { type ReactNode } from 'react'

const ic = (icon: ReactNode, color: string) => (
  <span style={{ color, display: 'inline-flex', alignItems: 'center' }}>{icon}</span>
)

const ICON_MAP: Record<string, ReactNode> = {
  'Javascript':   ic(<SiJavascript />,   '#F7DF1E'),
  'React':        ic(<SiReact />,        '#61DAFB'),
  'TypeScript':   ic(<SiTypescript />,   '#3178C6'),
  'Tailwind CSS': ic(<SiTailwindcss />,  '#06B6D4'),
  'PHP':          ic(<SiPhp />,          '#777BB4'),
  'C#':           ic(<SiDotnet />,       '#512BD4'),
  'Laravel':      ic(<SiLaravel />,      '#FF2D20'),
  'ASP.NET':      ic(<SiDotnet />,       '#512BD4'),
  'Flutter':      ic(<SiFlutter />,      '#54C5F8'),
  'Dart':         ic(<SiDart />,         '#0175C2'),
  'MySQL':        ic(<SiMysql />,        '#4479A1'),
  'PostgreSQL':   ic(<SiPostgresql />,   '#4169E1'),
  'Redis':        ic(<SiRedis />,        '#DC382D'),
  'Git':          ic(<SiGit />,          '#F05032'),
  'CI/CD':        ic(<SiGithubactions />, '#2088FF'),
  'Figma':        ic(<SiFigma />,        '#F24E1E'),
}

type DelayClass = 1 | 2 | 3 | 4 | 5

const TAG_COLORS = [
  {
    bg: 'rgba(168,216,200,0.3)',    color: '#2d7a65',      border: 'rgba(168,216,200,0.6)',
    hoverBg: 'rgba(168,216,200,0.55)', hoverColor: '#2d7a65', hoverBorder: 'var(--mint)',
    hoverShadow: '0 4px 14px rgba(168,216,200,0.4)',
  },
  {
    bg: 'var(--pch-p)',             color: 'var(--pch)',   border: 'rgba(232,130,106,0.25)',
    hoverBg: 'rgba(232,130,106,0.18)', hoverColor: 'var(--pch)', hoverBorder: 'var(--pch)',
    hoverShadow: '0 4px 14px rgba(232,130,106,0.22)',
  },
  {
    bg: 'var(--ind-p)',             color: 'var(--ind)',   border: 'var(--ind-m)',
    hoverBg: 'var(--ind-p)',        hoverColor: 'var(--ind)', hoverBorder: 'var(--ind-m)',
    hoverShadow: '0 4px 14px rgba(74,69,128,0.22)',
  },
  {
    bg: 'rgba(200,197,240,0.3)',    color: 'var(--ind-l)', border: 'var(--lav)',
    hoverBg: 'rgba(200,197,240,0.55)', hoverColor: 'var(--ind-l)', hoverBorder: 'var(--ind-m)',
    hoverShadow: '0 4px 14px rgba(200,197,240,0.35)',
  },
]

export function Skills() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="skills" ref={ref} className={styles.skills}>
      <div className={styles.header}>
        <div className={`${styles.sectionTag} reveal`}>Skills</div>
        <div className={styles.headerRow}>
          <h2 className={`${styles.h2} reveal d1`}>What I know</h2>
          <p className={`${styles.subtitle} reveal d1`}>Tools and tech I implemented.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {(skills ?? []).map((s, i) => {
          const d = Math.min(i + 1, 5) as DelayClass
          return (
            <div key={s.cat} className={`${styles.card} reveal d${d}`}>
              <span className={styles.cat}>{s.cat}</span>
              <div className={styles.tags}>
                {(s.tags ?? []).map((tag, j) => (
                  <MagneticTag key={tag} label={tag} icon={ICON_MAP[tag]} colors={TAG_COLORS[(i + j) % TAG_COLORS.length]} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
