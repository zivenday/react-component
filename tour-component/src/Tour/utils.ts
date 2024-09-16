import { Step } from './interface'

export function getTargetRect(stepIndex: number, steps: Step[]) {
  const step = steps[stepIndex]

  const target = typeof step.target === 'function' ? step.target() : step.target

  const targetRect = target?.getBoundingClientRect() || {}
  console.log('/', stepIndex)

  return targetRect
}
