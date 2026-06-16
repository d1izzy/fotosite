import AnimatedContent from './AnimatedContent'

const accentLineStyle = {
  background:
    'linear-gradient(90deg, transparent 0%, rgb(var(--color-accent-rgb) / 0) 6%, rgb(var(--color-accent-rgb) / 0.1) 16%, rgb(var(--color-accent-rgb) / 0.28) 32%, rgb(var(--color-accent-rgb) / 0.42) 50%, rgb(var(--color-accent-rgb) / 0.28) 68%, rgb(var(--color-accent-rgb) / 0.1) 84%, rgb(var(--color-accent-rgb) / 0) 94%, transparent 100%)',
}

export function GoldenLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-full max-w-5xl ${className}`}
      style={accentLineStyle}
    />
  )
}

export default function SectionDivider() {
  return (
    <AnimatedContent
      aria-hidden
      distance={30}
      duration={0.9}
      scale={0.98}
      threshold={0.2}
      className="flex justify-center px-6 py-5 md:py-6"
    >
      <GoldenLine />
    </AnimatedContent>
  )
}
