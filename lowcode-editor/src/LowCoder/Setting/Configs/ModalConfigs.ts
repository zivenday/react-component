import { ComponentConfig, SetterKeys, SetterNames } from '../types'

const ContainerConfig: ComponentConfig = {
  name: 'Modal',
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
        name: 'show',
        label: '显示',
      },
      {
        name: 'hide',
        label: '隐藏',
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

export default ContainerConfig
