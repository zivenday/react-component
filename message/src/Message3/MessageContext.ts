import { createContext } from 'react'

export type MessageContextType = {
  info: (info: string) => void
}

const MessageContext = createContext<MessageContextType>({
  info: () => {},
})

export default MessageContext
