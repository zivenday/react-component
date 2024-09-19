import React, { useContext } from 'react'
export default function useFormContext(context) {
  const cx = useContext(context)
  if (!cx) throw new Error('please add Provider on root node!')
  return cx
}
