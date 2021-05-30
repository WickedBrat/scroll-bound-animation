class Utils {
  private unitWindowHeight;
  constructor(unitWindowHeight: number) {
    this.unitWindowHeight = unitWindowHeight
  }

  getIntegerValueFromString(value: string) {
    var filtered = value.trim().split(/([0-9]+)/)
    return filtered[0] === '-' ?
      parseInt(filtered[1]) * -1 :
      parseInt(filtered[1]);
  }
  getIntegerUnitFromString(value: string) {
    return value.trim().split(/([0-9]+)/)[2];
  }

  getNormalisedPropertyValueAtScolledPosition(
    scrollPosition: number,
    offset: number,
    startAnimationValue: number,
    endAnimationValue: number,
    animationSpeed: number = 1
  ) {
    const heightOffset = this.unitWindowHeight * offset;

    if (endAnimationValue < startAnimationValue) {
      [startAnimationValue, endAnimationValue] = [endAnimationValue, startAnimationValue];
      return (
        endAnimationValue -
        Math.min(
          endAnimationValue,
          Math.max(
            startAnimationValue,
            (scrollPosition / heightOffset - 1) * endAnimationValue * animationSpeed))
      );
    }
    return Math.min(
      endAnimationValue,
      Math.max(startAnimationValue,
        (scrollPosition / heightOffset - 1) * endAnimationValue * animationSpeed));
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
