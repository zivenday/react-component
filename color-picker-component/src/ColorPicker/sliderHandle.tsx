import classNames from 'classnames'
import { forwardRef, useRef } from 'react'
import './sliderHandle.scss'
interface SliderHandleProps {
  styles?: React.CSSProperties
  size?: 'small' | 'mini'
}

const SliderHandle = forwardRef<HTMLDivElement, SliderHandleProps>((props, ref) => {
  const { styles = {}, size = 'small' } = props

  const classes = classNames('slider-handle', {
    'slider-handle-sm': size === 'small',
    'slider-handle-mini': size === 'mini',
  })

  return <div ref={ref} className={classes} style={styles}></div>
})

export default SliderHandle
