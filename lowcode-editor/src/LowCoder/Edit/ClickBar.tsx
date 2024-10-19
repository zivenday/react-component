// @flow
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Position } from '../hooks'
import { Component, useComponentsStore, getComponentById } from '../stores'
import { useMemo } from 'react'

type Props = {
  position?: Position
  activeId?: number | string
  selector: string
}

const ClickBar: React.FC<Props> = (props: Props) => {
  const { position, activeId, selector } = props
  const { components, delComponent } = useComponentsStore()

  const handleDel = () => {
    console.log('handleDel', activeId)
    const component = getComponentById(activeId as number, components)
    if (component?.parentId) {
      const el = document.querySelector(`[data-id="${component?.parentId}"]`) as HTMLElement
      el && el.click()
    }
    delComponent(component as Component)
  }
  // console.log('ClickBar', position, activeId)

  const isRoot = useMemo(() => {
    return activeId === 1 || (position?.x === 0 && position?.y === 0)
  }, [activeId, position])

  // const labelTop = y - 22 < 0 ? 0 : y - 22
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
      <>
        <div
          className="absolute top-0 left-0  z-[1] click-editor"
          style={{
            top: position?.y,
            left: position?.x,
            width: position?.width,
            height: position?.height,
            pointerEvents: 'none',
            boxSizing: 'border-box',
            border: '1px solid green',
            zIndex: 1,
          }}
        >
          {!isRoot ? (
            <div
              className={`absolute p-[5px] flex items-center   text-[12px] text-[#fff] cursor-pointer 
            pointer-events-auto whitespace-nowrap`}
              style={{
                backgroundColor: 'green',
                left: labelLeft + 'px',
                top: labelTop + 'px',
              }}
              onClick={handleDel}
            >
              删除
            </div>
          ) : null}
        </div>
      </>,
      document.querySelector(selector) as HTMLElement
    )
  )
}

export default ClickBar
