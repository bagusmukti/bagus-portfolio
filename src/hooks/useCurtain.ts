import { useEffect, useRef } from 'react'

export function useCurtain() {
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = document.createElement('div')
    el.id = 'curtain-overlay'
    Object.assign(el.style, {
      position: 'fixed',
      inset: '0',
      background: '#4a4580',
      transform: 'translateY(-100%)',
      transition: 'transform 0.55s cubic-bezier(.77,0,.18,1)',
      zIndex: '8888',
      pointerEvents: 'none',
    })
    document.body.appendChild(el)
    overlayRef.current = el

    return () => el.remove()
  }, [])

  const navigate = (targetId: string) => {
    const el = overlayRef.current
    if (!el) return

    el.style.pointerEvents = 'all'
    el.style.transform = 'translateY(0)'

    setTimeout(() => {
      const target = document.getElementById(targetId)
      if (target) target.scrollIntoView({ behavior: 'instant' })

      setTimeout(() => {
        el.style.transform = 'translateY(100%)'

        setTimeout(() => {
          el.style.transform = 'translateY(-100%)'
          el.style.pointerEvents = 'none'
        }, 560)
      }, 80)
    }, 520)
  }

  return { navigate }
}
