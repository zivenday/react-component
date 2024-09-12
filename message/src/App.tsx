import './App.css'
import Message from './Message'
import Button1 from './Message/Button'

function Button(props: any) {
  return <button {...props}></button>
}
function App() {
  const [MessageApi] = Message.useMessage()
  const handleClick = () => {
    // console.log('handleClick', MessageApi)
    MessageApi.info('ppppppppppppppppppppppp')
  }
  const handleClick2 = () => {
    // console.log('handleClick')
    MessageApi.info('2222222222222222222222222')
  }
  return (
    <>
      <Button1>ssss</Button1>
      <h1 onClick={handleClick}>
        <Button>点击我</Button>
      </h1>
      <h1 onClick={handleClick2}>Vite + React</h1>
    </>
  )
}

export default App
