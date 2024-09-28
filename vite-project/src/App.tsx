<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
import React from 'react'
import { ColorPicker, Space } from 'antd'
import Aaa from './Aaa'

const Demo = () => (
  <div>
    <Space>
      <Space direction="vertical">
        <ColorPicker defaultValue="#1677ff" size="small" />
        <ColorPicker defaultValue="#1677ff" />
        <ColorPicker defaultValue="#1677ff" size="large" />
      </Space>
      <Space direction="vertical">
        <ColorPicker defaultValue="#1677ff" size="small" showText />
        <ColorPicker defaultValue="#1677ff" showText />
        <ColorPicker defaultValue="#1677ff" size="large" showText />
      </Space>
    </Space>
    <Aaa></Aaa>
  </div>
)

export default Demo
>>>>>>> 782f259593ff67031b3b7c4c23bb63b989cb06e1
