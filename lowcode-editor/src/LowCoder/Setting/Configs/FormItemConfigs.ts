import { ComponentConfig, SetterKeys, SetterNames } from '../types'

const ContainerConfig: ComponentConfig = {
  name: 'Container',
  [SetterKeys.Attributes]: {
    name: SetterNames.Attributes,
    setter: [
      {
        name: 'label',
        label: '名称',
        type: 'input',
      },
      {
        name: 'name',
        label: '属性名',
        type: 'input',
      },
      {
        name: 'tagName',
        label: '组件',
        type: 'selectConfigPanel',
        options: [
          { label: 'Input(输入框)', value: 'Input' },
          { label: 'Select(下拉框)', value: 'Select' },
        ],
      },
      {
        name: 'required',
        label: '是否必填',
        type: 'select',
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
    ],
  },
  [SetterKeys.Style]: {
    name: SetterNames.Style,
    setter: [
      //   {
      //     name: 'minHeight',
      //     label: '最小高度',
      //     type: 'inputNumber',
      //   },
      //   {
      //     name: 'cssEditorStyle',
      //     label: '',
      //     type: 'css-editor',
      //   },
    ],
  },
  [SetterKeys.Event]: {
    name: SetterNames.Event,
    setter: [
      //   {
      //     name: 'onClick',
      //     label: '点击事件',
      //   },
      //   {
      //     name: 'onLongPress',
      //     label: '长按事件',
      //     type: 'event',
      //   },
    ],
  },
}

export default ContainerConfig
