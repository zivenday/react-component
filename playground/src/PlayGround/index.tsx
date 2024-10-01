import { useCallback, useRef, useState } from 'react'
import './index.scss'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import CodeEditor, { FileType } from './CodeEditor'
import Preview from './Preview'
import FileNameList from './FileNameList'
import { PlaygroundContext } from './context'
import { ThemeContext, useThemeContext } from './ThemeContext'

import { debounce } from 'lodash'
import { useMemoizedFn, fileListFromHash } from './utils'
import { Header } from './Header'

import { defaultFile, defaultFileList, ENTRY_FILE_NAME } from './const'

type PlayGroundProps = {
  fileList?: FileType[]
  selectedFile?: FileType
}

function PlayGround(props: PlayGroundProps) {
  const { fileList, selectedFile } = props
  const [mergeFileList, _] = useState<FileType[]>(fileListFromHash() || fileList || defaultFileList)
  const [file, setFile] = useState<FileType>(selectedFile! || mergeFileList.find((f) => f.path === ENTRY_FILE_NAME))
  const fileListRef = useRef([...mergeFileList])
  const { theme } = useThemeContext(ThemeContext)
  //   console.log('merge', mergeFilelsit)

  const getFileList = () => {
    return fileListRef.current
  }

  const addFile = (file: FileType) => {
    fileListRef.current = [...fileListRef.current, file]
  }

  const delFile = (file: FileType) => {
    const fileList = fileListRef.current
    const index = fileList.findIndex((f) => f.path === file.path)
    if (index > -1) {
      fileList.splice(index, 1)
      fileListRef.current = fileList
    }
  }
  //注意：执行该方法的场景一定是当前更新path的文件必须是被选中的文件
  const updateFile = useMemoizedFn((callback: any) => {
    const cb = typeof callback === 'function' ? callback : () => callback
    const index = fileListRef?.current?.findIndex((f) => f.path === file.path)
    const newFile = cb(file)
    updateFileList(newFile, index)
  })

  const debounceChangeFn = useCallback(
    debounce((value) => {
      setFile((preFile) => {
        const newFile = { ...preFile, value }
        updateFile(newFile)
        return newFile
      })
    }, 500),
    []
  )

  const handleChange = useMemoizedFn((value: any) => {
    debounceChangeFn(value)
  })

  const updateFileList = (file: FileType, originIndex?: number) => {
    // console.log('////----', file.path, file.value)
    const fileIndex = originIndex || fileListRef?.current?.findIndex((f) => f.path === file.path)
    if (fileIndex > -1) {
      fileListRef.current[fileIndex] = file
    }
  }

  //   useEffect(() => {
  //     updateFileList(file)
  //   }, [file])

  const contextValue = {
    getFileList,
    add: addFile,
    del: delFile,
    setFile,
    updateFile,
  }

  return (
    <PlaygroundContext.Provider value={contextValue}>
      <div className={`${theme} relative w-[100%] h-[100%]`}>
        <Header></Header>
        <div className="relative flex h-[calc(100%-60px)]" id="playground-content">
          <Allotment>
            <Allotment.Pane minSize={300}>
              <FileNameList file={file} />
              <CodeEditor file={file} onChange={handleChange}></CodeEditor>
            </Allotment.Pane>
            <Allotment.Pane>
              <Preview file={file} />
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>
    </PlaygroundContext.Provider>
  )
}

export default PlayGround
