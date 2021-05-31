export interface propertyAnimation {
  animationHeightOffset: number,
  startAnimationValue: string,
  endAnimationValue: string,
  animationSpeed?: number
}

export interface userAnimationInput {
  [key: string]: {[key: string]: propertyAnimation}
}
