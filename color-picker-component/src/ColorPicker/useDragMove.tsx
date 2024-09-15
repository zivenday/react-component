import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Color } from './Color'
import { TransformOffset } from './Transform'
export default function useDragMove(
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<HTMLDivElement>,
  color: Color,
  onChange: (offset: TransformOffset) => any,
  calculatePosition: (
    color: Color,
    containerRef: React.RefObject<HTMLDivElement>,
    targetRef: React.RefObject<HTMLDivElement>
  ) => TransformOffset,

  direction?: 'x' | 'y'
) {
  const [position, setPosition] = useState<TransformOffset>({ x: 0, y: 0 }) //位置
  const isMouseDownRef = useRef<boolean>(false)
  const preColorRef = useRef<any>()
  const prePositionRef = useRef<any>()

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isMouseDownRef.current = true
    const _postion = updateOffset(e as any, containerRef, targetRef)

    let newPosition = Object.assign({}, _postion)
    if (direction === 'y') {
      newPosition.y = position.y
    }
    setPosition(newPosition)
    onChange?.(newPosition)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseDownRef.current) {
        const _postion = updateOffset(e, containerRef, targetRef)
        const prePosition = prePositionRef.current
        const { x: preX, y: preY } = prePosition || { x: 0, y: 0 }
        if (preX !== _postion.x || preY !== _postion.y) {
          prePositionRef.current = _postion
          let newPosition = Object.assign({}, _postion)
          if (direction === 'y') {
            newPosition.y = position.y
          }
          // console.log('mouseMove', newPosition)
          setPosition(newPosition)
          onChange?.(newPosition)
        }
      }
    },
    [color]
  )

  const handleMouseUp = useCallback(() => {
    isMouseDownRef.current = false
  }, [])

  useEffect(() => {
    if (!containerRef?.current) {
      return
    }
    containerRef.current!.addEventListener('mousedown', handleMouseDown)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  useEffect(() => {
    // console.log('color改变更新position', color)
    // if (isMouseDownRef.current) {
    // count1.current++
    const { a, b, g, r } = color
    const { a: preA, b: preB, g: preG, r: preR } = preColorRef.current || Object.create(null)
    if (a !== preA || b !== preB || g !== preG || r !== preR) {
      // count2.current++
      preColorRef.current = color
      const _postion = calculatePosition?.(color, containerRef, targetRef)
      if (_postion) {
        setPosition(_postion)
      }
    }
    // }
  }, [color])

  return [position] as const
}

function updateOffset(
  e: MouseEvent,
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<HTMLDivElement>
) {
  // throw new Error('Function not implemented.')
  const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft
  const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop

  const pageX = e.pageX - scrollXOffset
  const pageY = e.pageY - scrollYOffset

  const { x: rectX, y: rectY, width, height } = containerRef.current!.getBoundingClientRect()

  const { width: targetWidth, height: targetHeight } = targetRef.current!.getBoundingClientRect()

  const centerOffsetX = targetWidth / 2
  const centerOffsetY = targetHeight / 2

  const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX
  const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY

  const calcOffset = {
    x: offsetX,
    y: offsetY,
  }
  // console.log('calcOffset', calcOffset.x, calcOffset.y)
  // setOffsetValue(calcOffset);
  // onDragChange?.(calcOffset);
  return calcOffset
}
