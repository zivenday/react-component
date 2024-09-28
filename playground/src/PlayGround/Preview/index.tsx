import { useEffect, useRef, useState, memo } from 'react'
import { transform } from '@babel/standalone'
import { FileType } from '../CodeEditor'
import { PluginItem } from '@babel/core'
import { PlaygroundContext, usePlaygroundContext } from '../context'
import iframeRaw from '../template/index.html?raw'

import { IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME } from '../index'
interface PreviewProps {
  file: FileType
}

export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code
  const regexReact = /import\s+React\s/g
  // console.log('ppp', regexReact.test(code))
  if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)) {
    _code = `import React from 'react';\n${code}`
  }
  return _code
}

const json2Js = (file: FileType) => {
  const js = `export default ${file.value}`
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

const css2Js = (file: FileType) => {
  const randomId = new Date().getTime()
  const js = `
(() => {
  const stylesheet = document.createElement('style')
  stylesheet.setAttribute('id', 'style_${randomId}_${file.path}')
  document.head.appendChild(stylesheet)

  const styles = document.createTextNode(\`${file.value}\`)
  stylesheet.innerHTML = ''
  stylesheet.appendChild(styles)
})()
  `
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

function customResolver(files: FileType[]): PluginItem {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value

        if (modulePath.startsWith('.')) {
          let moduleName = modulePath.split('./').pop() || ''
          // console.log(moduleName)
          const index = files.findIndex((f) => {
            const name = f.path.split('.').shift()
            if (f.path === moduleName) return true
            if (name === moduleName && (f.path.endsWith('.tsx') || f.path.endsWith('.jsx'))) return true
            return false
          })
          if (index > -1) {
            const file = files[index]
            if (moduleName.endsWith('.css')) {
              path.node.source.value = css2Js(file)
            } else if (moduleName.endsWith('.json')) {
              path.node.source.value = json2Js(file)
            } else {
              path.node.source.value = URL.createObjectURL(
                new Blob([babelTransform(file.path, file.value, files)], {
                  type: 'application/javascript',
                })
              )
            }
          }
        }
      },
    },
  }
}

export const babelTransform = (filename: string, code: string, files: FileType[]) => {
  let result = ''
  let _code = beforeTransformCode(filename, code)

  try {
    result = transform(_code, {
      presets: ['react', 'typescript'],
      filename,
      plugins: [customResolver(files)],
      retainLines: true,
    }).code!
  } catch (e) {
    console.error('编译出错', e)
  }
  // console.log(999, filename, _code, '00000000000000000000', result)
  return result
}

const Preview = (props: PreviewProps) => {
  const { file } = props
  // const { children } = props
  console.log('pppp---', file.path)
  const fileRef = useRef<FileType | undefined>(undefined)
  const [transformCode, setTransformCode] = useState('')
  const [iframeUrl, setIframeUrl] = useState('')
  const { getFileList } = usePlaygroundContext(PlaygroundContext)
  const files = getFileList()
  const importMapFile = files.find((f) => f.path === IMPORT_MAP_FILE_NAME) as FileType

  const getIframeUrl = () => {
    const res = iframeRaw
      .replace('<script type="importmap"></script>', `<script type="importmap">${importMapFile.value}</script>`)
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${transformCode}</script>`
      )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  useEffect(() => {
    setIframeUrl(getIframeUrl())
    console.log('iframe update')
  }, [importMapFile.value, transformCode])

  useEffect(() => {
    const files = getFileList()
    const preFile = fileRef.current
    if (!preFile || (file.path === preFile?.path && file.value !== preFile?.value)) {
      const entryFile = files.find((f) => f.path === ENTRY_FILE_NAME) as FileType
      const trans = babelTransform(entryFile.path, entryFile.value as string, files)
      setTransformCode(trans)
    }
    fileRef.current = file
  }, [file])

  return (
    <iframe
      src={iframeUrl}
      style={{
        width: '100%',
        height: '100%',
        padding: 0,
        border: 'none',
      }}
    />
  )
}

export default Preview
