import React, { useEffect, useRef, useState } from 'react'

type IProps = Record<string, any>
function useWhyDidYouUpdate(params: IProps) {
  const previousProps = useRef<IProps>(params)

  useEffect(() => {
    const allKeys = Object.keys({ ...previousProps.current, ...params })
    const changesObj = {}
    allKeys.forEach((key) => {
      if (previousProps.current[key] !== params[key]) {
        ;(changesObj as Record<string, { from: any; to: any }>)[key] = {
          from: previousProps.current[key],
          to: params[key],
        }
      }
    })
    if (Object.keys(changesObj).length) {
      console.log('[why-did-you-update]', name, changesObj)
    }
  }, [params])
}

export default function App3() {
  const [obj, setObj] = useState<Record<string, any>>({
    name: '123',
    age: 123,
  })
  useWhyDidYouUpdate(obj)
  return <div onClick={() => setObj({ ...obj, name: Math.random() })}>App3</div>
}
