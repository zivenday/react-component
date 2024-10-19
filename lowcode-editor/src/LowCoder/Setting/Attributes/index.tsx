import { FC, useEffect } from 'react'
import { Form } from 'antd'
import { renderAttributesItem } from '../../utils'
import { Setter } from '../types'
import { useLastest } from '../../hooks'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

interface AttributesProps {
  configs: Setter[]
  defaultValues?: Record<string, any>
  onValuesChange?: (changedFields: any, allFields: any) => void
  curComponentId?: number
}
const Attributes: FC<AttributesProps> = (props) => {
  const { configs, defaultValues, onValuesChange, curComponentId } = props
  return <>{configs && renderSetter({ configs, onValuesChange, defaultValues, curComponentId })}</>
}

const renderSetter = (props: AttributesProps) => {
  const { configs, onValuesChange, defaultValues, curComponentId } = props
  const [form] = Form.useForm()
  const defaultValuesRef = useLastest<any>(defaultValues)

  const handleValuesChange = (changedFields: any, allFields: any) => {
    onValuesChange?.(changedFields, allFields)
  }
  useEffect(() => {
    form.resetFields()
    if (curComponentId) {
      form.setFieldsValue(defaultValuesRef.current)
    }
  }, [curComponentId])
  return (
    <Form layout="horizontal" form={form} onValuesChange={handleValuesChange}>
      {configs.map((c) => (
        <Form.Item label={c.label} name={c.name} key={c.name}>
          {renderAttributesItem(c)}
        </Form.Item>
      ))}
    </Form>
  )
}
export default Attributes
