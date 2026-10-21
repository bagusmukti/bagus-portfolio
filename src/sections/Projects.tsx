import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './Projects.module.css'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../safeData'

const THUMB_GRAD: Record<string, string> = {
  ind:  'linear-gradient(135deg, var(--ind-p) 0%, var(--bg) 100%)',
  pch:  'linear-gradient(135deg, var(--pch-p) 0%, var(--bg) 100%)',
  lav:  'linear-gradient(135deg, rgba(200,197,240,0.4) 0%, var(--bg) 100%)',
  mint: 'linear-gradient(135deg, rgba(168,216,200,0.4) 0%, var(--bg) 100%)',
}

type DelayClass = 1 | 2 | 3 | 4

function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const go = (step: number) => setIndex(i => (i + step + images.length) % images.length)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <div className={styles.gallery}>
      <div className={styles.slides} style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${title} screenshot ${i + 1}`}
            className={styles.thumbImg}
            loading="lazy"
            onClick={() => setOpen(true)}
          />
        ))}
      </div>

      <button type="button" className={styles.zoomBtn} onClick={() => setOpen(true)} aria-label="View full size">⤢</button>

      {open && createPortal(
        <div className={styles.lightbox} onClick={() => setOpen(false)} role="dialog" aria-label={`${title} screenshots`}>
          <img src={images[index]} alt={`${title} screenshot ${index + 1}`} className={styles.lightboxImg} onClick={e => e.stopPropagation()} />
          <button type="button" className={`${styles.lbBtn} ${styles.lbClose}`} onClick={() => setOpen(false)} aria-label="Close">✕</button>
          {images.length > 1 && (
            <>
              <button type="button" className={`${styles.lbBtn} ${styles.lbPrev}`} onClick={e => { e.stopPropagation(); go(-1) }} aria-label="Previous image">‹</button>
              <button type="button" className={`${styles.lbBtn} ${styles.lbNext}`} onClick={e => { e.stopPropagation(); go(1) }} aria-label="Next image">›</button>
              <span className={styles.lbCount}>{index + 1} / {images.length}</span>
            </>
          )}
        </div>,
        document.body,
      )}

      {images.length > 1 && (
        <>
          <button type="button" className={`${styles.navBtn} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous image">‹</button>
          <button type="button" className={`${styles.navBtn} ${styles.next}`} onClick={() => go(1)} aria-label="Next image">›</button>
          <div className={styles.dots}>
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function Projects() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="projects" ref={ref} className={styles.projects}>
      <div className={styles.header}>
        <div className={`${styles.sectionTag} reveal`}>Work</div>
        <div className={styles.headerRow}>
          <h2 className={`${styles.h2} reveal d1`}>Selected projects</h2>
          <p className={`${styles.subtitle} reveal d1`}>Things I've designed and built using the STAR method (Situation, Task, Action, Result).</p>
        </div>
      </div>

      <div className={styles.grid}>
        {(projects ?? []).map((p, i) => {
          const d = Math.min(i + 1, 4) as DelayClass
          return (
            <article key={p.num} className={`${styles.card} reveal d${d}`}>
              <div
                className={styles.thumb}
                style={{ background: THUMB_GRAD[p.color] ?? THUMB_GRAD.ind }}
              >
                {p.images?.length ? (
                  <Gallery images={p.images} title={p.title} />
                ) : (
                  <>
                    <span className={styles.thumbWatermark}>{p.num}</span>
                    <span className={styles.thumbTitle}>{p.title}</span>
                  </>
                )}
              </div>

              <div className={styles.body}>
                <div className={styles.stack}>
                  {(p.stack ?? []).map((tag: string) => (
                    <span key={tag} className={styles.stackPill}>{tag}</span>
                  ))}
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <ul className={styles.starList}>
                  {(['situation', 'task', 'action', 'result'] as const).map((key, idx) => (
                    <li key={key} className={styles.starRow}>
                      <span className={styles.starKey}>{'STAR'[idx]}</span>
                      <span className={styles.starVal}>{p.star[key]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.footer}>
                <span className={styles.year}>{p.year}</span>
                <a
                  href={p.githubUrl ?? '#'}
                  className={styles.viewBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project ↗
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
