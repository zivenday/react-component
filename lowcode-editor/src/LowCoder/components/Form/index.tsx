import {
  CSSProperties,
  FC,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Form as AntdForm, Input, Select } from 'antd'
import Transformer from '../Transformer'
import { useBaseDrag, useComponentDrop } from '../../hooks'
import React from 'react'
import axios from 'axios'
import { useForm } from 'antd/es/form/Form'
interface FormProps {
  dataId?: number
  styles?: CSSProperties
}

const renderItem = (child: any) => {
  const { tagName, options } = child?.props || {}
  if (tagName === 'Input') {
    return <Input />
  } else if (tagName === 'Select') {
    return <Select options={options} />
  } else {
    return <></>
  }
}

const renderChildren = (children: any, isProd?: boolean) => {
  return React.Children.map(children, (child: any) => {
    const { dataId, name, label, required } = child?.props || {}

    return (
      <div data-id={dataId} key={dataId}>
        <AntdForm.Item
          name={name}
          label={label}
          className={`${!isProd ? 'pointer-events-none' : ''}`}
          rules={[{ required: required, message: '请输入' + label }]}
        >
          {renderItem(child)}
        </AntdForm.Item>
      </div>
    )
  })
}

const Form: FC<PropsWithChildren<FormProps>> = (props) => {
  const { children, dataId, styles } = props
  const divRef = useRef<HTMLDivElement>(null)
  const accept = ['FormItem']

  const [{ isOverCurrent }, drop] = useComponentDrop(accept, dataId!, [], (item) => {
    if (item.dragType !== 'move' && item.name === 'FormItem') {
      const newKey = 'form_item_' + item.id
      item.props = item.props ?? {}
      item.props.name = item.props.name ?? newKey
      item.props.label = item.props.label ?? '名称'
      item.props.tagName = item.props.tagName ?? 'Input'
    }
  })

  const [{ isSelfDragging }, drag] = useBaseDrag('Form', dataId!, { dragType: 'move' })

  useEffect(() => {
    if (divRef.current) {
      drop(divRef)
      drag(divRef)
    }
  }, [divRef.current])

  return (
    <Transformer
      ref={divRef}
      isDraging={isSelfDragging}
      dataId={dataId!}
      styles={styles}
      isOverCurrent={isOverCurrent}
      className="p-[5px] m-[5px] min-h-[300px]"
    >
      <AntdForm>{renderChildren(children)}</AntdForm>
    </Transformer>
  )
}

const Prod: FC<PropsWithChildren<FormProps>> = forwardRef((props, ref) => {
  const { children } = props

  const onFinish = (values: any) => {
    console.log('onFinish', values, children)
  }
  const [form] = useForm()

  useImperativeHandle(
    ref,
    () => {
      return {
        onFinish: () => {
          form.submit()
        },
        getValues: form.getFieldsValue,
      }
    },
    [form]
  )
  const onValuesChange = (changedFields: any, allFields: any) => {
    // console.log('onValuesChange', changedFields, allFields)
  }
  return (
    <AntdForm form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
      {renderChildren(children, true)}
    </AntdForm>
  )
})

type FormType = typeof Form & {
  Prod: typeof Prod
  displayName: string
}
const form = Form as FormType

form.Prod = Prod

form.displayName = 'Form'

export default form
