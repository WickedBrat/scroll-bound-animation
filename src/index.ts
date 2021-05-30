import {userAnimationInput} from './model';

export default class ScrollBound {
  private scrollPosition = 0;
  private unitWindowHeight = window.innerHeight;

  /**
   * animateElement
   * params: array of map containing
   *  elementID: string: ID of the element to be animated.
   *  propertyToBeElement: string[]: List of CSS property names.
   *  animationHeigtOffset: number: In terms of 100vh. Eg: val=1 means animation will start when window is scrolled 100vh.
   *  startAnimationValue: number: starting value of the animation.
   *  endAnimationValue: number: end value of the animation.
   */
  constructor (input:userAnimationInput[]) {
    window.addEventListener("scroll", () => {
      this.scrollPosition = window.pageYOffset;      
      input.forEach(element => {
        this.applyAnimation(element);
      });
    });
  }

  private getNormalisedPropertyValueAtScolledPosition(
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
            (this.scrollPosition / heightOffset - 1) * endAnimationValue * animationSpeed))
      );
    }
    return Math.min(
      endAnimationValue,
      Math.max(startAnimationValue,
        (this.scrollPosition / heightOffset - 1) * endAnimationValue * animationSpeed));
  }

  private setCSSProperty(htmlElement: HTMLElement | null, propertyName: string, value: number) {
      htmlElement?.style.setProperty(propertyName, String(value));
  }

  private applyAnimation(element: userAnimationInput) {
    const elementID = Object.keys(element)[0];
    const htmlElement = document.getElementById(elementID);

    element[elementID].forEach(property => {
      const propertyName = Object.keys(property)[0];
      const propertyValueAtScroll = this.getNormalisedPropertyValueAtScolledPosition(
        property[propertyName].animationHeightOffset,
        property[propertyName].startAnimationValue,
        property[propertyName].endAnimationValue,
        property[propertyName].animationSpeed);
      this.setCSSProperty(htmlElement, propertyName, propertyValueAtScroll);
    }); 
  }
}
