// import { UploadProps } from 'antd'
import { DragEvent, FC, PropsWithChildren, useRef } from 'react'

import Upload, { MyUploadProps } from './index'

interface DragUploadProps extends MyUploadProps {}
const DragUpload: FC<PropsWithChildren<DragUploadProps>> = (props) => {
  const UploadRef = useRef(null)
  const { children } = props

  const dropHandler = function (ev: DragEvent<HTMLDivElement>) {
    // console.log('---', ev)
    ev.preventDefault()
    ev.stopPropagation()
    var dt = ev.dataTransfer
    var files = dt.files
    console.log(files, UploadRef.current)
    UploadRef.current?.handleChange({ target: { files } })
    // Get the id of the target and add the moved element to the target's DOM
    // const data = ev.dataTransfer.getData("text/plain");

    // ev.target.appendChild(document.getElementById(data));
  }
  const dragoverHandler = function (ev) {
    console.log('lll')
    ev.stopPropagation()
    ev.preventDefault()
  }

  return (
    <div id="upload-drag" onDrop={dropHandler} onDragOver={dragoverHandler}>
      <Upload {...props} ref={UploadRef} />
      {/* {children} */}
    </div>
  )
}

export default DragUpload
