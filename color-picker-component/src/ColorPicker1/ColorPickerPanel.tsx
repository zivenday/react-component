import { CSSProperties } from 'react'
import cs from 'classnames'
import './index.scss'

export interface ColorPickerProps {
  className?: string
  style?: CSSProperties
}

function ColorPickerPanel(props: ColorPickerProps) {
  const { className, style } = props

  const classNames = cs('color-picker', className)

  return <div className={classNames} style={style}></div>
}

export default ColorPickerPanel
