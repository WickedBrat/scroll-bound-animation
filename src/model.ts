export interface propertyAnimation {
  animationHeightOffset: number,
  startAnimationValue: number,
  endAnimationValue: number,
  animationSpeed?: number
}

export interface userAnimationInput {
  [key: string]: {[key: string]: propertyAnimation}[]
}
