import { ChangeEvent, ChangeEventHandler, RefObject, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './Form'
import FormItem from './Form/FormItem'
import { Button, Input } from 'antd'

function App() {
  const formRef = useRef(null)
  const handleClick = () => {
    console.log(formRef.current?.values)
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('0000', e)
  }
  const initialValues = {
    name: 12,
  }
  const handleFinish = (values) => {
    console.log('finish', values)
  }
  const handleFinishFailed = (values, errors) => {
    console.log('failed', values, errors)
  }
  return (
    <>
      <Input
        ref={(dom) => {
          console.log('ppp---')
        }}
      ></Input>
      <Form ref={formRef} initialValues={initialValues} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
        <FormItem
          name="name"
          rules={[
            { required: true, message: '请输入提现金额', trigger: 'blur' },
            { type: 'number', transform: Number, message: '请输入正确的提现金额', trigger: 'blur' },
          ]}
        >
          <Input onChange={handleChange}></Input>
        </FormItem>
      </Form>
      <Button onClick={handleClick}>提交</Button>
    </>
  )
}

export default App
