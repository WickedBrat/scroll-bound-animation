import {userAnimationInput, propertyAnimation} from './model';
import Utils from './utils';
import * as lodash from 'lodash';

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
  constructor (input:userAnimationInput) {
    window.addEventListener("scroll", (() => {
      this.scrollPosition = window.pageYOffset;      
      Object.keys(input).forEach((element: string) => {
        this.applyAnimation(input[element], element);
      });
    }));
  }

  private applyAnimation(elementProperties: { [key: string]: [propertyAnimation]; }, elementQuerySelector: string) {
    const htmlElements = document.querySelectorAll(elementQuerySelector) as NodeListOf<HTMLElement>;
    const elementPropertyList = Object.keys(elementProperties);

      elementPropertyList.forEach((propertyName: string) => {

        var propertyNested = propertyName.split(" ");
        
        elementProperties[propertyName].forEach(heightProperty => {
          const startValue = this.utils.getIntegerValueFromString(heightProperty.startAnimationValue);
          const endValue = this.utils.getIntegerValueFromString(heightProperty.endAnimationValue);
          if (!(
            this.scrollPosition >= window.innerHeight * heightProperty.animationHeightOffset)) {
            return;
          }
          const propertyValueAtScroll = this.utils.getNormalisedPropertyValueAtScolledPosition(
            this.scrollPosition,
            heightProperty.animationHeightOffset,
            startValue,
            endValue,
            heightProperty.animationSpeed);
  
            htmlElements.forEach((element: HTMLElement) => {
  
              this.utils.setCSSProperty(
                element,
                propertyNested[0],
                propertyValueAtScroll,
                this.utils.getIntegerUnitFromString(heightProperty.startAnimationValue),
                propertyNested[1]);
            });
        })
      });
  }
}
