import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { ChangeEvent, PropsWithChildren, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import axios from 'axios'
import { Progress } from 'antd'
import Drag from './Drag'

export interface MyUploadProps<T = any> extends UploadProps<T> {
  onSuccess?: (params: any) => void
  onError?: (params: any) => void
}

export type UploadFile = UploadFile<File> | undefined

const MyUploader = forwardRef<any, PropsWithChildren<MyUploadProps>>((props, ref) => {
  const { children, onChange, onSuccess, action, headers = {}, name, multiple = true } = props
  const [fileList, setFileList] = useState<UploadFile<any>[] | undefined>(props.fileList)
  // console.log('///', fileList)

  const uploadRef = useRef(null)
  const xhrRef = useRef<XMLHttpRequest>()

  const onReadyStateChange = () => {
    const xhr = xhrRef.current
    if (xhr!.readyState === 4) {
      if (xhr!.status === 200) {
        uploadSuccess(xhr!)
      } else {
        uploadError(xhr!)
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    if (!target?.files) return
    Array.from(target?.files).map((file) => {
      const form = new FormData()
      form.append('file', file)
      post(form, file.name)
    })
  }

  const post = (formData: any, fileName: string) => {
    xhrRef.current = new XMLHttpRequest()

    xhrRef.current.open('post', action, true)

    Object.keys(headers).forEach((key) => {
      xhrRef.current?.setRequestHeader(key, headers[key])
    })
    xhrRef.current?.setRequestHeader('withCredentials', 'true')

    // xhr.onload = uploadSuccess
    // xhr.onerror = uploadError
    const id = uuid()
    xhrRef.current.upload.onprogress = (e) => uploadProgress(e, id)

    xhrRef.current.onreadystatechange = onReadyStateChange

    xhrRef.current.send(formData)
    setFileList((pre = []) => [...pre, { percent: 0, uid: id, name: fileName }])
  }

  const uploadProgress = (e: ProgressEvent, id: string) => {
    if (e.lengthComputable) {
      let percentage = Math.round((e.loaded * 100) / e.total!) || 0
      setFileList((pre = []) => {
        const index = pre.findIndex((state) => state.uid === id)
        pre[index].percent = percentage
        return [...pre]
      })
    }
  }

  function uploadSuccess(xhr) {
    console.log(xhr)
    onSuccess?.(xhr)
    // const data = e.target.responseText
    // console.log(e)
  }
  function uploadError(e) {
    console.log('error', e)
  }

  const handleClick = () => {
    uploadRef?.current?.click()
  }

  useImperativeHandle(
    ref,
    () => ({
      handleChange,
    }),
    [fileList]
  )
  return (
    <>
      <div onClick={handleClick}>
        <input ref={uploadRef} type="file" style={{ display: 'none' }} onChange={handleChange} multiple={multiple} />
        {children}
      </div>
      <div>{fileList?.length && fileList.map((state) => <Progress key={state.uid} percent={state.percent} />)}</div>
    </>
  )
})

function UploadAction() {}

function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

type InternalUploadType = typeof MyUploader

type CompoundedComponent = InternalUploadType & {
  Drag: typeof Drag
}

type A = React.ForwardRefExoticComponent<
  MyUploadProps<any> & {
    children?: React.ReactNode | undefined
  } & React.RefAttributes<any>
>

type A1 = A & { Drag: typeof Drag }

const Upload = MyUploader as CompoundedComponent

Upload.Drag = Drag

export default Upload
