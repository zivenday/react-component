import { FC, useState } from 'react'
import { ComponentTypes, Setter, SetterKeys } from '../types'
import { useComponentsStore } from '../../stores'
import configs from '../configs'
import { Button, Collapse, CollapseProps } from 'antd'
import EventModal from './EventModal'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface EventsProps {
  configs: Setter[]
}

interface ClickChildrenProps {
  action: Record<string, any>
  index: number
  onEdit?: (action: Record<string, any>) => void
  onDelete?: (action: Record<string, any>) => void
}

const ClickChildren: FC<ClickChildrenProps> = ({ action, index, onEdit, onDelete }) => {
  return (
    <div className="p-2 border-[#e8e8e8] border-[1px] border-solid  flex justify-between items-center">
      {`事件${index + 1}：${action.type}`}
      <div className="flex items-center justify-between gap-2">
        <EditOutlined
          onClick={() => {
            onEdit?.(action)
          }}
        />
        <DeleteOutlined
          onClick={() => {
            onDelete?.(action)
          }}
        />
      </div>
    </div>
  )
}

const Events: FC<EventsProps> = () => {
  const { updateComponentProps, selectedComponent } = useComponentsStore()
  const { name, props } = selectedComponent
  const [activeItem, setActiveItem] = useState<Setter | null>(null)
  const [open, setOpen] = useState(false)

  const config = configs[name as ComponentTypes]
  const eventSetters = config?.[SetterKeys.Event]?.setter

  const items: CollapseProps['items'] = eventSetters?.map((item) => {
    // const Children = item.children
    // const { onClick } = item
    const actions = props?.[item.name]?.actions || []
    console.log('actions', actions)
    const handleAddEvent = () => {
      setActiveItem(item)
      setOpen(true)
    }
    const handleEditAction = (action: Record<string, any>) => {
      setActiveItem({ ...item, action })
      setOpen(true)
    }
    const handleDeleteAction = (action: Record<string, any>) => {
      const newActions = actions.filter((_action: Record<string, any>) => _action.type !== action.type)
      updateComponentProps(selectedComponent.id, {
        [item.name]: {
          actions: newActions,
        },
      })
    }
    return {
      key: item.name,
      label: item.label,
      children: actions?.map((action: Record<string, any>, index: number) => (
        <ClickChildren
          action={action}
          key={action.type}
          index={index}
          onEdit={handleEditAction}
          onDelete={handleDeleteAction}
        />
      )),
      extra: (
        <Button type="primary" onClick={handleAddEvent}>
          添加事件
        </Button>
      ),
    }
  })

  return (
    <div>
      <Collapse items={items} defaultActiveKey={eventSetters?.map((e) => e.name)} />
      <EventModal eventSetter={activeItem} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Events
