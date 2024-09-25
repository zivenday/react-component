import { useCallback, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useTransition, animated } from '@react-spring/web'
type TodoType = {
  id: number | string
}
type TodoProps = TodoType & {
  onDrag?: (params: TodoType) => void
  onDrop?: (params: TodoType) => void
}
type TodoMarginProps = TodoType & {
  onDragHover?: (params: TodoType) => void
  onDrop?: (params: TodoType) => void
}
function DragableItem(params: TodoProps) {
  const { id, onDrag, onDrop } = params
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'dragItem',
      item: params,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [params]
  )
  const [, dropRef] = useDrop(
    () => ({
      accept: 'dragItem',
      drop: () => {
        onDrop?.(params)
      },
    }),
    [params]
  )

  useEffect(() => {
    if (isDragging) {
      onDrag?.(params)
    }
  }, [isDragging, params])

  return (
    <div ref={dropRef}>
      <div ref={dragRef} key={id} className="w-[600px] h-[40px] bg-blue-600">
        代办id{id}
      </div>
    </div>
  )
}

function DragMarginItem(params: TodoMarginProps) {
  const { id, onDrop, onDragHover } = params
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'add',

      drop: () => {
        onDrop?.(params)
      },
      collect: (m) => ({
        isOver: m!.isOver({ shallow: true }),
      }),
    }),
    [params]
  )
  useEffect(() => {
    const target = document.getElementById(id + '-margin-add') as HTMLElement
    if (isOver) {
      target!.dataset.dropHover = params.id + '-margin-add'
      onDragHover?.(params)
    } else {
      delete target?.dataset.dropHover
    }
  }, [isOver])

  return <div ref={drop} key={id + 'add'} id={id + '-margin-add'} className="w-[600px] h-[20px]"></div>
}

function App() {
  const [todos, setTodos] = useState<TodoType[]>([{ id: 0 }, { id: 1 }, { id: 2 }])
  const [isRubbishOver, setIsRubbishOver] = useState(false)
  const dragIndexRef = useRef<number>()
  const [, addRef] = useDrag(
    () => ({
      type: 'add',
    }),
    [todos]
  )

  const [, rubbish] = useDrop(
    () => ({
      accept: 'dragItem',
      hover: () => {
        setIsRubbishOver(true)
      },
      drop: (item: TodoProps) => {
        console.log('oo', item)
        setIsRubbishOver(false)
        setTodos([...todos.filter((todo) => todo.id !== item.id)])
      },
    }),
    [todos]
  )

  const handleItemDrop = useCallback(
    (item: TodoType) => {
      const dragIndex = dragIndexRef.current
      if (dragIndex === undefined) return
      console.log('-', item, dragIndex)
      const dropIndex = todos.findIndex((todo) => todo.id === item.id)
      const drop = { ...todos[dropIndex] }
      todos[dropIndex] = { ...todos[dragIndex] }
      todos[dragIndex] = drop
      setTodos([...todos])
      dragIndexRef.current = undefined
    },
    [todos]
  )
  const handleItemDrag = useCallback(
    (item: TodoType) => {
      const dragIndex = todos.findIndex((todo) => todo.id === item.id)
      dragIndexRef.current = dragIndex
    },
    [todos]
  )
  const handleMarginItemDrop = useCallback(
    (item: TodoType) => {
      const target = document.querySelector(`div[id='${item.id}-margin-add']`)
      const index = todos.findIndex((todo) => todo.id === item.id)
      if (target) {
        delete (target as HTMLElement).dataset.dropHover
      }
      todos.splice(index, 0, { id: performance.now() })
      setTodos([...todos])
    },
    [todos]
  )

  const transitions = useTransition(todos, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 60 },
    leave: { opacity: 0, height: 0 },
  })

  // transitions((style, item) => <animated.div style={style}>{item}</animated.div>)s

  return (
    <div className="flex">
      <div className="main w-[calc(100%-300px)] h-[100vh] bg-gray-300 ml-[20px] mt-[20px] flex flex-col items-center">
        {transitions((style, todo) => {
          return (
            <animated.div style={{ ...style }} key={todo.id}>
              {
                <>
                  <DragMarginItem {...todo} onDrop={handleMarginItemDrop} />
                  <DragableItem {...todo} key={todo.id} onDrop={handleItemDrop} onDrag={handleItemDrag} />
                </>
              }
            </animated.div>
          )
        })}
        {/* {todos.map((todo) => (
          <div key={todo.id}>
            <DragMarginItem {...todo} onDrop={handleMarginItemDrop}></DragMarginItem>
            <DragableItem {...todo} key={todo.id} onDrop={handleItemDrop} onDrag={handleItemDrag}></DragableItem>
          </div>
        ))} */}
      </div>
      <div className="side p-[20px]">
        <div
          ref={addRef}
          className="newTodao w-[300px] h-[40px] bg-green-500 mb-[20px]  flex items-center justify-center"
        >
          拖过去新增代办
        </div>
        <div ref={rubbish} className="rubbish w-[300px] h-[300px] bg-yellow-400  flex items-center justify-center">
          {isRubbishOver ? '松开删除该代办' : '垃圾箱'}
        </div>
      </div>
    </div>
  )
}

export default App
