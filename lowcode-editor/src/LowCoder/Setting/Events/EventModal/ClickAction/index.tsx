import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Setter } from '../../../types'
import { Input, Segmented, Select } from 'antd'
import { Component, Actions } from '../../../../stores'
import MonacoEditor from '../../../../base/MonacoEditor'
import editconf from './editconf'
import RefFunctionAction from './RefFunctionAction'
import ActionWrap from './ActionWrap'

const eventTypes = [
  { label: '弹出信息', value: 'showMessage' },
  { label: '点击跳转', value: 'navigateTo' },
  { label: '组件方法', value: 'callRefFunction' },
  { label: '自定义脚本', value: 'customScript' },
]

type ClickActionProps = {
  item: Setter
  selectedComponent: Component
  onChange?: (values: Record<string, any>) => void
}

const ClickAction: FC<ClickActionProps> = (
  { item, onChange } /// <reference path="" />
) => {
  const { action } = item
  const [type, setType] = useState(action?.type || 'showMessage')
  const [content, setContent] = useState(action?.value || '')

  const handleChange = (type: string, item?: Setter) => {
    setType(type)
    setContent('')
    onChange?.({ onClick: { type, value: '' } })
  }

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement> | { target: any }) => {
    setContent(e.target.value)
    onChange?.({ onClick: { type, value: e.target.value } })
  }

  const handleCompFunction = (data: { componentId: string; method: string }) => {
    console.log('data', data)
    onChange?.({ onClick: { type, value: data } })
  }

  useEffect(() => {
    onChange?.({ onClick: { type, value: content } })
  }, [])
  return (
    <div>
      <Segmented
        block
        options={eventTypes}
        value={type}
        onChange={(type) => handleChange(type, item)}
        className="mb-2 z-[1000]"
      />
      {type === 'navigateTo' && (
        <ActionWrap label="跳转路径">
          <Input placeholder="请输入跳转路径" onChange={handleChangeContent} value={content} />
        </ActionWrap>
      )}
      {type === 'showMessage' && (
        <ActionWrap label="信息内容">
          <Input placeholder="请输入信息内容" onChange={handleChangeContent} value={content} />
        </ActionWrap>
      )}
      {type === 'callRefFunction' && <RefFunctionAction values={content} onChange={handleCompFunction} />}
      {type === 'customScript' && (
        <ActionWrap label="自定义脚本" className="!items-start">
          <MonacoEditor value={content} {...editconf} onChange={(v) => handleChangeContent({ target: { value: v } })} />
        </ActionWrap>
      )}
    </div>
  )
}

export default ClickAction
