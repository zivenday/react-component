<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// @ts-ignore
import { ClickToComponent } from 'click-to-react-component'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ClickToComponent
      pathModifier={(path: string) => {
        // console.log(path)
        const a = path.split('vite-project')[1]
        console.log('vscode://file/c:/vite-project' + a, path)
        return path
      }}
    />
    <App />
  </>
>>>>>>> 782f259593ff67031b3b7c4c23bb63b989cb06e1
)
