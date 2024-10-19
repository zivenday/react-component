import ContainerConfigs from './Configs/ContainerConfigs'
import ButtonConfigs from './Configs/ButtonConfigs'
import { Configs } from './types'
import ModalConfigs from './Configs/ModalConfigs'
import TableConfigs from './Configs/TableConfigs'
import TableColumnConfigs from './Configs/TableColumnConfigs'
import FormItemConfigs from './Configs/FormItemConfigs'
import FormConfigs from './Configs/FormConfigs'

const configs: Configs = {
  Page: {
    name: 'Page',
  },
  Container: ContainerConfigs,

  Image: {
    name: 'Image',
  },
  Video: {
    name: 'Video',
  },
  Button: ButtonConfigs,
  Modal: ModalConfigs,
  Table: TableConfigs,
  TableColumn: TableColumnConfigs,
  FormItem: FormItemConfigs,
  Form: FormConfigs,
}

export default configs
