import { FunctionComponent, useRef, useState } from 'react'
import { Color } from './Color'
import Transform, { TransformOffset } from './Transform'
import SliderHandle from './sliderHandle'
import styles from './TransParentSlider.module.scss'
import useDragMove from './useDragMove'
import {
  calculateSliderColor,
  calculateSliderPosition,
  calculateTransparentSliderColor,
  calculateTransparentSliderPosition,
} from './utils'
import { useLasted } from './useLasted'
interface TransParentSliderProps {
  color: Color
  onChange: (color: Color) => void
}

const TransParentSlider: FunctionComponent<TransParentSliderProps> = (props) => {
  const { color, onChange } = props
  const lastColor = useLasted(color)
  const containerRef = useRef(null)
  const handleRef = useRef(null)
  const [offset] = useDragMove(
    containerRef,
    handleRef,
    lastColor.current,
    (newOffset: TransformOffset) => {
      console.log('newOffset', newOffset)
      const _color = calculateTransparentSliderColor(containerRef, handleRef, newOffset, lastColor.current)
      onChange?.(_color)
    },
    (color, containerRef, dragableRef) => {
      return calculateTransparentSliderPosition(containerRef, dragableRef, color)
    },
    'y'
  )

  return (
    <div className={styles.TransParentSlider} ref={containerRef}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, rgba(255, 0, 4, 0) 0%, ${color.toRgbString()} 100%)`,
        }}
      >
        <Transform transformOffset={offset}>
          <SliderHandle ref={handleRef} size="small" styles={{ marginTop: '-2px' }}></SliderHandle>
        </Transform>
      </div>
    </div>
  )
}

export default TransParentSlider
