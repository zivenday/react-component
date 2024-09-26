// @flow
import * as React from 'react'
import { FileType } from '../CodeEditor'
import { PlaygroundContext, usePlaygroundContext } from '../context'
type Props = {
  file: FileType
}
const FileNameList = (props: Props) => {
  const [_, forceUpdate] = React.useState({})
  const { file } = props
  const { getFileList, add, setFile, del } = usePlaygroundContext(PlaygroundContext)
  const fileList = getFileList()

  const generatePath = () => {
    const fileList = getFileList()
    const pathList = fileList.map((f) => f.path)
    for (let index = 0; index < 10000; index++) {
      const path = 'Comp' + (index + 1) + '.tsx'
      if (!pathList.includes(path)) {
        return path
      }
    }
    throw new Error('maxlimit generate File')
  }

  const handleAdd = () => {
    const path = generatePath()
    const file = { path, value: 'console.log("' + path + '")' }
    add?.(file)
    setFile?.(file)
  }
  const handleDel = (file: FileType) => {
    const isConfirmed = window.confirm('您确定要删除吗？')
    console.log('ppp', isConfirmed)
    if (isConfirmed) {
      // 执行删除操作
      del?.(file)
      forceUpdate({})
    }
  }
  const handleSet = (file: FileType) => {
    setFile(file)
  }
  return (
    <div className="h-[40px] w-[100%] overflow-x-auto flex pr-[20px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-200">
      {fileList.map((f) => (
        <div
          className="relative flex flex-shrink-0 w-[110px] justify-center  p-[5px] "
          style={{
            color: f.path === file.path ? `#42d392` : `#000`,
            borderBottom: `3px solid ${f.path === file.path ? '#42d392' : '#fff'}`,
          }}
          key={f.path}
        >
          <div
            className="overflow-hidden break-all cursor-pointer whitespace-nowrap overflow-ellipsis"
            title={f.path}
            onClick={() => handleSet(f)}
          >
            {f.path}
          </div>
          <div
            className="absolute right-[5px] top-[9px] cursor-pointer text-gray-400 text-[12px] "
            style={{
              display: f.path === file.path ? 'none' : 'block',
            }}
            onClick={() => handleDel(f)}
          >
            x
          </div>
        </div>
      ))}
      <div className="w-[30px] text-center cursor-pointer align-middle leading-[35px]" onClick={handleAdd}>
        +
      </div>
    </div>
  )
}

export default FileNameList
