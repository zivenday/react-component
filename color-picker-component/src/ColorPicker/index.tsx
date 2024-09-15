import React, { useRef, useState } from 'react'
import {
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useFloating,
  shift,
  flip,
  offset,
  useId,
  FloatingArrow,
  arrow,
} from '@floating-ui/react'

import styles from './index.module.css'
import ColorPickerMain from './panel'

import { Color } from './Color'

const ColorPicker = () => {
  const [color, setColor] = useState(new Color('blue'))
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    placement: 'bottom-start',
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const headingId = useId()
  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])
  const handleColorChange = (color: Color) => {
    // console.log('顶级color', color.toHsv().h, color.toHsv().s, color.toHsv().v)
    setColor(color)
  }
  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={styles.colorPickerButton}
        style={{ backgroundColor: color.toRgbString() }}
      ></div>
      {isOpen && (
        <>
          <div
            className={styles.colorPickerMain}
            ref={refs.setFloating}
            style={{ ...floatingStyles, background: '#fff' }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <ColorPickerMain color={color} onChange={handleColorChange} />
            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={10}
              height={10}
              fill="white"
              stroke="black"
              strokeWidth={1}
            />
          </div>
        </>
      )}
    </>
  )
}

export default ColorPicker
