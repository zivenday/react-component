import { useRef } from 'react'

export function useLasted(value: any) {
  const ref = useRef(value)
  ref.current = value
  return ref
}
