import React, { forwardRef } from 'react'

export interface TransformOffset {
  x: number
  y: number
}

export interface TransformProps {
  children: React.ReactNode | React.ReactNode[]
  transformOffset: TransformOffset
  style?: React.CSSProperties
  className?: string
}

const Transform = forwardRef<HTMLDivElement, TransformProps>(
  ({ children, transformOffset, style = {}, className }, ref) => {
    const { x, y } = transformOffset

    return (
      <div ref={ref} className={className} style={{ ...style, position: 'absolute', left: `${x}px`, top: `${y}px` }}>
        {children}
      </div>
    )
  }
)

export default Transform
