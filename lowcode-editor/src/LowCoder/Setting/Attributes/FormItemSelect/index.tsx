import { Button, Input, Select } from 'antd'
import { BaseOptionType, DefaultOptionType } from 'antd/es/select'
import { FC, useState } from 'react'
import Modal from './modal'
import { useComponentsStore } from '../../../stores'
export type optionsType = {
  label: string
  value: string
}
type valueType = {
  type?: 'Select' | 'Input'
  options?: optionsType[]
}

interface FormItemSelectProps {
  options?: optionsType[]
}

const FormItemSelect: FC<FormItemSelectProps> = (configs) => {
  const { updateComponentProps, selectedComponent } = useComponentsStore()
  const { options = [] } = configs

  const [tagName, setTagName] = useState(selectedComponent.props?.tagName)
  const [open, setOpen] = useState(false)
  const handleAddOption = () => {
    setOpen(true)
  }
  const handleChangeTagName = (tagName: string) => {
    setTagName(tagName)
    updateComponentProps(selectedComponent.id, { tagName, options: undefined })
  }
  const onCancel = () => {
    setOpen(false)
  }
  const onOk = () => {
    setOpen(false)
  }
  const onValuesChange = (changedFields: any, allFields: any) => {
    // console.log(changedFields, allFields)
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        <Select value={tagName} onChange={handleChangeTagName} options={options}></Select>
        {selectedComponent?.props?.options?.length > 0 &&
          tagName === 'Select' &&
          selectedComponent?.props?.options?.map((option: optionsType) => {
            return (
              <div key={option.value} className="flex items-center gap-2">
                <div>{option.label}</div>|<div>{option.value}</div>
              </div>
            )
          })}
        {tagName === 'Select' && (
          <Button type="primary" onClick={handleAddOption}>
            {!options ? '添加选项' : '编辑选项'}
          </Button>
        )}
      </div>
      <Modal open={open} onCancel={onCancel} onOk={onOk}></Modal>
    </>
  )
}

export default FormItemSelect
