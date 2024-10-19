import * as Components from '../components'

// 获取所有导出的组件类型

export type ComponentTypes = keyof typeof Components.default

// Setter 相关类型

export enum SetterKeys {
  Attributes = 'attributesSetter',
  Style = 'styleSetter',
  Event = 'eventSetter',
}

export enum SetterNames {
  Attributes = '属性',
  Style = '外观',
  Event = '事件',
}

export type SetterKeysType = keyof typeof SetterKeys

type EnumKeys<T> = keyof {
  [K in keyof T as T[K] extends string ? K : never]: any
}

type MapEnums<T extends Record<string, string>, U extends Record<string, string | number>> = {
  -readonly [K in EnumKeys<T> as T[K]]: U[K & keyof U]
}

export type SetterMap = MapEnums<typeof SetterKeys, typeof SetterNames>

// Setter 类型定义
export type Setter = {
  name: string
  label: string
  type?: string
  [key: string]: any
}

// 配置详情类型
type ConfigDetail = {
  [K in keyof SetterMap]?: {
    name: SetterMap[K]
    methods?: Record<string, any>[]
    setter?: Setter[]
  }
}

// 组件配置类型
// 组件配置类型
export type ComponentConfig = {
  name: ComponentTypes
} & ConfigDetail

// 所有组件的配置类型
export type Configs = {
  [K in ComponentTypes]?: ComponentConfig
}
