import { FC, forwardRef } from 'react'

interface FormItemProps {
  dataId?: string
  name?: string
  dataIndex?: string | number
  key?: string
}
const FormItem: FC<FormItemProps> = () => {
  return <></>
}

type FormItemType = typeof FormItem & {
  Prod: typeof FormItem
  displayName: string
}

const formItem = FormItem as FormItemType

formItem.Prod = forwardRef((props, _) => <FormItem {...props}></FormItem>)

formItem.displayName = 'FormItem'

export default formItem
