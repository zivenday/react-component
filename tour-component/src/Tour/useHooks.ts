import React, { useEffect, useState } from 'react'
import { getTargetRect } from './utils'
import { Step } from './interface'

export default function useBorderWidth(visible: boolean, stepIndex: number, steps: Step[]) {
  const [borderWidth, setBorderWidth] = useState([0, 0, 0, 0])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (visible) {
      const { width, height, left, top } = getTargetRect(stepIndex, steps)
      const pageWidth = document.documentElement.scrollWidth
      const pageHeight = document.documentElement.scrollHeight
      const right = pageWidth - width - left
      const bottom = pageHeight - height - top
      console.log(top, left, width, height)
      setBorderWidth([top, right, bottom, left])
      setWidth(width)
      setHeight(height)
    }
  }, [visible, stepIndex, steps])

  return [borderWidth, width, height] as const
}
