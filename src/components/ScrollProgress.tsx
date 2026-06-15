import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-px"
    >
      <div
        className="h-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
