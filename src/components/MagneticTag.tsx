import { useRef } from 'react'
import styles from './MagneticTag.module.css'

interface Props {
  label: string
}

export function MagneticTag({ label }: Props) {
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
    el.style.background = 'var(--ind-p)'
    el.style.color = 'var(--ind)'
    el.style.borderColor = 'var(--ind-m)'
    el.style.boxShadow = '0 4px 14px rgba(74,69,128,0.18)'
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

  return (
    <span
      ref={ref}
      className={`${styles.tag} sk-tag`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {label}
    </span>
  )
}
