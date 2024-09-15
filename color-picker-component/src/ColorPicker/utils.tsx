import { Color } from './Color'
import { TransformOffset } from './Transform'

export function calculateColor(
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<HTMLDivElement>,
  postion: TransformOffset,
  color: Color
) {
  const { width, height } = containerRef.current!.getBoundingClientRect()
  const { width: targetRefWidth, height: dragableHeight } = targetRef.current!.getBoundingClientRect()
  const s = Math.max(0, Math.min((postion.x + targetRefWidth / 2) / width, 1))
  const l = Math.max(0, Math.min(1 - (postion.y + dragableHeight / 2) / height, 1))
  const { h, a } = color.toHsl()
  return new Color({
    h,
    s,
    l,
    a,
  })
}

export function calculateSliderColor(
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<HTMLDivElement>,
  postion: TransformOffset,
  color: Color
) {
  const { width } = containerRef.current!.getBoundingClientRect()
  const { width: targetRefWidth } = targetRef.current!.getBoundingClientRect()
  const { s, l, a } = color.toHsl()
  const newH = Math.max(0, Math.min((postion.x + targetRefWidth / 2) / width, 1)) * 360
  return new Color({
    h: newH,
    s,
    l,
    a,
  })
}

export function calculateTransparentSliderColor(
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<HTMLDivElement>,
  postion: TransformOffset,
  color: Color
) {
  const { width } = containerRef.current!.getBoundingClientRect()
  const { width: targetRefWidth } = targetRef.current!.getBoundingClientRect()
  const { h, s, l } = color.toHsl()
  const newA = Math.max(0, Math.min((postion.x + targetRefWidth / 2) / width, 1))
  return new Color({
    h,
    s,
    l,
    a: newA,
  })
}

export function calculatePosition(
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<HTMLDivElement>,
  color: Color
) {
  const { h, s, l } = color.toHsl()
  // console.log('color=>position', s, l)
  const { width, height } = containerRef.current!.getBoundingClientRect()
  const { width: targetRefWidth, height: dragableHeight } = targetRef.current!.getBoundingClientRect()
  const left = width * s - targetRefWidth / 2
  const top = height * (1 - l) - dragableHeight / 2
  // console.log('position', left, top)
  // setPosition({ x: left, y: top })
  return { x: left, y: top }
}

export function calculateSliderPosition(
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<HTMLDivElement>,
  color: Color
) {
  const { width } = containerRef.current!.getBoundingClientRect()
  const { width: targetRefWidth } = targetRef.current!.getBoundingClientRect()
  const { h } = color.toHsl()
  const left = (h / 360) * width - targetRefWidth / 2
  return { x: left, y: 0 }
}

export function calculateTransparentSliderPosition(
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: React.RefObject<HTMLDivElement>,
  color: Color
) {
  const { width } = containerRef.current!.getBoundingClientRect()
  const { width: targetRefWidth } = targetRef.current!.getBoundingClientRect()
  const { a } = color.toHsl()
  const left = a * width - targetRefWidth / 2
  return { x: left, y: 0 }
}
