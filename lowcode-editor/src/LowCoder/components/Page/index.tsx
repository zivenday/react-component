import { PropsWithChildren, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Component, useComponentsStore } from '../../stores'
import { useBaseDrop, useComponentDrop } from '../../hooks'
import Transformer from '../Transformer'
import { createId4Component } from '../../utils'

interface PageProps {
  // className?: string
  dataId?: number
}

const Page = (props: PropsWithChildren<PageProps>) => {
  const { children, dataId } = props
  const divRef = useRef<any>()

  const accept = ['Button', 'Container', 'Modal', 'Video', 'Image', 'Table', 'Form']
  const [{ isOverCurrent }, drop] = useComponentDrop(accept, dataId!)

  useEffect(() => {
    drop(divRef)
  }, [divRef.current])

  return (
    <Transformer
      ref={divRef}
      dataId={dataId!}
      isOverCurrent={isOverCurrent}
      className="edit-page relative p-[10px] w-[100%] h-[100%] border-transparent  
      box-border
      overflow-y-auto"
    >
      {children}
    </Transformer>
  )
}

const Prod = forwardRef<Record<string, any>, PropsWithChildren<PageProps>>(
  (
    props: PropsWithChildren<PageProps>,
    _ /// <reference path="" />
  ) => {
    const { children, dataId } = props
    return (
      <Transformer.Prod
        dataId={dataId!}
        className="edit-page relative p-[10px] w-[100%] h-[100%] border-transparent  
      box-border
      overflow-y-auto"
      >
        {children}
      </Transformer.Prod>
    )
  }
)

type PageType = typeof Page & {
  Prod: typeof Prod
  displayName: string
}
const page = Page as PageType

page.Prod = Prod

page.displayName = 'Page'
export default page
function onMove(component: Component, arg1: number) {
  throw new Error('Function not implemented.')
}
