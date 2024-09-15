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
)
