import { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function useCookies(name: string) {
  const [value, setValue] = useState(Cookies.get(name))
  const setCookie = useCallback(
    (value: any) => {
      if (!value) {
        Cookies.set(name, value)
        setValue(value)
      } else {
        Cookies.set(name, JSON.stringify(value))
        setValue(JSON.stringify(value))
      }
    },
    [name]
  )
  const removeCookie = useCallback(() => {
    if (!value) return
    Cookies.remove(name)
    setCookie(null)
  }, [name])

  return [value, setCookie, removeCookie]
}

export default function App1() {
  const [token, setCookie, removeCookie] = useCookies('token')

  useEffect(() => {
    setCookie('123')
    console.log(token)
  }, [])
  return <div onClick={() => removeCookie()}>App1</div>
}
