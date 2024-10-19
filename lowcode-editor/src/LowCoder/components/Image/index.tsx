import { PropsWithChildren, forwardRef, useImperativeHandle } from 'react'

interface ImageProps {
  dataId?: number
  src?: string
}

const Image = forwardRef<HTMLImageElement, PropsWithChildren<ImageProps>>((props, ref) => {
  const { dataId, ...restProps } = props
  return <img {...restProps} ref={ref} data-id={dataId} className="w-[100%]" />
})

const Prod = forwardRef((props: ImageProps, _) => {
  const { src, dataId, ...rest } = props
  // useImperativeHandle(ref, () => ({}))
  return <img {...rest} data-id={dataId} className="w-[100%]" />
})

type ImageType = typeof Image & {
  Prod: typeof Prod
  displayName: string
}
const image = Image as ImageType

image.Prod = Prod

image.displayName = 'Image'
export default image
