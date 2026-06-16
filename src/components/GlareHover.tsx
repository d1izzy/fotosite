import React from 'react'

interface GlareHoverProps {
  width?: string
  height?: string
  background?: string
  borderRadius?: string
  borderColor?: string
  children?: React.ReactNode
  glareColor?: string
  glareOpacity?: number
  glareAngle?: number
  glareSize?: number
  transitionDuration?: number
  playOnce?: boolean
  className?: string
  style?: React.CSSProperties
}

function toGlareRgba(glareColor: string, glareOpacity: number) {
  const hex = glareColor.replace('#', '')
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${glareOpacity})`
  }
  if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16)
    const g = parseInt(hex[1] + hex[1], 16)
    const b = parseInt(hex[2] + hex[2], 16)
    return `rgba(${r}, ${g}, ${b}, ${glareOpacity})`
  }
  return glareColor
}

const GlareHover: React.FC<GlareHoverProps> = ({
  width = '500px',
  height = '500px',
  background = '#000',
  borderRadius = '10px',
  borderColor = '#333',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  className = '',
  style = {},
}) => {
  const glareRgba = toGlareRgba(glareColor, glareOpacity)

  return (
    <div
      className={`glare-hover relative grid place-items-center overflow-hidden border ${className}`}
      style={
        {
          width,
          height,
          background,
          borderRadius,
          borderColor,
          '--glare-angle': `${glareAngle}deg`,
          '--glare-color': glareRgba,
          '--glare-size': `${glareSize}%`,
          '--glare-duration': `${transitionDuration}ms`,
          ...style,
        } as React.CSSProperties
      }
    >
      <div className="glare-hover__overlay pointer-events-none absolute inset-0" aria-hidden />
      {children}
    </div>
  )
}

export default GlareHover
