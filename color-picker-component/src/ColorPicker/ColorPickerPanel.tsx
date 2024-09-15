import { useImperativeHandle, useState, forwardRef, CSSProperties, useRef, useCallback, useEffect } from 'react'
// import { useMouse } from 'react-use'
import styles from './ColorPickerPanel.module.css'
import Transform, { TransformOffset } from './Transform'
import { Color } from './Color'
import SliderHandle from './sliderHandle'
import useDragMove from './useDragMove'
import { calculateColor, calculatePosition } from './utils'
import { useLasted } from './useLasted'
type ColorPickerPanelProps = {
  onChange: (color: Color) => void
  color: Color
}

const ColorPickerPanel = forwardRef<{}, ColorPickerPanelProps>((props, ref) => {
  const { onChange, color } = props
  const lastColor = useLasted(color)
  //   const [isMouseDown, setIsMouseDown] = useState(false)

  const dragableRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  //   const obj = useMouse(dragableRef)
  const [position] = useDragMove(
    containerRef,
    dragableRef,
    lastColor.current,
    (_postion: TransformOffset) => {
      const _color = calculateColor(containerRef, dragableRef, _postion, lastColor.current)
      onChange?.(_color)
    },
    (color, containerRef, dragableRef) => {
      return calculatePosition(containerRef, dragableRef, color)
    }
  )

  return (
    <div
      className={styles.colorPickerPanel}
      style={{ backgroundColor: `hsl(${color.toHsl().h},100%, 50%)` }}
      ref={containerRef}
    >
      <Transform transformOffset={position}>
        <SliderHandle size="small" ref={dragableRef} />
      </Transform>
    </div>
  )
})

export default ColorPickerPanel
