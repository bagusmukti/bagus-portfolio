import { useState, useEffect, useRef } from 'react'

const PHRASES = ['make an impact.', 'stand out.', 'work beautifully.', 'feel alive.']
const TYPE_MS = 85
const DELETE_MS = 40
const PAUSE_MS = 1600

export function useTyping() {
  const [text, setText] = useState('')
  const state = useRef({ pi: 0, ci: 0, deleting: false })

  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>

    const tick = () => {
      const { pi, ci, deleting } = state.current
      const phrase = PHRASES[pi]

      if (!deleting) {
        const next = phrase.slice(0, ci + 1)
        setText(next)
        if (ci + 1 === phrase.length) {
          state.current.deleting = true
          tid = setTimeout(tick, PAUSE_MS)
        } else {
          state.current.ci = ci + 1
          tid = setTimeout(tick, TYPE_MS)
        }
      } else {
        const next = phrase.slice(0, ci - 1)
        setText(next)
        if (ci - 1 === 0) {
          state.current.deleting = false
          state.current.pi = (pi + 1) % PHRASES.length
          state.current.ci = 0
          tid = setTimeout(tick, TYPE_MS)
        } else {
          state.current.ci = ci - 1
          tid = setTimeout(tick, DELETE_MS)
        }
      }
    }

    tid = setTimeout(tick, TYPE_MS)
    return () => clearTimeout(tid)
  }, [])

  return text
}
