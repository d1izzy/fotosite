import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'

interface GridMotionProps {
  items?: (string | ReactNode)[]
  gradientColor?: string
  className?: string
}

const ROWS = 4
const COLS = 7
const TOTAL_ITEMS = ROWS * COLS

function isImageSrc(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    (value.startsWith('http') || value.startsWith('/') || value.startsWith('data:'))
  )
}

const GridMotion = ({
  items = [],
  gradientColor = '#0a0a0a',
  className = '',
}: GridMotionProps) => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseXRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  )
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const defaultItems = Array.from({ length: TOTAL_ITEMS }, (_, index) => `Фото ${index + 1}`)
  const combinedItems = items.length > 0 ? items.slice(0, TOTAL_ITEMS) : defaultItems

  while (combinedItems.length < TOTAL_ITEMS && items.length > 0) {
    combinedItems.push(items[combinedItems.length % items.length])
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.ticker.lagSmoothing(0)

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX
    }

    const updateMotion = () => {
      const maxMoveAmount = 220
      const baseDuration = 0.8
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2]

      rowRefs.current.forEach((row, index) => {
        if (!row) return

        const direction = index % 2 === 0 ? 1 : -1
        const moveAmount =
          ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction

        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
    }

    const removeAnimationLoop = gsap.ticker.add(updateMotion)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      removeAnimationLoop()
    }
  }, [])

  useEffect(() => {
    if (!lightboxSrc) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxSrc])

  return (
    <>
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <div
          className="relative flex h-full w-full items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(circle at center, ${gradientColor} 0%, transparent 72%)`,
          }}
        >
          <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-canvas/80 via-transparent to-canvas/90" />
          <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-canvas via-transparent to-canvas" />

          <div className="relative z-[4] grid h-[140%] w-[150%] flex-none origin-center rotate-[-12deg] grid-cols-1 grid-rows-4 gap-3 md:gap-4">
            {Array.from({ length: ROWS }, (_, rowIndex) => (
              <div
                key={rowIndex}
                ref={(el) => {
                  rowRefs.current[rowIndex] = el
                }}
                className="grid grid-cols-7 gap-3 md:gap-4"
                style={{ willChange: 'transform' }}
              >
                {Array.from({ length: COLS }, (_, itemIndex) => {
                  const content = combinedItems[rowIndex * COLS + itemIndex]
                  const isImage = isImageSrc(content)

                  return (
                    <div key={itemIndex} className="relative aspect-[4/5]">
                      {isImage ? (
                        <button
                          type="button"
                          onClick={() => setLightboxSrc(content)}
                          className="group relative h-full w-full cursor-zoom-in overflow-hidden rounded-md border-2 border-accent/65 transition-[border-color,box-shadow,transform] duration-300 hover:border-accent hover:shadow-[0_4px_18px_rgb(var(--color-accent-rgb)/0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                          aria-label="Открыть фото"
                        >
                          <img
                            src={content}
                            alt="Пример готовой продукции"
                            className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                            loading="lazy"
                            draggable={false}
                          />
                        </button>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md border-2 border-accent/40 bg-[#111]">
                          <div className="p-2 text-center text-xs text-white/50">{content}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxSrc &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightboxSrc(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фотографии"
          >
            <button
              type="button"
              onClick={() => setLightboxSrc(null)}
              className="absolute top-4 right-4 rounded-full border border-accent/40 bg-canvas/80 px-3 py-1.5 text-sm text-accent transition-colors hover:border-accent hover:bg-accent/10"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <img
              src={lightboxSrc}
              alt="Пример готовой продукции"
              className="max-h-[90vh] max-w-[min(92vw,1100px)] rounded-xl border-2 border-accent object-contain shadow-[0_0_40px_rgb(var(--color-accent-rgb)/0.25)]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  )
}

export default GridMotion
