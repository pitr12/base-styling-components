This package provides abstraction of UI using two basic React components `Box` and `Text`. It serves as a foundation for creating your own custom UI library. Moreover designed components are annotated using [Flow](https://flowtype.org/)

> Check out [CSS in JS: The Argument Refined](https://medium.com/@steida/css-in-js-the-argument-refined-471c7eb83955#.vt8tluumu) to dig deeper into the topic.

## Basic Usage

Install this package via:
```
npm i --save basic-styling-components
```
Prerequisites
* [Fela.js](http://fela.js.org/)
```
npm i --save fela@^4.2.0 fela-dom@^4.2.0 inline-style-prefixer@^2.0.1 react-fela@^4.2.0
```

Setup your APP for using [Fela.js](http://fela.js.org/):

* add style node to app `<header>` section where all styles will be injected:

```html
<style id="fela-stylesheet" type="text/css"></style>
```

* Setup Fela renderrer to prefix styles with vendor prefixes and wrap your app using Fela `<Provider>`:

```js
import { createRenderer } from 'fela';
import { Provider } from 'react-fela';
import prefixAll from 'inline-style-prefixer/static';

const prefixerPlugin = styleObject => prefixAll(styleObject);
const config = {
  plugins: [prefixerPlugin],
};
const renderer = createRenderer(config);
const mountNode = document.getElementById('fela-stylesheet');

<Provider renderer={renderer} mountNode={mountNode}>
  <App />
</Provider>
```

Box and Text components accepts cammelCased CSS properties. Use the Box component for visual containers and grids and use Text component for headers, labels and any other typography.
```js
// @flow
import { Box, Text } from 'base-styling-components';

<Box>basic div component</Box>
<Text as="h1">Heading 1</Text>
```

## Configuration
Basic style configuration is using specified defaultTheme with following attributes:

| Property  | Description |
| ------------- | ------------- |
| scale (array)  | scale used for margin and padding  |
| textScale (array)  | scale used for text size  |
| text | default text props |

Used default theme and specified theme flow type:
```javascript
// @flow
const defaultTheme: themeType = {
  scale: [
    0, 2, 4, 8, 16, 32, 64,
  ],
  textScale: [
    12, 16, 18, 24, 36, 48, 72,
  ],
  text: {
    fontFamily: 'Roboto,sans-serif',
    color: '#555',
    bold: 600,
  },
};

export type themeType = {
  scale: number[],
  textScale: number[],
  text: {
    fontFamily: string,
    color: string,
    bold: 'bold' | 'normal' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  },
};```

If you need to override default configuration or add some new attributes (eg. commonly used colors) you can do it by providing your own theme which will follow specified Flow theme type. You can pass your custom theme usgin Fela <ThemeProvider> which will pass defined theme to all child components using context.
```js
// @flow
import { ThemeProvider } from 'react-fela';
import { defaultTheme } from 'base-styling-components';
import type { themeType } from 'base-styling-components';

const myCustomTheme: themeType = {
  ...defaultTheme,
  scale: [0, 10, 20, 30, 40, 100, 120],
  colors: {
    color1: "#000000",
  },
};

<ThemeProvider theme={myCustomTheme}>
  <App />
</ThemeProvider>
```

### Elements
Rendered element can be changed via `as` prop (default element is `<div>`):
```html
<Box as="button">
  basic button component
</Box>
```

### Accepted props
#### Margin and Padding
Margin and padding can be controlled using `m` and `p` props. They accept simple number value e.g `m={4}` or text value `m="10px"`. If supplied number value is from range of indexes in set config scale value from supplied scale is used.

```html
<Box
  p={5} //padding 32px will be aplied
>
  box component
</Box>
```

Margin and padding can be expressed using basic camelCase props such as `margin, padding, marginTop, paddingTop, marginHorizontal, marginVertical etc.` or using following shorthand props:

| Prop  | Meaning |
| ------------- | ------------- |
|  m  | margin |
|  mt  | margin-top |
|  mb  | margin-bottom |
|  ml  | margin-left |
|  mr  | margin-right |
|  mv  | margin-top and bottom |
|  mh  | margin-left and right |
|  p  | padding |
|  pt  | padding-top |
|  pb  | padding-bottom |
|  pl  | padding-left |
|  pr  | padding-right |
|  pv  | padding-top and bottom |
|  ph  | padding-left and right |

#### Width and Height
CSS properties representing width and height such as `width, height, maxWidth, minHeight etc.` accepts number value or text value. If supplied number value is from range 0-1 value is represented as percentage, otherwise it is represented as pixel value.

```html
<Box
  width={1/2} //50% width div
>
  box component
</Box>
```

#### Pixel props
CSS props which should receive value with unit and will be supplied without specified unit will be represented as `px`.

Eg. `borderWidth={10} //10px`

#### Font Size
Font size in Text component can be set using `size` property. It accepts simple number value or text value. If supplied number value is from range of indexes in set config textScale value from supplied scale is used. If number is grater than number of scale indexes, value is represented as px.

```javascript
<Text size={5}>Some text</Text> //fontSize: 48px
<Text size={20}>Some text</Text> //fontSize: 20px
```

#### Typography
Other typography styles can be set using following props

| Property  | Description / Accepted values |
| ------------- | ------------- |
| align  | 'left' / 'right' / 'center' / 'justify' |
| bold  | boolean to set text as bold |
| italic  | boolean to set text as italic |
| decoration  | 'none' / 'underline' / 'line-through' |
| transform  | 'none' / 'capitalize' / 'uppercase' / 'lowercase' |

#### Custom CSS
If you need to specify custom css property eg. media-query or some pseudo classes property `style` can be used.

```html
<Box
  as="button"
  backgroundColor="red"
  style={{
    ':hover': {
       backgroundColor: 'green',
    },
  }}
>
  hover buttonn
</Box>
```

### List of all accepted propos
#### Box component
*   m,
*   margin,
*   mv,
*   marginVertical,
*   mh,
*   marginHorizontal,
*   mt,
*   marginTop,
*   mb,
*   marginBottom,
*   ml,
*   marginLeft,
*   mr,
*   marginRight,
*   p,
*   padding,
*   pv,
*   paddingVertical,
*   ph,
*   paddingHorizontal,
*   pt,
*   paddingTop,
*   pb,
*   paddingBottom,
*   pl,
*   paddingLeft,
*   pr,
*   paddingRight,
*   height,
*   maxHeight,
*   maxWidth,
*   minHeight,
*   minWidth,
*   width,
*   bottom,
*   left,
*   right,
*   top,
*   flex,
*   backgroundColor,
*   border,
*   borderColor,
*   borderBottomColor,
*   borderLeftColor,
*   borderRightColor,
*   borderTopColor,
*   borderRadius,
*   borderBottomLeftRadius,
*   borderBottomRightRadius,
*   borderTopLeftRadius,
*   borderTopRightRadius,
*   borderWidth,
*   borderBottomWidth,
*   borderLeftWidth,
*   borderRightWidth,
*   borderTopWidth,
*   borderStyle,
*   alignItems,
*   alignSelf,
*   flexBasis,
*   flexDirection,
*   flexGrow,
*   flexShrink,
*   flexWrap,
*   justifyContent,
*   opacity,
*   overflow,
*   position,
*   zIndex,

#### Text component
Text component is just wrapper around Box component so all Box props can be passed too.

*   fontFamily,
*   size,
*   fontSize,
*   align,
*   textAlign,
*   bold,
*   color,
*   decoration,
*   textDecoration,
*   transform,
*   textTransform,
*   italic,
*   lineHeight,


## License

*basic-styling-components* are available under MIT. See LICENSE for more details.
