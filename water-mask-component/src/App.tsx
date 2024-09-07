import React from 'react'
import logo from './logo.svg'
import './App.css'
import WaterMask from './WaterMask'

function App() {
  return (
    <div className="App">
      <WaterMask options={{ name: 'mask' }}>
        <div className="sss" style={{ width: '100%', height: '300px' }}></div>
      </WaterMask>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
