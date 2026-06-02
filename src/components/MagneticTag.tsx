import { useRef, type ReactNode } from 'react'
import styles from './MagneticTag.module.css'

interface Props {
  label: string
  icon?: ReactNode
  colors?: {
    bg: string; color: string; border: string
    hoverBg: string; hoverColor: string; hoverBorder: string; hoverShadow: string
  }
}

export function MagneticTag({ label, icon, colors }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.35
    const dy = (e.clientY - cy) * 0.35
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.15)`
    el.style.background  = colors?.hoverBg     ?? 'var(--ind-p)'
    el.style.color       = colors?.hoverColor  ?? 'var(--ind)'
    el.style.borderColor = colors?.hoverBorder ?? 'var(--ind-m)'
    el.style.boxShadow   = colors?.hoverShadow ?? '0 4px 14px rgba(74,69,128,0.18)'
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0,0) scale(1)'
    el.style.background = ''
    el.style.color = ''
    el.style.borderColor = ''
    el.style.boxShadow = ''
  }

  const chipStyle = colors ? {
    '--tag-bg': colors.bg,
    '--tag-color': colors.color,
    '--tag-border': colors.border,
  } as React.CSSProperties : undefined

  return (
    <span
      ref={ref}
      className={`${styles.tag} sk-tag`}
      style={chipStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </span>
  )
}
