import { useEffect, useRef } from 'react'
import styles from './Particles.module.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

const COLORS = ['#4a4580', '#6e69b0', '#c8c5f0', '#e8826a', '#f2a892', '#dddaf0']

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function makeParticle(w: number, h: number): Particle {
  return {
    x: rand(0, w),
    y: rand(h * 0.5, h),
    vx: rand(-0.2, 0.2),
    vy: -rand(0.3, 0.9),
    r: rand(2, 6),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: rand(0.25, 0.75),
    life: 0,
    maxLife: rand(180, 380),
  }
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    canvas.width = w
    canvas.height = h

    const COUNT = 28
    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const p = makeParticle(w, h)
      p.life = rand(0, p.maxLife)
      return p
    })

    let raf = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.life++
        p.x += p.vx
        p.y += p.vy

        let alpha = p.opacity
        if (p.life < 30) alpha = p.opacity * (p.life / 30)
        else if (p.life > p.maxLife - 30) alpha = p.opacity * ((p.maxLife - p.life) / 30)

        if (p.life >= p.maxLife || p.y + p.r < 0) {
          Object.assign(p, makeParticle(w, h))
          p.y = h + p.r
          p.life = 0
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
