import { FC, useEffect, useRef } from 'react'
import { Form } from 'antd'
import { renderStyleItem, transformCamelCase2Css, transformCss2CamelCase, transformCss2Style } from '../../utils'
import { Setter } from '../types'
import { useLastest } from '../../hooks'

interface StylesProps {
  configs: Setter[]
  defaultValues?: Record<string, any>
  onValuesChange?: (changedFields: any, allFields: any, replace?: boolean) => void
  curComponentId?: number
}
const Styles: FC<StylesProps> = (props) => {
  const { configs, defaultValues, onValuesChange, curComponentId } = props
  return <>{configs && renderSetter({ configs, onValuesChange, defaultValues, curComponentId })}</>
}

// ... 现有代码 ...

const transformStyle2Css = (style: Record<string, string>) => {
  let cssStr = `.comp {
  `
  for (const key in style) {
    if (style[key]) {
      if (key === 'min-height' && !style[key]?.toString().endsWith('px')) {
        cssStr += `${key}: ${style[key]}px;
        `
      } else {
        cssStr += `${key}: ${style[key]};
        `
      }
    }
  }
  cssStr += `
  }`
  return cssStr
}

const renderSetter = (props: StylesProps) => {
  const { configs, onValuesChange, defaultValues, curComponentId } = props
  const [form] = Form.useForm()
  const ref = useRef<any>(null)
  const defaultValuesRef = useLastest<any>(defaultValues)
  const handleValuesChange = (changedFields: any, allFields: any) => {
    const changedFieldsStr = JSON.stringify(changedFields)
    if (ref.current !== changedFieldsStr) {
      ref.current = changedFieldsStr
      const values = form.getFieldsValue()
      const { cssEditorStyle, ...restValues } = values
      console.log('restValues', cssEditorStyle, restValues)
      if (changedFields.cssEditorStyle) {
        const cssObj = transformCss2Style(changedFields.cssEditorStyle) || {}
        // if (cssObj) {
        const camelCaseObj = transformCss2CamelCase(cssObj)
        // console.log('camelCaseObj', camelCaseObj)
        onValuesChange?.({ ...restValues, ...camelCaseObj }, allFields, true)
      } else {
        // const cssEditorStyle = allFields.cssEditorStyle

        // const cssObj = transformCss2Style(cssEditorStyle) || {}
        // const camelCaseObj = transformCss2CamelCase(cssObj)
        // const mergeFields: Record<string, any> = {}
        // Object.keys(camelCaseObj).forEach((key) => {
        //   if (changedFields[key]) {
        //     mergeFields[key] = camelCaseObj[key]
        //   }
        // })
        onValuesChange?.(changedFields, allFields)
      }
    }
  }
  useEffect(() => {
    form?.resetFields()
    const initValues = defaultValuesRef.current || {}
    if (curComponentId) {
      const camelCaseObj = transformCamelCase2Css(defaultValuesRef.current)

      const cssEditorStyle = transformStyle2Css(camelCaseObj)
      console.log('defaultValues', defaultValues, cssEditorStyle)
      form.setFieldsValue({ ...initValues, cssEditorStyle })
    }
  }, [curComponentId])
  return (
    <Form layout="horizontal" form={form} onValuesChange={handleValuesChange}>
      {configs.map((c) => (
        <Form.Item label={c.label} name={c.name} key={c.name}>
          {renderStyleItem(c)}
        </Form.Item>
      ))}
    </Form>
  )
}
export default Styles
