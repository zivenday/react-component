// @flow
import * as React from 'react'
import styles from './index.module.scss'
import { useThemeContext, ThemeContext } from '../ThemeContext'
import { memo } from 'react'
import { PlaygroundContext, usePlaygroundContext } from '../context'
import { compress, toShareUrl } from '../utils'

export const Header = memo(() => {
  const { theme, setTheme } = useThemeContext(ThemeContext)
  const { getFileList } = usePlaygroundContext(PlaygroundContext)

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const handleShare = () => {
    const fileList = getFileList()
    toShareUrl(fileList)

    // const url = href.split('#').unshift() || href
  }
  //   console.log(123)
  return (
    <div
      className={`${styles.header} flex justify-between items-center  w-[100%] h-[60px] p-[10px] border-b-gray-400 !border-b-[1px] border-solid`}
    >
      PlayGround DEMO
      <div>
        <button onClick={handleShare}>分享</button>|<button onClick={handleClick}>切换主题</button>
      </div>
    </div>
  )
})
