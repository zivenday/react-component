import { FC, PropsWithChildren, useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { setupEditor } from './setupEditor'
import defaultContent from './defaultContent?raw'
import { useControllableValue } from 'ahooks'
import { fileName2Language } from '../utils'
import { ThemeContext, useThemeContext } from '../ThemeContext'
// console.log('///-------------', defaultContent)

export interface FileType {
  value: string
  path: string
  language?: string
}

export interface CodeEditorProps {
  options?: editor.IStandaloneEditorConstructionOptions
  onChange?: (value: string | undefined, e: editor.IModelContentChangedEvent) => void
  file: FileType
}
const CodeEditor: FC<CodeEditorProps> = (props) => {
  const { options = {}, onChange, file } = props
  const { theme } = useThemeContext(ThemeContext)
  const changeEvenRef = useRef<editor.IModelContentChangedEvent>()
  const [mergeValue, setMergeValue] = useControllableValue<string>(
    {
      ...file,
      onChange: (value: any) => {
        onChange?.(value, changeEvenRef.current!)
      },
    },
    { defaultValue: defaultContent }
  )
  const handleChange = (value: string | undefined, e: editor.IModelContentChangedEvent) => {
    changeEvenRef.current = e
    setMergeValue(value || '')
  }

  // console.log(mergeValue)
  return (
    <MonacoEditor
      value={mergeValue}
      path={file.path}
      onChange={handleChange}
      options={{
        ...options,
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        scrollbar: {
          verticalScrollbarSize: 2,
        },
        theme: 'vs-' + theme,
      }}
      onMount={setupEditor}
      language={file.language || fileName2Language(file.path) || 'typescript'}
    ></MonacoEditor>
  )
}

export default CodeEditor
