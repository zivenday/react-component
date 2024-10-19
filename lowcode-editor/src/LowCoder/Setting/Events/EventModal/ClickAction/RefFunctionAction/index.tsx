import { Select, Tree, TreeSelect } from 'antd'
import { useComponentsStore, getComponentById } from '../../../../../stores'
import { useEffect, useState } from 'react'
import configs from '../../../../configs'
import { Configs, SetterKeys } from '../../../../types'
import ActionWrap from '../ActionWrap'

type Props = {
  values: { componentId: string; method: string }
  onChange: ({ componentId, method }: { componentId: string; method: string }) => void
}
const RefFunction = (props: Props) => {
  const { onChange, values } = props || {}
  const { components } = useComponentsStore()
  const [value, setValue] = useState(values?.componentId)
  const [methods, setMethods] = useState<Record<string, any>[]>([])
  const [method, setMethod] = useState(values?.method)
  const handleChangeComponent = (value: string) => {
    setValue(value)
    setMethod('')
    onChange?.({
      componentId: value,
      method: '',
    })
  }
  const handleMethodChange = (_value: string) => {
    setMethod(_value)
    onChange?.({
      componentId: value,
      method: _value,
    })
  }
  useEffect(() => {
    const component = getComponentById(value, components)
    const config = configs[component?.name as keyof Configs]
    setMethods(config?.[SetterKeys.Event]?.methods || [])
    console.log('config', config, value)
  }, [value])

  return (
    <div>
      <ActionWrap label="组件">
        <TreeSelect
          value={value}
          placeholder="请选择组件"
          style={{ width: 300 }}
          treeData={components}
          fieldNames={{ children: 'children', label: 'name', value: 'id' }}
          onChange={handleChangeComponent}
        ></TreeSelect>
      </ActionWrap>
      {methods.length > 0 && (
        <ActionWrap label="组件方法">
          <Select value={method} placeholder="请选择方法" style={{ width: 300 }} onChange={handleMethodChange}>
            {methods.map((method) => (
              <Select.Option key={method.name} value={method.name}>
                {method.label + '(' + method.name + ')'}
              </Select.Option>
            ))}
          </Select>
        </ActionWrap>
      )}
    </div>
  )
}

export default RefFunction
