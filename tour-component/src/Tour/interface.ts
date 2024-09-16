export type StepElement = HTMLElement | HTMLDivElement | null

export interface Step {
  target: (() => React.RefObject<StepElement>) | (() => StepElement) | React.RefObject<StepElement> | StepElement
  title: string
}

export interface TourProps {
  visible: boolean
  steps: Step[]
}
