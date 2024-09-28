import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import CodeEditor, { FileType } from './CodeEditor'
import Preview from './Preview'
import FileNameList from './FileNameList'
import { PlaygroundContext } from './context'
import importMap from './template/import-map.json?raw'
import AppCss from './template/App.css?raw'
import App from './template/App.tsx?raw'
import main from './template/main.tsx?raw'
import { debounce } from 'lodash'
// app 文件名
export const APP_COMPONENT_FILE_NAME = 'App.tsx'
// esm 模块映射文件名
export const IMPORT_MAP_FILE_NAME = 'import-map.json'
// app 入口文件名
export const ENTRY_FILE_NAME = 'main.tsx'
export const APP_STYLE_FILE_NAME = 'App.css'

const defaultFileList = [
  {
    value: App,
    path: APP_COMPONENT_FILE_NAME,
  },
  {
    value: main,
    path: ENTRY_FILE_NAME,
  },
  {
    value: importMap,
    path: IMPORT_MAP_FILE_NAME,
  },
  {
    value: AppCss,
    path: APP_STYLE_FILE_NAME,
  },
]

const defaultFile = {
  value: main,
  path: ENTRY_FILE_NAME,
}

type PlayGroundProps = {
  fileList?: FileType[]
  selectedFile?: FileType
}

function PlayGround(props: PlayGroundProps) {
  const { fileList, selectedFile } = props

  const mergeFilelsit = fileList || defaultFileList
  const [file, setFile] = useState<FileType>(selectedFile || defaultFile)
  const fileListRef = useRef([...mergeFilelsit])
  const fileRef = useRef(file)

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

  const debounceChangeFn = useCallback(
    debounce((value) => {
      setFile((preFile) => {
        const index = fileListRef.current.findIndex((f) => f.path === preFile.path)
        const newFile = { ...preFile, value }
        if (index > -1) {
          fileListRef.current[index] = newFile
        }
        console.log('pppp', newFile.path)
        return newFile
      })
    }, 500),
    []
  )

  const handleChange = (value: any) => {
    debounceChangeFn(value)
  }

  useEffect(() => {
    const fileIndex = fileListRef.current.findIndex((f) => f.path === file.path)
    if (fileIndex > -1) {
      fileListRef.current[fileIndex] = file
    }
  }, [file])

  const contextValue = {
    getFileList,
    add: addFile,
    del: delFile,
    setFile,
  }

  return (
    <PlaygroundContext.Provider value={contextValue}>
      <div className="relative w-[100%] h-[100%]">
        <div className="w-[100%] h-[60px] p-[3px] border-b-gray-400 !border-b-[1px] border-solid">PlayGround DEMO</div>
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
