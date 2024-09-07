import React, {
  forwardRef,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useImperativeHandle,
} from 'react'
import useMutateObserver from './useMutationObserver'

interface MutationObserverProps {
  options?: MutationObserverInit
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void
  children: ReactElement | ReactElement[]
  ref?: any
}

const MutateObserver: React.FC<MutationObserverProps> = forwardRef((props, ref) => {
  const [target, setTarget] = React.useState<HTMLElement[]>()
  const { options, onMutate = () => {}, children } = props
  const Children = Array.isArray(children) ? children : [children]
  const elementRef = React.useRef<HTMLElement[]>([])

  useImperativeHandle(
    ref,
    () => {
      if (Array.isArray(elementRef.current) && elementRef.current.length === 1) {
        return elementRef.current[0]
      } else {
        return elementRef.current
      }
    },
    [elementRef]
  )
  useMutateObserver(target!, onMutate, options)

  useLayoutEffect(() => {
    setTarget(elementRef.current)
  }, [])

  if (!children) {
    return null
  }
  return (
    <>
      {React.Children.map(Children, (child, index) =>
        React.cloneElement(child, {
          ref: (dom: any) => {
            if (dom) {
              console.log('///', dom)
              elementRef.current[index] = dom
            }
          },
        })
      )}
    </>
  )
})

export default MutateObserver
