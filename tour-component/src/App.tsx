import { ReactNode, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tour from './Tour'

function App() {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)
  const refs = useRef<HTMLDivElement>(null)
  const refs1 = useRef<HTMLDivElement>(null)

  const steps = [
    {
      title: '#appweewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      target: () => refs.current,
    },
    {
      title: '#第二步',
      target: () => refs1.current,
    },
  ]

  return (
    <>
      <div ref={refs}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card" ref={refs1}>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Tour visible={visible} steps={steps} />
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
