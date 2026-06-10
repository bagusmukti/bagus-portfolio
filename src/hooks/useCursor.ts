import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    document.body.style.cursor = 'none'

    const dot = document.createElement('div')
    Object.assign(dot.style, {
      position: 'fixed',
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      background: '#4a4580',
      mixBlendMode: 'multiply',
      pointerEvents: 'none',
      zIndex: '9999',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.2s, height 0.2s, background 0.2s',
    })

    const ring = document.createElement('div')
    Object.assign(ring.style, {
      position: 'fixed',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: '1.5px solid #c0bde8',
      pointerEvents: 'none',
      zIndex: '9998',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.2s, height 0.2s, border-color 0.2s',
    })

    const TRAIL_COUNT = 6
    const trailSizes = [10, 8.8, 7.6, 6.4, 5.2, 4]
    const trailColors = ['#4a4580', '#6e69b0', '#9a97d0', '#c8c5f0', '#f2a892', '#e8826a']
    const trailOpacities = [0.55, 0.48, 0.4, 0.3, 0.22, 0.13]

    const trails: HTMLDivElement[] = []
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = document.createElement('div')
      Object.assign(t.style, {
        position: 'fixed',
        width: `${trailSizes[i]}px`,
        height: `${trailSizes[i]}px`,
        borderRadius: '50%',
        background: trailColors[i],
        opacity: String(trailOpacities[i]),
        pointerEvents: 'none',
        zIndex: String(9997 - i),
        transform: 'translate(-50%, -50%)',
      })
      trails.push(t)
      document.body.appendChild(t)
    }

    document.body.appendChild(ring)
    document.body.appendChild(dot)

    let mx = -100, my = -100
    let rx = -100, ry = -100
    const trailPos = trails.map(() => ({ x: -100, y: -100 }))
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const loop = () => {
      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`

      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`

      let prevX = mx, prevY = my
      for (let i = 0; i < TRAIL_COUNT; i++) {
        trailPos[i].x = lerp(trailPos[i].x, prevX, 0.22)
        trailPos[i].y = lerp(trailPos[i].y, prevY, 0.22)
        trails[i].style.left = `${trailPos[i].x}px`
        trails[i].style.top = `${trailPos[i].y}px`
        prevX = trailPos[i].x
        prevY = trailPos[i].y
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const setHover = (on: boolean) => {
      if (on) {
        dot.style.width = '22px'
        dot.style.height = '22px'
        dot.style.background = '#e8826a'
        ring.style.width = '48px'
        ring.style.height = '48px'
        ring.style.borderColor = '#f2a892'
      } else {
        dot.style.width = '14px'
        dot.style.height = '14px'
        dot.style.background = '#4a4580'
        ring.style.width = '36px'
        ring.style.height = '36px'
        ring.style.borderColor = '#c0bde8'
      }
    }

    const attachHover = (el: Element) => {
      el.addEventListener('mouseenter', () => setHover(true))
      el.addEventListener('mouseleave', () => setHover(false))
    }

    const scanAndAttach = () => {
      document.querySelectorAll('button, a, .sk-tag').forEach(attachHover)
    }
    scanAndAttach()

    const observer = new MutationObserver(scanAndAttach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.style.cursor = ''
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
      dot.remove()
      ring.remove()
      trails.forEach((t) => t.remove())
    }
  }, [])
}
