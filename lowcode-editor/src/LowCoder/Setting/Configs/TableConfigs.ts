import { ComponentConfig, SetterKeys, SetterNames } from '../types'

const ContainerConfig: ComponentConfig = {
  name: 'Container',
  [SetterKeys.Attributes]: {
    name: SetterNames.Attributes,
    setter: [
      {
        name: 'url',
        label: '请求地址',
        type: 'input',
      },
      //   {
      //     name: 'hidden',
      //     label: '是否隐藏',
      //     type: 'select',
      //     options: [
      //       { label: '是', value: true },
      //       { label: '否', value: false },
      //     ],
      //   },
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
