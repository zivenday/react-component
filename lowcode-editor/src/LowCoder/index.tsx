import { FunctionComponent, useEffect, useState } from 'react'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'

import Metarial from './Metarail/index.tsx'
import Edit from './Edit'
import Setting from './Setting'
import { useComponentsStore } from './stores'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Preview from './Preview/index.tsx'
import { Button } from 'antd'

interface LowCoderProps {}

const LowCoder: FunctionComponent<LowCoderProps> = (props) => {
  const [showPreview, setShowPreview] = useState(false)
  const { components, updateCompnent } = useComponentsStore()

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <div className="w-[100%] h-[100vh]">
          {/* <pre>{JSON.stringify(components)}</pre> */}
          <div className="z-[1000] relative h-[60px] flex items-center justify-between bg-[#fff] border-b-[1px] border-gray-400 px-[20px]">
            Header
            <Button type="primary" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? '关闭预览' : '预览'}
            </Button>
          </div>
          <div className="h-[calc(100vh-60px)]">
            <Allotment defaultSizes={[100, 200, 100]}>
              <Allotment.Pane minSize={100}>
                <Metarial></Metarial>
              </Allotment.Pane>
              <Allotment.Pane minSize={300}>
                <Edit components={components} onUpdate={updateCompnent}></Edit>
              </Allotment.Pane>
              <Allotment.Pane minSize={100} className="!overflow-visible">
                <Setting></Setting>
              </Allotment.Pane>
            </Allotment>
          </div>
        </div>
        <Preview show={showPreview}></Preview>
      </>
    </DndProvider>
  )
}

export default LowCoder
