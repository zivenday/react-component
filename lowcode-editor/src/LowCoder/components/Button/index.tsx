import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd'
import { CSSProperties, forwardRef, useEffect, useImperativeHandle } from 'react'
import { useBaseDrag } from '../../hooks'

interface ButtonProps {
  styles?: CSSProperties
  dataId?: number
  title?: string
  parentId?: number
}

const Button = (props: ButtonProps) => {
  const { dataId, parentId, styles, ...rest } = props
  // console.log('move parentId', parentId)
  const [{ isSelfDragging }, drag] = useBaseDrag('Button', dataId!, { dragType: 'move' })
  console.log('isSelfDragging', isSelfDragging, 'Button')
  return (
    <>
      {!isSelfDragging ? (
        <div data-id={props.dataId} className="inline-block" ref={drag}>
          <AntdButton {...rest} style={styles} className="pointer-events-none">
            {props.title || '按钮'}
          </AntdButton>
        </div>
      ) : null}
    </>
  )
}

const Prod = forwardRef((props: ButtonProps, ref) => {
  const { dataId, parentId, styles, ...rest } = props
  useImperativeHandle(ref, () => ({}))
  return (
    <AntdButton {...rest} style={styles}>
      {props.title || '按钮'}
    </AntdButton>
  )
})

type ButtonType = typeof Button & {
  Prod: typeof Prod
  displayName: string
}

const button = Button as ButtonType

button.Prod = Prod

button.displayName = 'Button'

export default button
