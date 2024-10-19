import { ComponentConfig, SetterKeys, SetterNames } from '../types'

const ContainerConfig: ComponentConfig = {
  name: 'Container',
  [SetterKeys.Attributes]: {
    name: SetterNames.Attributes,
    setter: [
      {
        name: 'title',
        label: '名称',
        type: 'input',
      },
      {
        name: 'dataIndex',
        label: 'DataIndex',
        type: 'input',
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
