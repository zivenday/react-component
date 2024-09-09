import React, { ReactElement, useEffect, useRef, useState } from 'react'

interface LazyLoadProps {
  children: ReactElement
  placeholder?: JSX.Element
  options?: IntersectionObserverInit
}

function useIntersectionObserver(target: React.RefObject<HTMLDivElement>, options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  useEffect(() => {
    console.log('///')
    if (!target.current) return
    let callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries[0].isIntersecting && setIsIntersecting(entries[0].isIntersecting)
    }
    let observer = new IntersectionObserver(callback, options)
    observer.observe(target.current!)
    return () => {
      // second
      observer.disconnect?.()
    }
  }, [target.current])
  return { isIntersecting }
}

export default function LazyLoad(props: LazyLoadProps) {
  const elemRef = useRef<HTMLDivElement>(null)
  const { children, placeholder = <div>Loading</div>, options = {} } = props

  const { isIntersecting } = useIntersectionObserver(elemRef, options)

  return <div ref={elemRef}>{!isIntersecting ? placeholder : children}</div>
}
