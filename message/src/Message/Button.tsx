import Message from './index'

function Button(props: any) {
  const [MessageApi] = Message.useMessage()

  return <button {...props} onClick={() => MessageApi.info('ppppppppppppppppppppppp222')}></button>
}

export default Button
