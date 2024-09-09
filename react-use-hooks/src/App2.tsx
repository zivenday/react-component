import React, { useEffect, useRef, useState } from 'react'

function useScroll(elementRef: React.RefObject<HTMLDivElement>) {
  const [isScrolled, setIsScrolled] = useState(false)

  let time: NodeJS.Timeout | null = null

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleScroll = () => {
      if (!isScrolled) {
        if (time) clearTimeout(time)
        setIsScrolled(true)
        time = setTimeout(() => {
          setIsScrolled(false)
        }, 300)
      }
    }
    element.addEventListener('scroll', handleScroll)
    return () => {
      console.log('///')
      element?.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return isScrolled
}
function App2() {
  const elementRef = useRef<HTMLDivElement>(null)
  const isScrolled = useScroll(elementRef)

  return (
    <div>
      <div>{isScrolled ? 'Scrolled' : 'Not Scrolled'}</div>
      <div ref={elementRef} style={{ height: '300px', overflow: 'auto' }}>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
      </div>
    </div>
  )
}

export default App2
