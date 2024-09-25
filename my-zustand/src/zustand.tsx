import React, { useRef, useState } from 'react'

type SetParamsType = (() => Record<string, any>) | Record<string, any>

class Store {
  state = {} as Record<string, any>
  update

  constructor(update: () => any) {
    this.update = update
  }

  set(params: SetParamsType) {
    if (typeof params === 'function') {
      this.state = { ...this.state, ...params() }
      this.update()
    } else {
      this.state = { ...this.state, ...params }
      this.update()
    }
  }

  initial(func: (params: Function) => Record<string, any>) {
    console.log('ppp0')
    const set = this.set.bind(this)
    const initialState = func(set)
    this.state = { ...this.state, ...initialState }
    const that = this
    return (callback: (state: Record<string, any>) => any) => {
      if (typeof callback === 'function') {
        return callback(that.state)
      } else {
        throw new Error('please use function in useStore')
      }
    }
  }
}

export const create = (func: (params: Function) => Record<string, any>) => {
  const [_, update] = useState({})
  const storeRef = useRef<any>({ store: undefined })
  if (!storeRef.current.store) {
    const store = new Store(() => update({}))
    storeRef.current.store = store
    storeRef.current.useStore = store.initial(func)
  }
  return storeRef.current.useStore
}
