import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MessageProvider from './Message/MessageProvider'

createRoot(document.getElementById('root')!).render(
  <MessageProvider>
    <App />
  </MessageProvider>
)
