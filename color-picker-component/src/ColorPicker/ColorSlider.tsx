import { FunctionComponent, useRef, useState } from 'react'
import { Color } from './Color'
import Transform, { TransformOffset } from './Transform'
import SliderHandle from './sliderHandle'
import styles from './ColorSlider.module.scss'
import useDragMove from './useDragMove'
import { calculateSliderColor, calculateSliderPosition } from './utils'
import { useLasted } from './useLasted'
interface ColorSliderProps {
  color: Color
  onChange: (color: Color) => void
}

const ColorSlider: FunctionComponent<ColorSliderProps> = (props) => {
  const { color, onChange } = props
  const containerRef = useRef(null)
  const handleRef = useRef(null)
  const lastColor = useLasted(color)
  const [offset] = useDragMove(
    containerRef,
    handleRef,
    lastColor.current,
    (newOffset: TransformOffset) => {
      const _color = calculateSliderColor(containerRef, handleRef, newOffset, lastColor.current)
      onChange?.(_color)
    },
    (color, containerRef, dragableRef) => {
      return calculateSliderPosition(containerRef, dragableRef, color)
    },
    'y'
  )

  return (
    <div className={styles.colorSlider} ref={containerRef}>
      <Transform transformOffset={offset}>
        <SliderHandle ref={handleRef} size="small" styles={{ marginTop: '-2px' }}></SliderHandle>
      </Transform>
    </div>
  )
}

export default ColorSlider
