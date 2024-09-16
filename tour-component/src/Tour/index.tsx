import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './styles/index.module.scss'

import { FloatingArrow, arrow, flip, offset, useFloating, useInteractions } from '@floating-ui/react'

import { TourProps } from './interface'
import useBorderWidth from './useHooks'

export default function Tour(props: TourProps) {
  const [stepIndex, setstepIndex] = useState(0)
  const { visible, steps } = props
  const [floatVisible, setFloatVisible] = useState(!visible)
  const maskRef = useRef<HTMLDivElement>(null)
  const [borderWidth, width, height] = useBorderWidth(visible, stepIndex, steps)
  console.log(borderWidth)

  const arrowRef = useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    middleware: [
      flip(),
      offset(10),
      arrow({
        element: arrowRef,
      }),
    ],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([])

  useEffect(() => {
    setTimeout(() => {
      setFloatVisible(visible)
    })
  }, [visible])

  const setStepIndex = (num: number) => {
    setstepIndex(num)
    setFloatVisible(false)
    setTimeout(() => {
      setFloatVisible(true)
    })
  }

  return (
    <>
      {visible &&
        createPortal(
          <div
            className={styles.tourMask}
            ref={maskRef}
            style={{
              borderWidth: `${borderWidth[0]}px ${borderWidth[1]}px ${borderWidth[2]}px ${borderWidth[3]}px`,
            }}
          >
            {floatVisible && (
              <>
                <div
                  style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}
                  ref={refs.setReference}
                  {...getReferenceProps()}
                ></div>
                <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                  <div className={styles.FloatContent}>
                    {steps[stepIndex].title}
                    {stepIndex === 0 && <button onClick={() => setStepIndex(1)}> 下一步</button>}
                    {stepIndex === 1 && <button onClick={() => setStepIndex(0)}> 上一步</button>}
                  </div>
                  <FloatingArrow fill="white" ref={arrowRef} context={context} />
                </div>
              </>
            )}
          </div>,
          document.body
        )}
    </>
  )
}
