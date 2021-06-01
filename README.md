# Scroll Bound Animation

Change CSS properties of any HTML (SVG too) element and bind it with the scrolled position of the window. 🥳🤩

This library is fairly new 🐣 so I encourge people to [Report an issue]() in case you find something that doesn't work for you. We'll fix it instantly ⚡️⚡️

## Installation

```shell
npm install scroll-bound-animation --save
```

## Usage

Declare a new instance of class `ScrollBound` like: 👇

```js
  import ScrollBound from "scroll-bound-animation";
  var data = require("./animation.json");
  new ScrollBound(data);
```

Data is a JSON file of the following format 👇

```json
  {
    "<query-selector-for-element>": {
      "<CSS-property>": [
        {
          "animationHeightOffset": "<float><required>",
          "startAnimationValue": "<string><required>",
          "endAnimationValue": "<string><required>",
          "animationSpeed": "<integer><optional/default:1>"
        }
      ]
    }
  }
```

What does these mean?

- **<query-selector-for-element>**: string: Type the query selector as you'd enter for `document.querySelectorAll("")`(This is what's used behind the scenes 🥸). Eg: ".list > span", "#someId", "p". **This returns list of all the elements that gets selected and applies animation on all of it. Use it carefully 🧐**. Best Practice is to only give IDs to your elements 😎.
- **<CSS-property>**: string: This can be any CSS property that you want to animate and takes an integer value. For some nested properties like `transform` or `filter`, You need to add the nested property separted with a space. THe takes an array so that you can apply same property at multiple heights. Eg: "transform scaleX" or "opacity" or "left".
- **animationHeightOffset**: float: At scale of 100vh (100vh = 1 window height). Specifies height at which animation starts. Eg: 1, 1.5, 2.
- **startAnimationValue**: string: Starting point from which you want to vary the said CSS property. Eg: "0", "400px", "3rem", "-10%" etc.
- **endAnimationValue**: string: Ending point to which you want to vary the said CSS property. Eg: "1", "700px", "7rem", "100%" etc.
- **animationSpeed**: integer: Speed at which you want to complete the animation. Eg: 2 means animation will complete at twice the speed.

## Example

```json
  {
    "#right_page > .shp1": {
      "transform rotate": {
        "animationHeightOffset": 11.5,
        "startAnimationValue": "-90deg",
        "endAnimationValue": "1.59deg",
        "animationSpeed": 5.67
      }
    }
  }
```

Although this is the most complex supported query I could think of,🤕 I encourage you guys to be creative 😛
<!-- 
### Example sites:

- [WickedBrat.com](https://wickedbrat.com/?npm) -->

## Supported CSS Properties

This list is always under development 🤖. We're adding more and more properties as it is requested. You can't find your property listed here? [Report an issue](https://github.com/WickedBrat/scroll-bound-animation/issues/new) 🙏

- Numerical units like "0", "1", "-200"
- Distance units like "1rem", "50%", "200px", "-300%"
- Nested Units like "transform: scaleY(1.5) scaleX(1.2)"
