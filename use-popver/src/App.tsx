import { useState } from 'react'
import './App.css'
import Popver from './Popver'
type Trigger = 'hover' | 'click' | 'focus' | undefined
export default function App() {
  const [open, setOpen] = useState<boolean | undefined>(false)
  const [trigger, setTrigger] = useState<Trigger>('click')
  const handleClick = () => {
    console.log('click受控')
    setOpen(!open)
  }
  const handleClick1 = () => {
    setOpen(open === undefined ? true : undefined)
  }
  const handleClick2 = () => {
    setTrigger(trigger === 'click' ? 'hover' : 'click')
  }
  return (
    <>
      <button onClick={handleClick1}>{`切换到${open === undefined ? '' : '非'}受控切换`}</button>
      <button onClick={handleClick2}>{`切换监听`}</button>
      <button onClick={handleClick}>{`受控点击`}</button>
      <Popver
        content={
          <div>
            hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello
          </div>
        }
        trigger={trigger}
        open={open}
      >
        <button onClick={handleClick}>hello</button>
      </Popver>
    </>
  )
}
