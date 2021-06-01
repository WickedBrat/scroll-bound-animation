class Utils {
  private unitWindowHeight;
  constructor(unitWindowHeight: number) {
    this.unitWindowHeight = unitWindowHeight
  }

  getIntegerValueFromString(value: string) {
    var filtered = value.trim().split(/([0-9|.]+)/)
    return filtered[0] === '-' ?
      parseFloat(filtered[1]) * -1 :
      parseFloat(filtered[1]);
  }
  getIntegerUnitFromString(value: string) {
    return value.trim().split(/([0-9|.]+)/)[2];
  }

  getNormalisedPropertyValueAtScolledPosition(
    scrollPosition: number,
    offset: number,
    startAnimationValue: number,
    endAnimationValue: number,
    animationSpeed: number = 1
  ) {
    const heightOffset = this.unitWindowHeight * offset;
    let start = Math.abs(startAnimationValue)
    let end = Math.abs(endAnimationValue)
    if (end < start) 
      [start, end] = [end, start];
    let scrollValue = Math.min(
      end,
      Math.max(start,
        (scrollPosition / heightOffset - 1) * end * animationSpeed));
    
    if (endAnimationValue < startAnimationValue) {
      if (endAnimationValue < 0) 
        return scrollValue * -1;
      return end - scrollValue
    }
    return scrollValue;
  }


  setCSSProperty(htmlElement: HTMLElement | null, propertyName: string, value: number, unit: string, propertyNested: string) {
    let propertyValue = String(value) + unit;
    if (propertyNested) {
      let currentValue = htmlElement?.style.getPropertyValue(propertyName);
      propertyValue = currentValue?.replace(new RegExp(propertyNested + "\(.*\)", "g"), " ") + propertyNested + "(" + propertyValue + ")";
    }
    htmlElement?.style.setProperty(propertyName, propertyValue);
}
}
export default Utils;
