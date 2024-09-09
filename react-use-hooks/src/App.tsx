import { useCallback, useRef, useState } from 'react'
import { useEffect } from 'react'

function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false)
  const get = useCallback(() => mountedRef.current, [])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      console.log(mountedRef.current)
      mountedRef.current = false
    }
  }, [])

  return get
}

export { useMountedState }

function App() {
  const [, setCount] = useState(0)
  const isMounted = useMountedState()
  console.log('000')
  useEffect(() => {
    setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
  }, [])

  return <>{isMounted() ? 'Mounted' : 'Unmounted'}</>
}

export default App
