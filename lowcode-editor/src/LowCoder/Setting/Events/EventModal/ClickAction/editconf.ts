import { EditorProps } from '../../../../base/MonacoEditor'
export default {
  language: 'javascript',
  theme: 'vs-light',
  minimap: {
    enabled: false,
  },
  path: 'index.js',
  className: 'h-[100%] border border-gray-300',

  options: {
    tabSize: 0,
  },
  lineNumbers: 'off',
} as EditorProps
