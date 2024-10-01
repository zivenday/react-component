// @flow
import * as React from 'react'
import styles from './import.module.scss'
import { FileType } from '../CodeEditor'
import { PlaygroundContext, usePlaygroundContext } from '../context'
import { ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME } from '../const'
import { FileEditor } from './FileEditor'
import { useCallback, useState } from 'react'
import { useMemoizedFn } from '../utils'
import { ThemeContext, useThemeContext } from '../ThemeContext'
type Props = {
  file: FileType
}

const FileNameList = (props: Props) => {
  const forBiddenDelList = [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME]
  const { theme } = useThemeContext(ThemeContext)
  // console.log('ppp', context)
  const [_, forceUpdate] = useState({})
  const { file } = props
  // const { theme } = useThemeContext(ThemeContext)
  const { getFileList, add, setFile, updateFile, del } = usePlaygroundContext(PlaygroundContext)

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
    setTimeout(() => {
      const els = document.querySelectorAll('.file-name-editor')
      // 创建一个双击事件
      // 手动触发双击事件
      els[els.length - 1].dispatchEvent(
        new MouseEvent('dblclick', {
          bubbles: true, // 事件会冒泡
          cancelable: true, // 事件可以被取消
          view: window, // 事件的视图，通常为 window
        })
      )
    })
  }
  const handleDel = (file: FileType) => {
    const isConfirmed = window.confirm('您确定要删除吗？')
    // console.log('ppp', isConfirmed)
    if (isConfirmed) {
      // 执行删除操作
      del?.(file)
      forceUpdate({})
    }
  }
  const handleSet = useCallback((path: string) => {
    const fileList = getFileList()
    const index = fileList?.findIndex((f) => f.path === path)
    if (index > -1) {
      setFile(fileList[index])
    }
  }, [])
  // const handleSetRef = useRef(handleSet)
  const handleBlur = useMemoizedFn((path: string) => {
    let newFile = { value: '', path: '' }
    updateFile((preFile) => {
      newFile = { ...preFile, path }
      return newFile
    })
    setFile(newFile)
  })
  console.log(styles)
  return (
    <div
      className={`${styles['file-name-list']} h-[40px] w-[100%] overflow-x-auto flex pr-[20px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-200`}
    >
      {fileList.map((f, index) => (
        <div
          className={`${
            f.path === file.path ? styles.active : ''
          } relative flex flex-shrink-0  justify-center  p-[5px]`}
          key={f.path}
        >
          <FileEditor
            path={f.path}
            index={index}
            files={getFileList()}
            onSelected={handleSet}
            onBlur={handleBlur}
          ></FileEditor>
          {f.path === file.path || forBiddenDelList.includes(f.path) ? null : (
            <div
              className="absolute right-[5px] top-[9px] cursor-pointer text-gray-400 text-[12px] "
              onClick={() => handleDel(f)}
            >
              x
            </div>
          )}
        </div>
      ))}
      <div className="w-[30px] text-center cursor-pointer align-middle leading-[35px]" onClick={handleAdd}>
        +
      </div>
    </div>
  )
}

export default FileNameList
