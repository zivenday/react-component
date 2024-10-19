import { FC, useState, useEffect, useRef } from 'react'
import MonacoEditor, { EditorProps } from '../../base/MonacoEditor'
import { useComponentsStore } from '../../stores'
const Source: FC = () => {
  const { components } = useComponentsStore()
  const [value, setValue] = useState(JSON.stringify(components, null, 2))
  const editorRef = useRef<any>(null)
  const props = {
    language: 'json',
    theme: 'vs-light',
    minimap: {
      enabled: false,
    },
    path: 'index.json',
    className: 'min-h-[100% ] border border-gray-300',
    options: {
      tabSize: 0,
    },
    lineNumbers: 'off',
  } as EditorProps

  useEffect(() => {
    const _value = JSON.stringify(components, null, 2)
    setValue(_value)
    editorRef.current?.setValue(_value)
  }, [components])
  return <MonacoEditor initialValues={value} {...props} ref={editorRef} />
}

export default Source
