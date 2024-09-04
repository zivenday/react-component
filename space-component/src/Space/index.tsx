import React, { HtmlHTMLAttributes } from 'react'
import classNames from 'classnames'
import './index.scss'

interface SpaceProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode[]
  style?: React.CSSProperties
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'end' | 'center' | 'baseline'
  className?: string
}

function Space(props: SpaceProps) {
  const { children = [], direction = 'horizontal', className, ...rest } = props
  const newChildren = children?.map((node, index) => {
    const key = (node as any)?.key || index
    return (
      <div className="space-item " key={key}>
        {node}
      </div>
    )
  })
  const cls = classNames('space', `space-${direction}`, className)
  return (
    <div className={cls} {...rest}>
      {newChildren}
    </div>
  )
}

export default Space
