// @flow
import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'
import { FileType } from '../CodeEditor'
import { IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME, APP_STYLE_FILE_NAME, APP_COMPONENT_FILE_NAME } from '../const'

type Props = {
  path: string
  index: number
  files: FileType[]
  onSelected?: (path: string) => void
  onDoubleClick?: (path: string) => void
  onBlur?: (path: string, index: number) => void
}

export const FileEditor = memo(
  forwardRef((props: Props, ref) => {
    const forbiddens = [IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME, APP_STYLE_FILE_NAME, APP_COMPONENT_FILE_NAME]

    const [edit, setEdit] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const { path, index, files, onSelected, onDoubleClick, onBlur } = props
    const handleClick = () => {
      onSelected?.(path)
    }

    const handleDoubleClick = () => {
      if (forbiddens.includes(path)) {
        return alert('该文件是默认文件，不能修改名称')
      }
      setEdit(true)
      onDoubleClick?.(path)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
    const handleBlur = (e) => {
      e.persist()
      setTimeout(() => {
        const newPath = e.target.value
        const sameFileIndex = files.findIndex((f) => f.path === newPath)
        const noFile = sameFileIndex === -1
        let errorFlag = false
        if (!newPath) {
          console.log('pp--')
          errorFlag = true
          alert('名称不能为空')
        } else if (!noFile && sameFileIndex !== index) {
          console.log('pp++')
          errorFlag = true
          alert('与其他文件重复命名了')
        }
        //   console.log('p')
        setEdit(false)
        if (errorFlag) {
          e.target.value = files[index].path
        } else {
          if (path !== newPath) onBlur?.(newPath, index)
        }
      })
    }
    const handleChange = (e) => {
      // const name = e.target.value
      // if (name) {
      //   return alert('名称不能为空')
      // } else if (files.some((f) => f.path === name)) {
      //   return alert('与其他文件重复命名了')
      // }
    }
    useImperativeHandle(
      ref,
      () => ({
        // openEdit: () => {
        //   edit
        // },
      }),
      []
    )

    return (
      <div className="file-name-editor" title={path} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {edit ? (
          <input ref={inputRef} className="w-[120px]" defaultValue={path} onBlur={handleBlur} onChange={handleChange} />
        ) : (
          <div className="w-[110px] text-center overflow-hidden break-all cursor-pointer  whitespace-nowrap overflow-ellipsis">
            {path}
          </div>
        )}
      </div>
    )
  })
)
