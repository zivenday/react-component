import React from 'react'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, message } from 'antd'
import MyUploader from './MyUpload'
import Upload from './MyUpload'
import { MyUploadProps } from './MyUpload'
const props: MyUploadProps = {
  name: 'file',
  action: 'http://localhost:3333/upload',
  headers: {},
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onSuccess: () => {
    console.log('成功了')
  },
  fileList: [
    {
      uid: '1',
      name: '0000',
      percent: 100,
    },
  ],
}
const { Drag } = Upload

type SS<T = any> = {
  gg: number
  <U extends T>(props: React.PropsWithChildren<UploadProps<U>> & React.RefAttributes<any>): React.ReactElement
}

// console.log(china)
const App: React.FC = () => (
  <>
    {/* <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>

    <MyUploader {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </MyUploader> */}
    <Drag {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
      </p>
    </Drag>
  </>
)

export default App
