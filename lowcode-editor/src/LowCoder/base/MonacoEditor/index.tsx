import './userWorker'

import { VFC, useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import classnames from 'classnames'
import { debounce } from '../../utils'
// import styles from './Editor.module.css'

export interface EditorProps extends monaco.editor.IEditorOptions {
  value?: string
  initialValues?: string
  className?: string
  onChange?: (value: string) => void
}

const Editor = forwardRef((props: EditorProps, ref: any) => {
  const { value, initialValues, className, onChange, ...rest } = props
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoEl = useRef(null)
  const flag = useRef(false)

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor
        return monaco.editor.create(monacoEl.current!, {
          value: value || initialValues || '',
          ...rest,
        })
      })
    }

    return () => editor?.dispose()
  }, [monacoEl.current])

  useEffect(() => {
    //第一次初始化后把defaultValue赋值给value
    // console.log('editor', editor)
    if (editor && !flag.current && value === undefined && initialValues !== undefined) {
      editor.setValue(initialValues || '')
    }
    flag.current = true
  }, [value, initialValues, editor])

  const editorClass = classnames('w-full h-full min-h-[300px]', className)
  // console.log(value, initialValues)
  editor?.onDidChangeModelContent(
    debounce(() => {
      // console.log('e', editor?.getModel()?.getValue())
      onChange?.(editor?.getModel()?.getValue() || '')
    }, 800)
  )

  useImperativeHandle(ref, () => ({
    getValue: () => editor?.getModel()?.getValue(),
    setValue: (value: string) => {
      // console.log('setValue', value)
      editor?.setValue(value)
    },
  }))
  // console.log('editor', editor?.getModel()?.getValue())
  // console.log('editor', editor?.getModel()?.getValue())
  return <div className={editorClass} ref={monacoEl}></div>
})
export default Editor
