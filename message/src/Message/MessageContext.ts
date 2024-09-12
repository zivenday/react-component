import { createContext } from 'react'

export type MessageContextType = {
  info: (info: string) => void
  onClose: (id: string) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export default MessageContext
