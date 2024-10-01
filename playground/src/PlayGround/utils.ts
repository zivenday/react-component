import { useMemo, useRef } from 'react'
import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'
import { FileType } from './CodeEditor'

export function compress(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const str = strFromU8(zipped, true)
  return btoa(str)
}

export function uncompress(base64: string): string {
  const binary = atob(base64)

  const buffer = strToU8(binary, true)
  const unzipped = unzlibSync(buffer)
  return strFromU8(unzipped)
}

export const fileName2Language = (name: string) => {
  const suffix = name.split('.').pop() || ''
  if (['js', 'jsx'].includes(suffix)) return 'javascript'
  if (['ts', 'tsx'].includes(suffix)) return 'typescript'
  if (['json'].includes(suffix)) return 'json'
  if (['css'].includes(suffix)) return 'css'
  return 'javascript'
}

export const toShareUrl = (fileList: FileType[]) => {
  const hash = compress(encodeURIComponent(JSON.stringify(fileList)))
  const origin = window.location.origin
  const search = window.location.search
  console.log(location)
  console.log(`${origin}${search}#${hash}`)
  // 复制内容到剪贴板
  navigator.clipboard
    .writeText(`${origin}#${hash}`)
    .then(() => {
      alert('内容已复制到剪贴板')
    })
    .catch((err) => {
      alert('复制失败:' + err)
    })
}

type noop = (this: any, ...args: any[]) => any
type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>
export function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn) // why not write `fnRef.current = fn`? // https://github.com/alibaba/hooks/issues/728

  fnRef.current = useMemo<T>(() => fn, [fn])

  const memoizedFn = useRef<PickFunction<T>>()
  //   console.log('this', this)
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args: any[]) {
      return fnRef.current.apply(this, args)
    }
  }

  return memoizedFn.current as T
}

export const fileListFromHash = () => {
  const hash = window.location.hash.slice(1)
  if (isValidBase64(hash)) {
    const hashData = decodeURIComponent(uncompress(hash))
    const data = JSON.parse(hashData)
    if (Array.isArray(data)) {
      return data
    }
  }
  return null
}

export function isValidBase64(str: string) {
  // 长度检查
  if (str.length % 4 !== 0) return false

  // 正则表达式检查
  const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/
  return base64Pattern.test(str)
}
