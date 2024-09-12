import { useCallback, useContext, useMemo, useRef, useState } from 'react'
import MessageContext from './MessageContext'
import styles from './index.module.scss'
import { generateMessage as GenerateMessage } from './index'

function MessageProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, any>[]>([])

  const info = useCallback((text?: string) => {
    setItems((prevItems = []) => [
      ...prevItems,
      {
        id: new Date().getTime(),
        content: text,
      },
    ])
  }, [])

  const onClose = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item?.id !== id))
  }, [])
  let context = { onClose, info }
  return (
    <MessageContext.Provider value={context}>
      {children}
      <GenerateMessage els={items} />
    </MessageContext.Provider>
  )
}

export default MessageProvider
