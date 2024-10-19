import { FC } from 'react'
import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'
// import type { TreeDataNode, TreeProps } from 'antd'
import { useComponentsStore } from '../../stores'

const OutLine: FC = () => {
  const { components, setSelectedComponentId } = useComponentsStore()
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info)
    const { node } = info
    setSelectedComponentId(Number(node.id))
  }
  return (
    <Tree
      switcherIcon={<DownOutlined />}
      showLine
      fieldNames={{
        key: 'id',
        title: 'name',
      }}
      onSelect={onSelect}
      treeData={components as any}
    />
  )
}

export default OutLine
