import { CSSProperties, forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Component } from '../../stores'
import Transformer from '../Transformer'
import { Modal as AntdModal, type ModalProps as AntdModalProps } from 'antd'
import { useBaseDrag, useComponentDrop } from '../../hooks'

interface ModalProps extends AntdModalProps {
  dataId?: number
  props?: Record<string, any>
}

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { children, dataId } = props

  const divRef = useRef<any>()

  const accept = ['Button', 'Container', 'Video', 'Image', 'Table', 'Form']
  const [{ isOverCurrent }, drop] = useComponentDrop(accept, dataId!)
  const [{ isSelfDragging }, drag] = useBaseDrag('Modal', dataId!, { dragType: 'move' })

  useEffect(() => {
    drop(divRef)
    drag(divRef)
  }, [divRef.current])

  return (
    <Transformer
      ref={divRef}
      isDraging={isSelfDragging}
      dataId={dataId!}
      className="p-[5px] m-[5px] min-h-[300px]"
      isOverCurrent={isOverCurrent}
    >
      {children}
    </Transformer>
  )
}

const Prod = forwardRef<Record<string, any>, ModalProps>((props: PropsWithChildren<ModalProps>, ref) => {
  const { children, dataId, style, ...restProps } = props
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
    hide: () => {
      setVisible(false)
    },
  }))

  return (
    <AntdModal
      style={{ ...style }}
      {...restProps}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={() => setVisible(false)}
    >
      {children}
    </AntdModal>
  )
})

type ModalType = typeof Modal & {
  Prod: typeof Prod
  displayName: string
}
const modal = Modal as ModalType

modal.Prod = Prod

modal.displayName = 'Modal'

export default modal
