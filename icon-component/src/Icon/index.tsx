import React, { PropsWithChildren, forwardRef } from 'react'

type BaseIconProps = {
  className?: string
  style?: React.CSSProperties
  size?: string | string[]
  spin?: boolean
  type?: string
  component?: () => JSX.Element
}

type createIconfontCNProps = {
  scriptUrl: string
}

export type IconProps = BaseIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((props, ref) => {
  const { style, className, spin, size = '1em', component, children, ...rest } = props
  const el = component?.()

  return (
    <svg ref={ref} style={style} fill="currentColor" {...rest}>
      {el || children}
    </svg>
  )
})

export const createFromIconfontCN = (props: createIconfontCNProps) => {
  const { scriptUrl } = props
  const script = document.createElement('script')
  script.setAttribute('src', scriptUrl)
  script.setAttribute('data-namespace', scriptUrl)

  return (props: BaseIconProps) => {
    const { type, ...rest } = props

    return <Icon {...rest}>{type ? <use xlinkHref={`#${type}`} /> : null}</Icon>
  }
}
