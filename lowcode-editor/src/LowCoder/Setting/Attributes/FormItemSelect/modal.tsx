import { Button, Form, Input, Modal } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useComponentsStore } from '../../../stores'
import { generateUUID } from '../../../utils'

interface modalProps {
  open: boolean
  onCancel: () => void
  onOk: () => void
}
const modal: FC<modalProps> = (props) => {
  const { open, onCancel, onOk } = props
  const { updateComponentProps, selectedComponent } = useComponentsStore()

  const [options, setOptions] = useState(selectedComponent.props?.options || [])
  const [form] = Form.useForm()

  useEffect(() => {
    form?.setFieldsValue({
      options: options,
    })
  }, [options, form])

  const handleCancel = () => {
    onCancel?.()
  }
  const handleOk = () => {
    updateComponentProps(selectedComponent.id, {
      ...selectedComponent.props,
      options: options,
    })

    onOk?.()
  }
  return (
    <Modal open={open} onCancel={handleCancel} onOk={handleOk} title="配置选项" destroyOnClose>
      <Form
        form={form}
        onValuesChange={(changedFields, allFields) => {
          console.log(allFields)
        }}
      >
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                const uuid = options[index]?.uuid || generateUUID()
                return (
                  <div key={uuid} className="flex gap-2">
                    <Form.Item label="label">
                      <Input
                        value={options?.[index]?.label}
                        onChange={(e) => {
                          options[index].label = e.target.value
                          setOptions(options)
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="value">
                      <Input
                        value={options?.[index]?.value}
                        onChange={(e) => {
                          options[index].value = e.target.value
                          setOptions(options)
                        }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button
                        onClick={() => {
                          const newOptions = options.filter((option, _index: number) => index !== _index)
                          console.log(newOptions)
                          setOptions(newOptions)
                        }}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                )
              })}
              <Button
                type="primary"
                onClick={() => {
                  const _options = options || []
                  const newOptions = [..._options, {}]
                  console.log(newOptions)
                  setOptions([
                    ..._options,
                    {
                      uuid: generateUUID(),
                    },
                  ])
                }}
              >
                添加
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}

export default modal
