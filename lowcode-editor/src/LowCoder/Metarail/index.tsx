import { Segmented } from 'antd'
import { FC, useState } from 'react'
import Metarails from './Metarails'
import Source from './Source'
import OutLine from './OutLine'

interface MetarailProps {}
const Metarail: FC<MetarailProps> = () => {
  const [key, setKey] = useState<string>('物料')
  return (
    <>
      <Segmented value={key} onChange={setKey} block options={['物料', '大纲', '源码']} />
      {key === '物料' && <Metarails />}
      {key === '大纲' && <OutLine />}
      {key === '源码' && <Source />}
    </>
  )
}

export default Metarail
