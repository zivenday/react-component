import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { Component, getComponentById, useComponentsStore, Actions } from '../stores'
import { useComponents } from '../components'
import { useClickPosition, useMovePosition } from '../hooks'
import HoverBar from './HoverBar'
import ClickBar from './ClickBar'
interface EditorProps {
  components: Component[]
  onUpdate: Actions['updateCompnent']
}

const removeActions = (props: Record<string, any>) => {
  // const { props } = component
  const { onClick, ...rest } = props || {}
  return rest || {}
}

const Editor: FunctionComponent<EditorProps> = (props) => {
  const containerSelector = '.edit-page'
  const ref = useRef<HTMLDivElement>(null)
  const { selectedComponent, setSelectedComponentId, components, isDragging } = useComponentsStore()
  const [cursorPosition, cursorId] = useMovePosition(containerSelector, isDragging)
  const [{ resizing }, selectedPosition, selectedId] = useClickPosition(
    containerSelector,
    selectedComponent,
    (newId) => {
      setSelectedComponentId(newId)
    },
    isDragging
  )

  const MetarailComponents = useComponents()

  const renderComponent = (component: Component) => {
    let _Component = null
    let _styles = { ...component.styles }
    let _props = removeActions({
      ...component.props,
      dataId: component.id,
      styles: _styles,
    })
    _Component = MetarailComponents.find((c) => c.displayName === component.name)
    if (!_Component) return <></>

    return (
      <_Component key={`${component.id}`} {..._props}>
        {component?.children?.map(renderComponent)}
      </_Component>
    )
  }
  return (
    <>
      <div ref={ref} className="relative edit-area w-[100%] h-[100%] box-content  ">
        {components.map(renderComponent)}
      </div>
      {cursorId == selectedId || resizing ? null : (
        <HoverBar position={cursorPosition} selector={containerSelector} activeId={cursorId} />
      )}
      {!resizing && !isDragging && (
        <ClickBar activeId={selectedId} position={selectedPosition} selector={containerSelector} />
      )}
    </>
  )
}

export default Editor
