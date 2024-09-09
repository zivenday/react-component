import React, { useEffect, useRef, useState } from 'react'

export default function App4() {
  const [days, hours, minuts, seconds, milliseconds] = useCountDown(new Date('2024-9-11 00:00:00'), { frequency: 1000 })
  return <div>{`${days}天${hours}时${minuts}分${seconds}秒${milliseconds}毫秒`}</div>
}

interface ICountDownOptions {
  // 在此处添加选项属性
  frequency?: number
}

function useCountDown(date: Date, options: ICountDownOptions = { frequency: 500 }): number[] {
  const dateRef = useRef(date)
  const returnRef = useRef<number[]>([0, 0, 0, 0, 0])
  const [, forceUpdate] = useState({})
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      let diff = dateRef.current.getTime() - now.getTime()
      if (diff <= 0) {
        clearInterval(interval)
        console.error('时间已到')
        throw new Error('时间已到')
      }
      const days = Math.floor(diff / (24 * 60 * 60 * 1000))
      diff = diff % (24 * 60 * 60 * 1000)
      const hours = Math.floor(diff / (60 * 60 * 1000))
      diff = diff % (60 * 60 * 1000)
      const minuts = Math.floor(diff / (60 * 1000))
      diff = diff % (60 * 1000)
      const seconds = Math.floor(diff / 1000)
      diff = diff % 1000
      const milliseconds = Math.floor(diff)
      returnRef.current = [days, hours, minuts, seconds, milliseconds]
      forceUpdate({})
    }, options.frequency)
    return () => clearInterval(interval)
  }, [date])

  return returnRef.current
}
