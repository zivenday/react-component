import { useCallback, useContext } from 'react'
import { createPortal } from 'react-dom'
import MessageContext from './MessageContext'
import { animated, useTransition } from '@react-spring/web'
import React from 'react'
import styles from './index.module.scss'
import useMessage from './useMessage'
// type UserTransformProps = React.ReactNode[]
const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

const useTransform = (els: Record<string, any>[]) => {
  const store = useContext(MessageContext)
  const transtions = useTransition(els, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(100%)' },
  })

  const onClose = useCallback((id: string) => {
    console.log('onClose', id, store)
    store?.onClose(id)
  }, [])
  return (
    <>
      {transtions((transStyle, i) => {
        return (
          <animated.div className={styles.message} style={transStyle} key={i.id}>
            <span onClick={() => onClose(i.id)}>x</span>
            <span>{i.content}</span>
          </animated.div>
        )
      })}
    </>
  )
}

export const generateMessage = ({ els }: { els: Record<string, any>[] }) => {
  return createPortal(<Wrapper>{useTransform(els?.map((el) => el))}</Wrapper>, document.body)
}
const Message = {
  useMessage,
}
export default Message
