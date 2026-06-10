import { useState, useEffect } from 'react'

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']

export function useActiveSection() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const update = () => {
      const navHeight = (document.querySelector('nav') as HTMLElement)?.offsetHeight ?? 64
      const threshold = navHeight + 80

      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        if (top <= threshold && bottom > threshold) {
          setActive(id)
          return
        }
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return active
}
