import { FormEvent, PropsWithChildren, forwardRef, useCallback, useContext, useImperativeHandle, useState } from 'react'

import FormContext from './FormContext'
import { error } from 'console'

interface FormProps {
  onValueChange?: (key: string, value: any) => void
  initialValues?: Record<string, any>
  onSubmit?: () => {}
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, any>) => void
  onFinish?: (values: Record<string, any>) => void
}

const Form = forwardRef<{}, PropsWithChildren<FormProps>>((props, ref) => {
  const { children, onValueChange, initialValues = {}, onFinishFailed, onFinish, ...others } = props

  const [values, setValues] = useState({ ...initialValues })
  const [refs, setRefs] = useState({})

  useImperativeHandle(
    ref,
    () => ({
      values,
      onSubmit: () => {
        handleSubmit()
      },
    }),
    [values]
  )
  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault()
      batchValidValues(values, refs)
    },
    [values, refs]
  )
  const batchValidValues = useCallback(
    (values: Record<string, any>, refs: Record<string, any>) => {
      const validPromiseList = Object.keys(refs).map((name) => refs[name]?.asyncValidValue(name, values[name]))
      Promise.all(validPromiseList).then((res) => {
        let errorMap = {}
        res.forEach((error) => {
          const name = Object.keys(error)[0]
          errorMap = error[name] ? { ...errorMap, ...error } : errorMap
        })
        if (Object.keys(errorMap).length) {
          onFinishFailed?.(values, errorMap)
        } else {
          onFinish?.(values)
        }
      })
    },
    [refs]
  )

  return (
    <FormContext.Provider value={{ values, setValues, onValueChange, setRefs }}>
      <form {...others} onSubmit={handleSubmit}>
        {children}
        <button type="submit"></button>
      </form>
    </FormContext.Provider>
  )
})

export default Form
