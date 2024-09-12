// import React from 'react'
import React, { PropsWithChildren, ReactNode, useContext, useState } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { createPortal } from 'react-dom'
import { FC } from 'react'

import MessageContext from './MessageContext'
// 定义 ContentProvider 的 props 类型
interface ContentProviderProps {
  items: { id: number; text: string }[]
  children?: ReactNode
}

// 修改 ContentProvider 组件定义
const ContentProvider: FC<ContentProviderProps> = ({ children, items }) => {
  const { info } = useContext(MessageContext)
  const transitions = useTransition(items, {
    from: { transform: 'translate3d(100%,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { transform: 'translate3d(-100%,0,0)', opacity: 0 },
  })

  return (
    <>
      {createPortal(
        <div className="item-box">
          {transitions((style, i) => {
            return (
              <animated.div className="item" style={style}>
                <span
                  className="del-btn"
                  onClick={() => {
                    // setItems(items.filter((item) => item.id !== i.id))
                    info('pppp')
                  }}
                >
                  x
                </span>
                {i.text}
              </animated.div>
            )
          })}
        </div>,
        document.body
      )}
      {children}
    </>
  )
}

export default ContentProvider
