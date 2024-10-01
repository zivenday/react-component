import importMap from './template/import-map.json?raw'
import AppCss from './template/App.css?raw'
import App from './template/App.tsx?raw'
import main from './template/main.tsx?raw'

// app 文件名

export const APP_COMPONENT_FILE_NAME = 'App.tsx'
// esm 模块映射文件名
export const IMPORT_MAP_FILE_NAME = 'import-map.json'
// app 入口文件名
export const ENTRY_FILE_NAME = 'main.tsx'
export const APP_STYLE_FILE_NAME = 'App.css'

export const defaultFileList = [
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

export const defaultFile = defaultFileList.find((f) => f.path === ENTRY_FILE_NAME)
