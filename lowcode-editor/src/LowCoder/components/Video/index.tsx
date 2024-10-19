import { PropsWithChildren, forwardRef } from 'react'

interface VideoProps {
  src?: string
  dataId?: number
}

const Video = forwardRef<HTMLVideoElement, PropsWithChildren<VideoProps>>((props, ref) => {
  const { src, dataId, ...rest } = props
  return (
    <video {...rest} data-id={dataId} ref={ref} className="w-[100%]" controls>
      <source src={src}></source>
    </video>
  )
})

const Prod = forwardRef<HTMLVideoElement, PropsWithChildren<VideoProps>>((props, _) => {
  const { src, dataId, ...rest } = props
  return (
    <video {...rest} data-id={dataId} className="w-[100%]" controls>
      <source src={src}></source>
    </video>
  )
})

type VideoType = typeof Video & {
  Prod: typeof Prod
  displayName: string
}
const video = Video as VideoType

video.Prod = Prod

video.displayName = 'Video'

export default video
