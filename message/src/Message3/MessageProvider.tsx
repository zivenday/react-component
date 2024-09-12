// import React from 'react'
import React, { PropsWithChildren, useCallback, useContext, useState } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { createPortal } from 'react-dom'
import { FC } from 'react'

import MessageContext from './MessageContext'
import ContentProvider from './contentProvider'

const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<Record<string, any>[]>([])

  const context = useContext(MessageContext)

  context.info = useCallback((value: string) => {
    setItems((prevItems) => [...prevItems, { id: Date.now(), text: value }])
  }, [])

  return (
    <MessageContext.Provider value={context}>
      <div
        className="btn"
        onClick={() => {
          setItems([...items, { id: Date.now(), text: 'guang' }])
        }}
      >
        Add
      </div>
      <ContentProvider items={items}></ContentProvider>
      {children}
    </MessageContext.Provider>
  )
}

export default ConfigProvider
