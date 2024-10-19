import { CSSProperties, forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useRef } from 'react'
import { Component, useComponentsStore } from '../../stores'
import Transformer from '../Transformer'
import { useBaseDrag, useBaseDrop, useComponentDrop } from '../../hooks'
import { useDrag } from 'react-dnd'
import { createId4Component } from '../../utils'

interface ContainerProps {
  dataId?: number
  props?: Record<string, any>
  styles?: CSSProperties
}

// type DropType = 'MetarailComponents' | 'moveComponents'

const Container = (props: PropsWithChildren<ContainerProps>) => {
  const { children, dataId, styles = {}, ...restProps } = props
  const divRef = useRef<any>()

  const accept = ['Button', 'Container', 'Modal', 'Video', 'Image', 'Table', 'Form']

  const [{ isSelfDragging }, drag] = useBaseDrag('Container', dataId!, { dragType: 'move' })
  const [{ isOverCurrent }, drop] = useComponentDrop(accept, dataId!)
  console.log('isOverCurrent', isOverCurrent, 'Container')
  console.log('isSelfDragging', isSelfDragging, 'Container')

  useEffect(() => {
    drag(divRef)
    drop(divRef)
  }, [divRef.current])

  return (
    <Transformer
      ref={divRef}
      isDraging={isSelfDragging}
      dataId={dataId!}
      styles={styles}
      {...restProps}
      isOverCurrent={isOverCurrent}
      className="p-[5px] m-[5px] min-h-[100px]"
    >
      {children}
    </Transformer>
  )
}

const Prod = forwardRef((props: PropsWithChildren<ContainerProps>, ref) => {
  const { children, dataId, styles = {}, ...restProps } = props
  useImperativeHandle(ref, () => ({}))
  return (
    <Transformer.Prod dataId={dataId!} styles={styles} {...restProps} className="p-[5px] m-[5px] min-h-[300px]">
      {children}
    </Transformer.Prod>
  )
})

type ContainerType = typeof Container & {
  Prod: typeof Prod
  displayName: string
}
const container = Container as ContainerType

container.Prod = Prod

Container.displayName = 'Container'

export default container
