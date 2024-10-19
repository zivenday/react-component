import { CSSProperties, FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Table as AntdTable } from 'antd'
import Transformer from '../Transformer'
import { useBaseDrag, useComponentDrop } from '../../hooks'
import React from 'react'
import axios from 'axios'
interface TableProps {
  dataId?: number
  styles?: CSSProperties
  url?: string
}
const Table: FC<PropsWithChildren<TableProps>> = (props) => {
  const { children, dataId, styles, url } = props
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const accept = ['TableColumn']

  const [{ isOverCurrent }, drop] = useComponentDrop(accept, dataId!, [], (item) => {
    if (item.name === 'TableColumn') {
      const newKey = 'col_' + performance.now()
      item.props = item.props ?? {}
      item.props.dataIndex = item.props.dataIndex ?? newKey
      item.props.title = item.props.title ?? '标题'
    }
  })
  const getData = async () => {
    if (url) {
      setLoading(true)
      const { data } = await axios.get(url)
      setLoading(false)
      if (data) {
        setDataSource(data)
      } else {
        setDataSource([])
      }
    }
  }
  const [{ isSelfDragging }, drag] = useBaseDrag('Table', dataId!, { dragType: 'move' })
  const columns = React.Children.map(children, (child: any) => {
    const { title, dataIndex, dataId } = child?.props || {}
    return {
      title: <div data-id={dataId}>{title}</div>,
      dataIndex,
      key: dataIndex,
    }
  })
  useEffect(() => {
    drop(divRef)
    drag(divRef)
  }, [divRef.current])

  useEffect(() => {
    url && getData()
  }, [url])

  return (
    <Transformer
      ref={divRef}
      isDraging={isSelfDragging}
      dataId={dataId!}
      styles={styles}
      isOverCurrent={isOverCurrent}
      className="p-[5px] m-[5px] min-h-[300px]"
    >
      <AntdTable loading={loading} dataSource={dataSource} columns={columns} pagination={false}></AntdTable>
    </Transformer>
  )
}

const Prod: FC<PropsWithChildren<TableProps>> = (props) => {
  const { children, dataId, styles, url } = props
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    if (url) {
      setLoading(true)
      const { data } = await axios.get(url)
      setLoading(false)
      if (data) {
        setDataSource(data)
      } else {
        setDataSource([])
      }
    }
  }
  useEffect(() => {
    url && getData()
  }, [url])

  const columns = React.Children.map(children, (child: any) => {
    const { title, dataIndex, dataId } = child?.props || {}
    return {
      title: <div data-id={dataId}>{title}</div>,
      dataIndex,
      key: dataIndex,
    }
  })
  return (
    <Transformer.Prod dataId={dataId!} styles={styles} className="p-[5px] m-[5px] min-h-[300px]">
      <AntdTable loading={loading} dataSource={dataSource} columns={columns} pagination={false}></AntdTable>
    </Transformer.Prod>
  )
}

type TableType = typeof Table & {
  Prod: typeof Prod
  displayName: string
}
const table = Table as TableType

table.Prod = Prod

table.displayName = 'Table'

export default table
