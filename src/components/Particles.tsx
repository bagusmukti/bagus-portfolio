import { useEffect, useRef } from 'react'
import styles from './Particles.module.css'

// ── Original floating dot particles ──────────────────────────────────────────
const DOT_COLORS = ['#4a4580', '#6e69b0', '#c8c5f0', '#e8826a', '#f2a892', '#dddaf0']

interface DotParticle {
  x: number; y: number; vx: number; vy: number
  r: number; color: string; opacity: number; life: number; maxLife: number
}

function makeDot(w: number, h: number): DotParticle {
  return {
    x: rand(0, w), y: rand(h * 0.5, h),
    vx: rand(-0.2, 0.2), vy: -rand(0.3, 0.9),
    r: rand(2, 6),
    color: DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)],
    opacity: rand(0.25, 0.75),
    life: 0, maxLife: rand(180, 380),
  }
}

// ── Flow field particles ──────────────────────────────────────────────────────
const FLOW_COLORS = [
  'rgba(200,197,240,',
  'rgba(74,69,128,',
  'rgba(110,105,176,',
  'rgba(232,130,106,',
  'rgba(221,218,240,',
]

interface FlowParticle {
  x: number; y: number; px: number; py: number
  speed: number; colorIdx: number; opacity: number; life: number; maxLife: number
}

function makeFlow(w: number, h: number): FlowParticle {
  return {
    x: rand(0, w), y: rand(0, h),
    px: 0, py: 0,
    speed: rand(0.6, 1.4),
    colorIdx: Math.floor(Math.random() * FLOW_COLORS.length),
    opacity: rand(0.7, 1.0),
    life: 0, maxLife: rand(200, 480),
  }
}

function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.8 + t * 0.4) * Math.cos(y * 0.6 + t * 0.3) +
    Math.sin(x * 0.3 - y * 0.5 + t * 0.25) * 0.5 +
    Math.cos(x * 0.5 + y * 0.4 + t * 0.15) * 0.5
  )
}

function fieldAngle(x: number, y: number, t: number): number {
  return noise(x * 0.0025, y * 0.0025, t) * Math.PI * 2
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
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

    // Dot particles
    const DOT_COUNT = 28
    const dots: DotParticle[] = Array.from({ length: DOT_COUNT }, () => {
      const p = makeDot(w, h)
      p.life = rand(0, p.maxLife)
      return p
    })

    // Flow particles
    const FLOW_COUNT = 80
    const flows: FlowParticle[] = Array.from({ length: FLOW_COUNT }, () => {
      const p = makeFlow(w, h)
      p.life = rand(0, p.maxLife)
      p.px = p.x
      p.py = p.y
      return p
    })

    let t = 0
    let raf = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // ── Draw flow field ──
      for (const p of flows) {
        p.px = p.x
        p.py = p.y

        const angle = fieldAngle(p.x, p.y, t)
        p.x += Math.cos(angle) * p.speed
        p.y += Math.sin(angle) * p.speed
        p.life++

        const fade = p.life < 40
          ? p.life / 40
          : p.life > p.maxLife - 40
            ? (p.maxLife - p.life) / 40
            : 1

        if (
          p.life >= p.maxLife ||
          p.x < -4 || p.x > w + 4 ||
          p.y < -4 || p.y > h + 4
        ) {
          Object.assign(p, makeFlow(w, h))
          p.px = p.x; p.py = p.y; p.life = 0
          continue
        }

        ctx.beginPath()
        ctx.moveTo(p.px, p.py)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = `${FLOW_COLORS[p.colorIdx]}${(p.opacity * fade).toFixed(3)})`
        ctx.lineWidth = rand(2.5, 5)
        ctx.stroke()
      }

      // ── Draw original dot particles ──
      for (const p of dots) {
        p.life++
        p.x += p.vx
        p.y += p.vy

        let alpha = p.opacity
        if (p.life < 30) alpha = p.opacity * (p.life / 30)
        else if (p.life > p.maxLife - 30) alpha = p.opacity * ((p.maxLife - p.life) / 30)

        if (p.life >= p.maxLife || p.y + p.r < 0) {
          Object.assign(p, makeDot(w, h))
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

      t += 0.004
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
