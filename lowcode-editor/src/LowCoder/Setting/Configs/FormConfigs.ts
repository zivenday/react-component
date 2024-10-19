import { ComponentConfig, SetterKeys, SetterNames } from '../types'

const FormConfig: ComponentConfig = {
  name: 'Form',
  [SetterKeys.Attributes]: {
    name: SetterNames.Attributes,
    setter: [
      //   {
    ],
  },
  [SetterKeys.Style]: {
    name: SetterNames.Style,
    setter: [
      //
    ],
  },
  [SetterKeys.Event]: {
    name: SetterNames.Event,
    methods: [
      {
        name: 'onFinish',
        label: '表单提交事件',
      },
    ],
    setter: [
      {
        name: 'onClick',
        label: '点击事件',
      },
      {
        name: 'onLongPress',
        label: '长按事件',
        type: 'event',
      },
    ],
  },
}

export default FormConfig
