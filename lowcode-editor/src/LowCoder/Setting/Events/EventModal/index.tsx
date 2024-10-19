import { Modal } from 'antd'
import { Setter } from '../../types'
import ClickAction from './ClickAction'
import { useComponentsStore } from '../../../stores'
import { useState } from 'react'

interface EventModalProps {
  eventSetter: Setter | null
  open: boolean
  setOpen: (open: boolean) => void
}

function EventModal({ eventSetter, open, setOpen }: EventModalProps) {
  const { name } = eventSetter ?? {}
  const { selectedComponent, updateComponentProps } = useComponentsStore()
  const [values, setValues] = useState<Record<string, any>>(eventSetter ?? {})

  const handleOk = () => {
    setOpen?.(false)
    const eventName = Object.keys(values)[0]
    const { props } = selectedComponent
    const actions = props?.[eventName]?.actions || []
    const otherActions = actions?.filter((action: Record<string, any>) => action.type !== values[eventName]?.type) || []
    const newActions = [...otherActions, { ...values[eventName] }]
    updateComponentProps(selectedComponent.id, {
      ...selectedComponent.props,
      [eventName]: { actions: newActions },
    })
  }

  const handleCancel = () => {
    // setActiveItem(null)
    setOpen?.(false)
  }

  const handleChange = (values: Record<string, any>) => {
    setValues(values)
    console.log('values', values)
  }

  return (
    <Modal
      title="添加事件"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
      destroyOnClose
    >
      {name === 'onClick' && (
        <ClickAction onChange={handleChange} item={eventSetter!} selectedComponent={selectedComponent} />
      )}
    </Modal>
  )
}

export default EventModal
