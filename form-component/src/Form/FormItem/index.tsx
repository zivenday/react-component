import {
  PropsWithChildren,
  forwardRef,
  cloneElement,
  ReactNode,
  ReactElement,
  useContext,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
} from 'react'
import FormContext from '../FormContext'
import Schema from 'async-validator'

import styles from './index.module.scss'
import { error } from 'console'

interface FormItemProps {
  children: ReactElement
  name: string
  rules: Record<string, any>[]
}

const FormItem = forwardRef<HTMLDivElement, PropsWithChildren<FormItemProps>>((props, ref) => {
  const { children, name, rules } = props
  const inputRef = useRef(null)
  const [_, forceUpdate] = useState({})

  const { values = {}, setValues, onValueChange, setRefs } = useContext(FormContext)
  const [errors, setErrors] = useState<Record<string, any>[] | undefined>()

  useEffect(() => {
    setRefs?.((preRefs = {}) => ({ ...preRefs, [name]: { asyncValidValue } }))
  }, [setRefs])

  const asyncValidValue = (name: string, value: any) => {
    return new Promise((resolve, _) => {
      const validator = new Schema({ [name]: rules })
      validator.validate({ [name]: value }, (errors, data) => {
        console.log('ppp', errors, data)
        if (errors) {
          setErrors(errors)
          resolve({ [name]: errors })
        } else {
          setErrors(undefined)
          resolve({ [name]: undefined })
        }
      })
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (values[name] !== e.target.value) {
      const value = e.target.value
      setValues?.((preValues = {}) => ({ ...preValues, [name]: value }))
      onValueChange?.(name, value)
      children?.props?.onChange?.(value)
      asyncValidValue(name, value)
    }
  }

  function formartError(): string {
    return errors!.map((err) => `${err?.message}  `).join('')
  }
  console.log('////', styles)
  return (
    <div className={styles.formItem_a}>
      <div>
        {cloneElement(children, {
          onChange: handleChange,
          ref: inputRef,
          value: values[name],
        })}
      </div>
      {<div className={styles.errors}>{errors?.length ? formartError() : ''}</div>}
    </div>
  )
})

export default FormItem
