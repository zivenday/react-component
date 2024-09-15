import React, { CSSProperties, forwardRef, useCallback, useImperativeHandle, useState } from 'react'

import styles from './panel.module.css'
import ColorPickerPanel from './ColorPickerPanel'
import ColorSlider from './ColorSlider'
import TransparentSlider from './TransParentSlider'
import { Color } from './Color'

const ColorPickerMain = (props: { color: Color; onChange: (color: Color) => void }) => {
  const { color, onChange } = props

  const handleColorPanelChange = useCallback((color: Color) => {
    onChange?.(color)
  }, [])
  const handleTransparentChange = useCallback((color: Color) => {
    onChange?.(color)
  }, [])
  const handleColorSliderChange = useCallback((color: Color) => {
    onChange?.(color)
  }, [])
  return (
    <div className={styles.colorPickerMain}>
      <ColorPickerPanel onChange={handleColorPanelChange} color={color} />
      <div>
        <div>
          <ColorSlider onChange={handleColorSliderChange} color={color} />
          <TransparentSlider onChange={handleTransparentChange} color={color} />
        </div>
        <div className="color" style={{ backgroundColor: color.toRgbString() }}></div>
      </div>
    </div>
  )
}

export default ColorPickerMain
