import AnimatedContent from './AnimatedContent'

const goldenLineStyle = {
  background:
    'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0) 6%, rgba(212, 175, 55, 0.1) 16%, rgba(212, 175, 55, 0.28) 32%, rgba(212, 175, 55, 0.42) 50%, rgba(212, 175, 55, 0.28) 68%, rgba(212, 175, 55, 0.1) 84%, rgba(212, 175, 55, 0) 94%, transparent 100%)',
}

export function GoldenLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-full max-w-5xl ${className}`}
      style={goldenLineStyle}
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
