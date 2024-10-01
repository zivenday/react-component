import { Context, useContext, createContext } from 'react'
import { FileType } from './CodeEditor'

type PlaygroundContextType = {
  getFileList: () => FileType[]
  add: (file: FileType) => void
  del: (file: FileType) => void
  setFile: React.Dispatch<React.SetStateAction<FileType>>
  updateFile: React.Dispatch<React.SetStateAction<FileType>>
}

export const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined)

export const usePlaygroundContext = <T = PlaygroundContextType>(cx: Context<T>) => {
  const context = useContext(cx)
  if (!context) throw new Error('Please add provider at first!')
  return context
}
