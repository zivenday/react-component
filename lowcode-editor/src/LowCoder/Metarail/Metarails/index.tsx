import { FunctionComponent } from 'react'

import { useComponents } from '../../components'
import { useBaseDrag } from '../../hooks'

interface MetarailProps {}

const WrapDragComponent = (Component: any) => {
  const { key } = Component
  const name = key
  const [_, drag] = useBaseDrag(key, undefined, { name })

  return (
    <div ref={drag} key={key} className="p-[5px] border-dashed border-gray-400 border-[1px]">
      {key}
    </div>
  )
}

const renderMetarailComponent = (config: any) => {
  return WrapDragComponent(config)
}

const Metarail: FunctionComponent<MetarailProps> = () => {
  const MetarailComponents = useComponents()
  const componentArray = MetarailComponents.map((c) => {
    return {
      key: c.displayName,
    }
  })

  return (
    <div className="flex flex-wrap justify-around">
      {componentArray.filter((c) => c.key !== 'Page').map(renderMetarailComponent)}
    </div>
  )
}

export default Metarail
