import { FC, PropsWithChildren, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

interface TransformerProps {
  dataId: number
  className?: string
  styles?: React.CSSProperties
  isOverCurrent?: boolean
  isDraging?: boolean
}
const Transformer = forwardRef<HTMLDivElement, PropsWithChildren<TransformerProps>>((props, ref) => {
  const { children, dataId, className, styles = {}, isDraging, isOverCurrent, ...restProps } = props
  const divRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => divRef.current!)

  return !isDraging ? (
    <div
      data-id={dataId}
      className={`box-border border-[1px]  ${className}`}
      ref={divRef}
      style={{
        ...styles,
        borderColor: isOverCurrent ? 'green' : 'gray',
        borderWidth: isOverCurrent ? '2px' : '1px',
      }}
      {...restProps}
    >
      {children}
    </div>
  ) : null
})

const Prod = (props: PropsWithChildren<TransformerProps>) => {
  const { children, dataId, className, isDraging, styles = {}, isOverCurrent, ...restProps } = props

  return (
    <div
      data-id={dataId}
      className={`box-border border-[2px] border-gray-200 ${className}`}
      style={{
        ...styles,
      }}
      {...restProps}
    >
      {children}
    </div>
  )
}

type TransformerType = typeof Transformer & {
  Prod: typeof Prod
}
const transformer = Transformer as TransformerType

transformer.Prod = Prod

export default transformer
