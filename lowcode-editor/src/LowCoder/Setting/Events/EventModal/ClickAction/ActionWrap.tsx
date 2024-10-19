import { FC } from 'react'

interface ActionWrapProps {
  label: string
  children: React.ReactNode
  className?: string
}
const ActionWrap: FC<ActionWrapProps> = (props) => {
  const { label, children, className } = props
  return (
    <div className={`flex items-center  mb-2  ${className}`}>
      <div className="mr-2 break-all whitespace-nowrap flex-0 min-w-[100px] text-right">{label + '：'}</div>
      {children}
    </div>
  )
}

export default ActionWrap
