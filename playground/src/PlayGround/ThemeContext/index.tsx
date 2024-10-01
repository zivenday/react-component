import { FC, PropsWithChildren, useContext, useState, createContext } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  setTheme: (params: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = (cx: React.Context<ThemeContextType | undefined>): ThemeContextType => {
  const _cx = useContext(cx)
  const error = _cx ?? new Error('新增错误了')
  if (error instanceof Error) throw error
  return _cx!
}

interface ThemeProivderProps {}

const ThemeProivder: FC<PropsWithChildren<ThemeProivderProps>> = (props) => {
  const { children } = props
  const [theme, setTheme] = useState<Theme>('light')
  const value = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProivder
