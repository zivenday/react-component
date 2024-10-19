import { EditorProps } from '../../base/MonacoEditor'
export default {
  language: 'css',
  theme: 'vs-light',
  minimap: {
    enabled: false,
  },
  path: 'index.css',
  className: 'h-[300px] border border-gray-300',

  options: {
    tabSize: 0,
  },
  lineNumbers: 'off',
} as EditorProps
