import React, { useState, CSSProperties, useEffect, useLayoutEffect, useCallback } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web'

import styles from './style.module.css'

const pages: ((props: AnimatedProps<{ style: CSSProperties }> & { onClose: () => void }) => React.ReactElement)[] = [
  ({ style, onClose }) => (
    <animated.div
      style={{
        ...style,
        background: 'lightpink',
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
          onClose?.()
        }}
      >
        A
      </div>
    </animated.div>
  ),
]

export default function App() {
  const [index, set] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const onClick = () => {
    console.log('onClick')
    // set((state) => (state + 1) % 3)
    setIsOpen(true)
  }
  const onClose = useCallback(() => {
    // setTimeout(() => {
    setIsOpen(false)
    // }, 1000)
  }, [])
  const transRef = useSpringRef()
  const transitions = useTransition(isOpen, {
    ref: transRef,
    x: window.screen.width,
    opacity: 1,
    from: { x: window.screen.width, opacity: 1 },
    enter: { x: 0, opacity: 1 },
    leave: { x: window.screen.width, opacity: 0 },
    config: {
      duration: 1000,
    },
  })
  //   transRef.start()
  useEffect(() => {
    console.log('start', isOpen)
    transRef.start()
  }, [isOpen])
  console.log('transitions', isOpen)
  return (
    <div className={`flex fill ${styles.container}`} onClick={onClick} style={{ width: '100vw', height: '100vh' }}>
      <div></div>
      {transitions((style, x) => {
        // style.transform.to((v) => {
        //   console.log('transform', x, v)
        //   if (!x) {
        //     return 'translate3d(100%,0,0)'
        //   }
        //   return v
        // })

        // style.transform.to((v) => {
        //   console.log('transform-', x, v)

        //   return v
        // })
        // style.opacity.to((v) => {
        //   console.log('opacity', x, v)
        //   return v
        // })

        const Page = pages[0]
        return x && <Page style={style} onClose={onClose} />
      })}
    </div>
  )
}
