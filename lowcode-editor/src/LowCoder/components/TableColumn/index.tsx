import { FC, forwardRef, useRef } from 'react'

interface TableColumnProps {
  dataId?: string
  name?: string
  dataIndex?: string | number
  key?: string
}
const TableColumn: FC<TableColumnProps> = () => {
  return <></>
}

type TableColumnType = typeof TableColumn & {
  Prod: typeof TableColumn
  displayName: string
}

const tableColumn = TableColumn as TableColumnType

tableColumn.Prod = forwardRef((props, _) => <TableColumn {...props}></TableColumn>)

tableColumn.displayName = 'TableColumn'

export default tableColumn
