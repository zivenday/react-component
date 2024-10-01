import { useEffect, useRef, useState, memo } from 'react'
import { transform } from '@babel/standalone'
import { FileType } from '../CodeEditor'

import { PlaygroundContext, usePlaygroundContext } from '../context'
import iframeRaw from '../template/index.html?raw'
import Myworker from './worker?worker'

import { IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME } from '../const'
interface PreviewProps {
  file: FileType
}

const Preview = (props: PreviewProps) => {
  const { file } = props
  // const { children } = props
  const fileRef = useRef<FileType | undefined>(undefined)
  const [transformCode, setTransformCode] = useState('')
  const [iframeUrl, setIframeUrl] = useState('')
  const { getFileList } = usePlaygroundContext(PlaygroundContext)
  const files = getFileList()
  const importMapFile = files.find((f) => f.path === IMPORT_MAP_FILE_NAME) as FileType
  const workRef = useRef<Worker>()

  useEffect(() => {
    workRef.current = new Myworker()
    workRef.current.onmessage = (e) => {
      // console.log('pppp', e)
      if (e?.data?.type === 'SETFILES') {
        setTransformCode(e.data.files)
      }
    }
    return () => {}
  }, [])

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
      if (workRef.current) {
        workRef.current?.postMessage(files)
      }
      // setTransformCode(trans)
    }
    fileRef.current = file
  }, [file])

  const handleMessage = (params) => {
    // console.log('oooo', params, params.type === 'IFRAMEERROR')
    if (params?.data?.type === 'IFRAMEERROR') {
      window.confirm(params?.data?.message)
    }
    //
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])
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
