import ReactDOM from 'react-dom'
import React, { FC, useRef } from 'react'
import { Component, useComponentsStore, getComponentById } from '../stores'
import { Page, Container, Video, Image, Button, Modal, Table, TableColumn, Form, FormItem } from '../components'
import { message } from 'antd'

const Preview: FC<{ show: boolean }> = ({ show }) => {
  const refs = useRef<Record<string, any>>({})
  const { components } = useComponentsStore()
  const handleClick = (type: string, value: any, component: Component, args: any[]) => {
    // console.log(refs)
    if (type === 'showMessage') {
      message.info(value)
    }
    if (type === 'navigateTo') {
      window.location.href = value
    }
    if (type === 'callRefFunction') {
      const func = refs.current?.[value.componentId]?.[value.method]
      if (func) {
        func(component, args)
      } else {
        console.error('组件方法不存在')
      }
    }
    if (type === 'customScript') {
      const newFunction = new Function('context', value)
      newFunction(component)
    }
  }

  const handleEvent = (component: Component) => {
    const { props } = component
    const actions = props?.onClick?.actions || []
    const eventProps: Record<string, any> = {}
    eventProps.onClick = (...args: any[]) => {
      actions.forEach((action: Record<string, any>) => {
        const { type, value } = action
        handleClick(type, value, component, args)
      })
    }

    return eventProps
  }
  const renderComponent = (component: Component) => {
    let _Component = null
    let _props = { ...component.props }
    let _styles = { ...component.styles }
    if (component.name === 'Page') {
      _Component = Page.Prod
    }
    if (component.name === 'Container') {
      _Component = Container.Prod
    }
    if (component.name === 'Video') {
      _Component = Video.Prod
    }
    if (component.name === 'Image') {
      _Component = Image.Prod
    }
    if (component.name === 'Button') {
      _Component = Button.Prod
    }
    if (component.name === 'Modal') {
      _Component = Modal.Prod
    }
    if (component.name === 'Table') {
      _Component = Table.Prod
    }
    if (component.name === 'TableColumn') {
      _Component = TableColumn.Prod
    }
    if (component.name === 'Form') {
      _Component = Form.Prod
    }
    if (component.name === 'FormItem') {
      _Component = FormItem.Prod
    }
    if (!_Component) return <></>
    return (
      <_Component
        dataId={component.id}
        ref={(dom: any) => {
          if (dom) {
            refs.current[component.id] = dom
          }
        }}
        key={component.id.toString()}
        {..._props}
        {...handleEvent(component)}
        styles={{ ..._styles }}
      >
        {component?.children?.map(renderComponent)}
      </_Component>
    )
  }

  return show
    ? ReactDOM.createPortal(
        <div className="z-[9] absolute edit-preview bg-[#fff] w-[100%] h-[calc(100vh-60px)] top-[60px] left-0 box-content overflow-y-auto">
          {components.map(renderComponent)}
        </div>,
        document.body
      )
    : null
}

export default Preview
