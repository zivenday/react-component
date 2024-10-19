// @flow
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Position } from '../hooks'
import { useComponentsStore, getComponentById } from '../stores'
type Props = {
  selector: string
  position?: Position
  activeId?: number
}

const HoverBar = (props: Props) => {
  const { selector, position, activeId } = props
  const { components, isDragging } = useComponentsStore()
  const component = getComponentById(activeId!, components)
  const { name = '' } = component || {}

  const y = position?.y ?? 0
  let labelLeft = 0
  let labelTop = y - 27 < 0 ? 0 : -27
  const isMinHeight = position?.height && position?.height < 50
  const isMinTop = y - 27 < 0
  if (isMinHeight) {
    if (isMinTop) {
      labelLeft = position?.width ?? 0
    }
  }
  return (
    position &&
    ReactDOM.createPortal(
      <div
        className="absolute top-0 left-0 z-0 hover-editor"
        style={{
          top: position?.y,
          left: position?.x,
          width: position?.width,
          height: position?.height,
          pointerEvents: 'none',
          cursor: 'pointer',
          boxSizing: 'border-box',
          borderColor: 'green',
          borderWidth: 1,
          zIndex: 2,
          opacity: isDragging ? 0 : 1,
        }}
      >
        <span
          className={`absolute  px-[5px]  text-[#fff] text-[12px]`}
          style={{
            backgroundColor: 'green',
            left: labelLeft + 'px',
            top: labelTop + 'px',
          }}
        >
          {name}
        </span>
      </div>,
      document.querySelector(selector) as HTMLElement
    )
  )
}

export default HoverBar
