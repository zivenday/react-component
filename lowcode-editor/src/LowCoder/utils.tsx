import { Input, InputNumber, Select } from 'antd'
import MonacoEditor from './base/MonacoEditor'
import StyleEditorConfigs from './Setting/Styles/StyleEditorConfigs'
import parse from 'style-to-object'
import { Component } from './stores'
import FormItemSelect from './Setting/Attributes/FormItemSelect'

export const renderBaseItem = (config: Record<string, any>) => {
  const { type, options } = config
  if (type === 'input') {
    return <Input />
  } else if (type === 'select') {
    return <Select options={options} />
  } else if (type === 'inputNumber') {
    return <InputNumber />
  } else if (type === 'selectConfigPanel') {
    return <FormItemSelect options={options} />
  } else {
    return null
  }
}

export const renderStyleItem = (config: Record<string, any>) => {
  const { type, options } = config
  const baseItem = renderBaseItem(config)
  if (baseItem) return baseItem
  if (type === 'css-editor') {
    return <MonacoEditor {...StyleEditorConfigs} />
  } else {
    return null
  }
}

export const renderAttributesItem = (config: Record<string, any>) => {
  // const { type, options } = config
  const baseItem = renderBaseItem(config)
  // console.log('baseItem', baseItem)
  if (baseItem) return baseItem
  return null
}

// 去除 CSS 注释
export const removeCSSComments = (css: string) => {
  if (!css) return css
  // 去除 CSS 注释
  css = css.replace(/\/\*[\s\S]*?\*\//g, '')

  // 去除空行
  css = css.replace(/^\s*[\r\n]/gm, '')

  return css.trim()
}

// 去除外层大括号
export const removeOuterBraces = (code: string) => {
  return code.replace(/^[^{]*{/, '').replace(/}[^}]*$/, '')
}

// 将 CSS 转换为 Style
export const transformCss2Style = (css: string) => {
  try {
    const noComments = removeCSSComments(css)
    const cleanedCss = removeOuterBraces(noComments)
    const cssObj = parse(cleanedCss)
    return cssObj
  } catch (error) {
    console.error('error', error)
    return null
  }
}

//css转驼峰
export const transformCss2CamelCase = (cssObj: Record<string, string>) => {
  const camelCaseObj: Record<string, string> = {}
  for (const key in cssObj) {
    const camelCaseKey = key.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    camelCaseObj[camelCaseKey] = cssObj[key]
  }
  return camelCaseObj
}

// 驼峰转中位线css
export const transformCamelCase2Css = (camelCaseObj: Record<string, string>) => {
  const cssObj: Record<string, string> = {}
  for (const key in camelCaseObj) {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    cssObj[cssKey] = camelCaseObj[key]
  }
  return cssObj
}

export const debounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout | null = null
  return function (...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export const toJsonString = (obj: Record<string, any> | undefined) => {
  return JSON.stringify(obj || {})
}

export const createId4Component = (component: Component) => {
  return {
    ...component,
    id: performance.now(),
  }
}

export const hasClass = (el: HTMLElement, classNames: string | string[]) => {
  if (Array.isArray(classNames)) {
    return classNames.some((className) => el.classList.contains(className))
  } else {
    return el.classList.contains(classNames)
  }
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
