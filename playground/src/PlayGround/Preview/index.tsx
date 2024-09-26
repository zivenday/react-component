import { FC, PropsWithChildren } from 'react'

interface PreviewProps {}
const Preview: FC<PropsWithChildren<PreviewProps>> = (props) => {
  const { children } = props

  return <div>{children}</div>
}

export default Preview
