import { useState } from 'react'

import './App.css'
import { create } from './zustand'

function App() {
  const [count, setCount] = useState(0)

  const middle2 = (func) => {
    console.log('ppp_')
    return function (set) {
      console.log('ppp')
      function newSet(...args) {
        console.log('ppp2')
        return set(...args)
      }

      return func(newSet)
    }
  }

  const middle = (func) => {
    console.log('ppp_')
    return function (set) {
      console.log('ppp')
      function newSet(...args) {
        console.log('ppp2')
        return set(...args)
      }

      return func(newSet)
    }
  }

  const useStore = create(
    middle2(middle((set: Function) => ({ aaa: 1, updateAAA: (value: any) => set(() => ({ aaa: value })) })))
  )

  const aaa = useStore((state) => state.aaa)
  const updateAAA = useStore((state) => state.updateAAA)

  const handleClick = () => {
    updateAAA(aaa + 1)
  }
  console.log('///')
  return (
    <>
      <div onClick={handleClick}>{aaa}</div>
    </>
  )
}

export default App
