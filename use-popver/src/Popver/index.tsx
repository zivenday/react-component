import {
  useInteractions,
  useFloating,
  useHover,
  useDismiss,
  useClick,
  offset,
  arrow,
  FloatingArrow,
  flip,
  shift,
  useFocus,
  FloatingContext,
  ElementProps,
} from '@floating-ui/react'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useRef, useState } from 'react'

enum Placement {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_CENTER = 'bottom-center',
  LEFT_TOP = 'left-top',
  LEFT_BOTTOM = 'left-bottom',
  RIGHT_TOP = 'right-top',
  RIGHT_BOTTOM = 'right-bottom',
}

interface PopverProps extends React.PropsWithChildren {
  children: React.ReactElement
  content?: React.ReactNode | (() => React.ReactNode)
  title?: React.ReactNode | (() => React.ReactNode)
  placement?: Placement
  trigger?: 'click' | 'hover' | 'focus'
  open?: boolean | undefined
  style?: React.CSSProperties
  onOpenChange?: (open: boolean) => void
}

const pickTriggers = (cx: FloatingContext, trigger: string) => {
  const trigers = []

  if (trigger === 'click') {
    // console.log('click')
    const click = useClick(cx)
    trigers.push(click)
  } else if (trigger === 'hover') {
    const hover = useHover(cx)
    trigers.push(hover)
  } else if (trigger === 'focus') {
    const focus = useFocus(cx)
    trigers.push(focus)
  }
  const dismiss = useDismiss(cx)
  trigers.push(dismiss)

  return trigers
}

const Popver: React.FC<PopverProps> = ({
  children,
  content,
  title,
  placement = Placement.TOP,
  trigger = 'click',
  open,
  style = {},
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(open || false)
  const prevOpen = useRef(open)
  const triggerRef = useRef<string>(trigger)
  const arrowRef = useRef<SVGSVGElement>(null)
  const mergedOpen = open === undefined ? isOpen : open
  console.log('mergedOpen', mergedOpen, open, isOpen)
  const onOpenChangeFun: Function = useCallback(
    (open: boolean) => {
      if (open === undefined) {
        return setIsOpen
      } else {
        return () => {
          console.log('close')
        }
      }
    },
    [open]
  )
  const { refs, floatingStyles, context } = useFloating({
    open: mergedOpen,
    onOpenChange: onOpenChangeFun(),
    placement,
    middleware: [flip(), shift(), offset(10), arrow({ element: arrowRef })],
  })

  const triggers = pickTriggers(context, triggerRef.current)

  const { getReferenceProps, getFloatingProps } = useInteractions(triggers)

  const titleNode = (typeof title === 'function' ? title() : title) || 'Title'
  const contentNode = (typeof content === 'function' ? content() : content) || 'Content'

  useEffect(() => {
    if (open === undefined && prevOpen.current !== undefined) {
      setIsOpen(prevOpen.current)
    }
    prevOpen.current = open
  }, [open])

  useEffect(() => {
    if (mergedOpen) {
      onOpenChange?.(mergedOpen)
    }
  }, [mergedOpen])

  return (
    <>
      {React.cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      {mergedOpen && (
        <div
          className="popver-floating"
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...style }}
          {...getFloatingProps()}
        >
          <div className="popver-title">{titleNode}</div>
          <div className="popver-content">{contentNode}</div>
          <FloatingArrow ref={arrowRef} context={context} fill="#fff" strokeWidth={1} stroke="black" />
        </div>
      )}
    </>
  )
}

export default Popver
