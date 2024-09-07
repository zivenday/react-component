import React, { FunctionComponent, ReactElement, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import MutateObserver from '../mutate/MutateObserver'
import './index.css'
import useMutateObserver from '../mutate/useMutationObserver'
interface WaterMaskProps {
  children: React.ReactElement
  options: createMaskPortalProps
}

interface createMaskPortalProps {
  name: string
}

interface MaskProps extends createMaskPortalProps {
  name: string
}

function AddMask(props: MaskProps) {
  const { name } = props
  const canvas = document.createElement('canvas')
  const width = '300px'
  const height = '200px'
  const textAlign = 'center'
  const textBaseline = 'middle'
  const font = '20px Microsoft Yahei'
  const fillStyle = 'rgba(184, 184, 184, 0.6)'
  const rotate = 45
  const zIndex = 10000
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate((Math.PI / 180) * rotate)
  ctx.fillText(name, parseFloat(width) / 2, parseFloat(height) / 2)
  const base64Url = canvas.toDataURL()
  return base64Url
}

const CreateMaskPortal = (props: createMaskPortalProps) => {
  const { name } = props
  let url = AddMask({ name })
  const __wm = document.querySelector('.__wm')
  const watermarkDiv = __wm || document.createElement('div')
  const styleStr = `
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  width:100%;
  height:100%;
  z-index:999999999;
  pointer-events:none;
  background-repeat:repeat;
  background-image:url('${url}')`
  watermarkDiv.setAttribute('style', styleStr)
  watermarkDiv.classList.add('__wm')
  return watermarkDiv
}

export default function WaterMask(props: WaterMaskProps) {
  const { children, options } = props
  const originRef = useRef<HTMLDivElement>(null)
  const mask = CreateMaskPortal(options)
  useLayoutEffect(() => {
    console.log('ppp', originRef.current)
    originRef.current?.appendChild(mask)
    return () => {}
  }, [])
  const handleMutate = (list: MutationRecord[]) => {
    const target = document.getElementsByClassName('__wm')[0]
    if (
      !target ||
      list.some((record) => {
        const className = (record.target as any)?.className
        return className === '__wm'
      })
    ) {
      target?.remove()
      const mask = CreateMaskPortal(options)
      originRef.current?.appendChild(mask)
    }
  }
  return (
    <MutateObserver onMutate={handleMutate} ref={originRef}>
      <div style={{ position: 'relative' }}>{children}</div>
    </MutateObserver>
  )
}
