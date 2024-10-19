import { Dispatch, MutableRefObject, RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd/dist/hooks/useDrop'
import { Actions, Component, useComponentsStore, getComponentById } from '../stores'
import { createId4Component, debounce, hasClass, toJsonString } from '../utils'
import { useDrag } from 'react-dnd/dist/hooks/useDrag'

export type Position = {
  x: number
  y: number
  width: number
  height: number
  labelLeft?: number
  labelTop?: number
}

const EDITOR_CLASS_NAMES = ['click-editor', 'hover-editor']

// 判断是否是编辑器
const isEditor = (target: HTMLElement) => {
  return hasClass(target, EDITOR_CLASS_NAMES)
}

// 遍历树 获取目标元素和id
const treeWalk = (target: HTMLElement, id: number) => {
  let newId = id
  let newTarget = target
  // 遍历树 获取目标元素和id
  while (newTarget && !isEditor(newTarget)) {
    // 获取元素的id
    if (newTarget.dataset?.id) {
      newId = +newTarget.dataset.id
      break
    }
    newTarget = newTarget.parentElement as HTMLElement
  }
  return { target: newTarget, id: newId }
}

// 添加编辑光标data-edit-cursor
const addEditCursorDataSet = (target: HTMLElement) => {
  removeEditCursor()
  target.setAttribute('data-edit-cursor', 'move')
}

// 移除编辑光标data-edit-cursor
const removeEditCursor = () => {
  const selector = `[data-edit-cursor="move"]`
  const all = Array.from(document.querySelectorAll(selector))
  all.forEach((item) => {
    item.removeAttribute('data-edit-cursor')
  })
}

const getPostion = (el: HTMLElement, container?: HTMLElement) => {
  container = container ?? el
  const id = el.dataset.id
  const containerId = container.dataset.id as string
  const isContainerEl = id === containerId

  // 获取元素的边界
  const rect = el.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  // 获取元素的宽度
  const width = isContainerEl ? container.scrollWidth : rect.width
  const height = isContainerEl ? container.scrollHeight : rect.height

  // 获取元素的滚动距离
  const scrollLeft = isContainerEl ? 0 : container.scrollLeft
  const scrollTop = isContainerEl ? 0 : container.scrollTop

  //
  const left = rect.left - containerRect.left + scrollLeft
  const top = rect.top - containerRect.top + scrollTop

  return { x: left, y: top, width, height }
}

const getElByDataId = (id: number | string) => {
  return document.querySelector(`[data-id="${id}"]`) as HTMLElement
}

export const useComponentDrop = (
  accept: string[],
  containerId: number,
  deps?: any[],
  beforeHandleDrop?: (item: Record<string, any>) => void
) => {
  const { addComponent, delComponent, components } = useComponentsStore()

  const handleDrop = (item: any) => {
    if (item.dragType === 'move') {
      const component = getComponentById(item.id, components) as Component
      if (component) {
        beforeHandleDrop?.(component)
        delComponent?.({ ...component })
        addComponent?.(component, containerId)
      }
    } else {
      const component = createId4Component(item)
      beforeHandleDrop?.(component)
      addComponent?.(component, containerId)
    }
  }
  // console.log('collect containerId', containerId)
  return useBaseDrop(accept, handleDrop, deps)
}

export const useBaseDrop = (
  accept: string[],
  dropCallback?: (component: Component, monitor?: any) => void,
  deps?: any[]
) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: accept,
      drop: (_, monitor) => {
        const didDrop = monitor?.didDrop()
        // console.log('didDrop', didDrop)
        if (didDrop) {
          return
        }
        dropCallback?.(monitor.getItem(), monitor)
      },
      collect: (monitor) => {
        // console.log(
        //   'collect',
        //   monitor.isOver(),
        //   monitor.isOver({ shallow: true }),
        //   monitor.canDrop(),
        //   monitor.didDrop(),
        //   containerId
        // )
        return {
          isOver: !!monitor.isOver(),
          isOverCurrent: !!monitor.isOver({ shallow: true }),
        }
      },
    }),
    deps || []
  )

  return [{ isOver, isOverCurrent }, drop] as const
}

export const useBaseDrag = (type: string, dataId?: number, defaultItem?: Object) => {
  const { setIsDragging } = useComponentsStore()
  const _defaultItem = defaultItem ?? {}
  // console.log('useBaseDrag', type, dataId)
  const [{ isSelfDragging }, drag] = useDrag({
    type,
    item: {
      id: dataId,
      ..._defaultItem,
    },
    collect: (monitor: any) => ({
      isSelfDragging: monitor.isDragging() as boolean,
    }),
  })

  useEffect(() => {
    setIsDragging(isSelfDragging)
  }, [isSelfDragging])

  return [{ isSelfDragging }, drag] as const
}

const createUpdater = (set: Dispatch<SetStateAction<Position | undefined>>) => {
  return function (...args: any[]) {
    set((prev) => {
      const [position] = args
      if (!position) return undefined
      const { x, y, width, height } = position
      const diff = prev?.x !== x || prev?.y !== y || prev?.width !== width || prev?.height !== height
      return diff
        ? {
            x,
            y,
            width,
            height,
          }
        : prev
    })
  }
}

export const useClickPosition = (
  containerSelector: string,
  activeComponent: Component,
  idChange: (id: number) => void,
  isDragging: boolean
) => {
  // const { styles, children } = activeComponent ?? {}

  const [position, setPosition] = useState<Position | undefined>(undefined)
  const [resizing, setResizing] = useState(false)

  const idRef = useRef<number>(activeComponent.id)
  const firstRender = useRef(true)

  const updater = createUpdater(setPosition)

  const updatePosition = () => {
    const el = getElByDataId(idRef.current)
    if (!el) return
    const container = document.querySelector(containerSelector) as HTMLElement
    const position = getPostion(el, container)
    updater(position)
    firstRender.current = false
  }

  const debouncedUpdatePosition = useCallback(
    debounce(() => {
      if (firstRender.current) return
      setResizing(false)
      updatePosition()
    }, 800),
    []
  )

  const handleClick = (e: MouseEvent) => {
    let target = e.target as HTMLElement

    let newId = +(target.dataset.id ?? -1)

    const { id: _newId, target: _target } = treeWalk(target, newId)

    if (_newId === -1) return
    if (_newId === idRef.current) return

    idRef.current = _newId
    setTimeout(() => {
      updatePosition()
      idChange?.(_newId)
    }, 100)
  }
  //   console.log('useClickPosition')
  //初始化
  useEffect(() => {
    const el = document.querySelector(containerSelector) as HTMLElement
    if (!el) return

    const resizeObserver = new ResizeObserver(() => {
      setResizing(true)
      debouncedUpdatePosition()
    })

    setTimeout(() => {
      el?.addEventListener('click', handleClick)
      resizeObserver.observe(el)
      updatePosition()
    }, 800)

    return () => {
      resizeObserver!.disconnect()
      el?.removeEventListener('click', handleClick)
    }
  }, [])

  // 当选中组件样式变化时,获取孩子节点发生变化时 更新位置
  useEffect(() => {
    if (!firstRender.current) {
      idRef.current = activeComponent.id
      setTimeout(() => {
        updatePosition()
      }, 100)
    }
  }, [toJsonString(activeComponent)])

  useEffect(() => {
    if (!firstRender.current) {
      updatePosition()
    }
  }, [isDragging])

  return [{ resizing }, position, +(idRef.current ?? -1), { updatePosition }] as const
}

export const useMovePosition = (containerSelector: string, isDragging: boolean) => {
  const [position, setPosition] = useState<Position | undefined>(undefined)
  //   const moveTargetRef = useRef<HTMLElement | null>(null)
  const idRef = useRef<number>()

  const updater = createUpdater(setPosition)

  const updatePosition = (el: HTMLElement, container?: HTMLElement) => {
    if (!el) return
    container = container ?? el
    const position = getPostion(el, container)
    updater(position)
  }

  const clearPosition = () => {
    // updater(undefined)
    setPosition(undefined)
  }

  useEffect(() => {
    if (idRef.current) {
      clearPosition()
    }
  }, [isDragging])

  useEffect(() => {
    const container = document?.querySelector(containerSelector) as HTMLElement
    if (!container) return
    const handleMouseMove = (e: MouseEvent) => {
      let target = e.target as HTMLElement

      let newId = +(target.dataset.id ?? -1)

      const { id: _newId, target: _target } = treeWalk(target, newId)

      //没有id 的元素不需要高亮边框和hoverBar 去除id
      if (_newId < 0) {
        updater(undefined)
        return
      }
      if (idRef.current !== _newId) {
        idRef.current = _newId
        updatePosition(_target, container)
      }
    }
    const handleMouseLeave = () => {
      idRef.current = -1
      updater(undefined)
    }
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    // console.log(isCursor, position, idRef.current)
    return () => {
      //   removeEditCursor()
      idRef.current = -1
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return [position, +(idRef.current ?? -1), { updatePosition, clearPosition }] as const
}

export const useLastest = <T>(value: T) => {
  const ref = useRef<T>(value)
  ref.current = value
  return ref
}
function clearPosition() {
  throw new Error('Function not implemented.')
}
