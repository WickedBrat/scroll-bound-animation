import {userAnimationInput} from './model';
import Utils from './utils';

export default class ScrollBound {
  private scrollPosition = 0;
  private utils = new Utils(window.innerHeight)

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

  private applyAnimation(element: userAnimationInput) {
    const queryString = Object.keys(element)[0];
    const htmlElement = document.querySelectorAll(queryString) as NodeListOf<HTMLElement>;

    element[queryString].forEach(property => {
      const propertyName = Object.keys(property)[0];
      var propertyNested = propertyName.split(".");

      const propertyValueAtScroll = this.utils.getNormalisedPropertyValueAtScolledPosition(
        this.scrollPosition,
        property[propertyNested[0]].animationHeightOffset,
        this.utils.getIntegerValueFromString(property[propertyNested[0]].startAnimationValue),
        this.utils.getIntegerValueFromString(property[propertyNested[0]].endAnimationValue),
        property[propertyNested[0]].animationSpeed);

      htmlElement.forEach(targetElement => {
        this.utils.setCSSProperty(
          targetElement,
          propertyNested[0],
          propertyValueAtScroll,
          this.utils.getIntegerUnitFromString(property[propertyNested[0]].startAnimationValue),
          propertyNested[1]);
      })
    }); 
  }
}
