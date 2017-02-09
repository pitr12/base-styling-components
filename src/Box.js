// @flow
import React, { PropTypes } from 'react';
import defaultTheme from './defaultTheme';
import type { themeType } from './defaultTheme'; // eslint-disable-line no-duplicate-imports

export type BoxProps = {
  as?: () => React.Element<*> | string,
  style?: Object,
  m?: number | string,
  margin?: number | string,
  mh?: number | string,
  marginHorizontal?: number | string,
  mv?: number | string,
  marginVertical?: number | string,
  mb?: number | string,
  marginBottom?: number | string,
  ml?: number | string,
  marginLeft?: number | string,
  mr?: number | string,
  marginRight?: number | string,
  mt?: number | string,
  marginTop?: number | string,
  p?: number | string,
  padding?: number | string,
  ph?: number | string,
  paddingHorizontal?: number | string,
  pv?: number | string,
  paddingVertical?: number | string,
  pb?: number | string,
  paddingBottom?: number | string,
  pl?: number | string,
  paddingLeft?: number | string,
  pr?: number | string,
  paddingRight?: number | string,
  pt?: number | string,
  paddingTop?: number | string,
  height?: number | string,
  maxHeight?: number | string,
  maxWidth?: number | string,
  minHeight?: number | string,
  minWidth?: number | string,
  width?: number | string,
  bottom?: number | string,
  left?: number | string,
  right?: number | string,
  top?: number | string,
  flex?: number,
  backgroundColor?: string,
  border?: string,
  borderBottomColor?: string,
  borderBottomLeftRadius?: number,
  borderBottomRightRadius?: number,
  borderBottomWidth?: number,
  borderColor?: string,
  borderLeftColor?: string,
  borderLeftWidth?: number,
  borderRadius?: number,
  borderRightColor?: string,
  borderRightWidth?: number,
  borderStyle?: 'solid' | 'dotted' | 'dashed',
  borderTopColor?: string,
  borderTopLeftRadius?: number,
  borderTopRightRadius?: number,
  borderTopWidth?: number,
  borderWidth?: number,
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  flexBasis?: number | string,
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: 'wrap' | 'nowrap',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  opacity?: number,
  overflow?: 'visible' | 'hidden' | 'scroll',
  position?: 'absolute' | 'relative' | 'fixed',
  zIndex?: number,
};

type BoxContext = {
  renderer: any,
  theme: themeType,
};

const computeBoxStyle = (theme = defaultTheme, {
  m,
  margin = m,
  mv = margin,
  marginVertical = mv,
  mh = margin,
  marginHorizontal = mh,
  mt = marginVertical,
  marginTop = mt,
  mb = marginVertical,
  marginBottom = mb,
  ml = marginHorizontal,
  marginLeft = ml,
  mr = marginHorizontal,
  marginRight = mr,
  p,
  padding = p,
  pv = padding,
  paddingVertical = pv,
  ph = padding,
  paddingHorizontal = ph,
  pt = paddingVertical,
  paddingTop = pt,
  pb = paddingVertical,
  paddingBottom = pb,
  pl = paddingHorizontal,
  paddingLeft = pl,
  pr = paddingHorizontal,
  paddingRight = pr,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  width,
  bottom,
  left,
  right,
  top,
  flex,
  backgroundColor,
  border,
  borderColor,
  borderBottomColor,
  borderLeftColor,
  borderRightColor,
  borderTopColor,
  borderRadius,
  borderBottomLeftRadius = borderRadius,
  borderBottomRightRadius = borderRadius,
  borderTopLeftRadius = borderRadius,
  borderTopRightRadius = borderRadius,
  borderWidth,
  borderBottomWidth = borderWidth,
  borderLeftWidth = borderWidth,
  borderRightWidth = borderWidth,
  borderTopWidth = borderWidth,
  borderStyle,
  alignItems,
  alignSelf,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  opacity,
  overflow,
  position,
  zIndex,

  ...props
}) => {
  let style = {
    position: 'relative',
    flexDirection: 'row',
    display: 'flex',
  };

  const maybeScaleProps = {
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  };

  Object.keys(maybeScaleProps).forEach((prop) => {
    const value = maybeScaleProps[prop];
    if (typeof value === 'number') {
      style = {
        ...style,
        [prop]: ((value < theme.scale.length) ? `${theme.scale[value]}px` : `${value}px`),
      };
    } else if (value) {
      style = { ...style, [prop]: value };
    }
  });

  const maybePixelProps = {
    bottom,
    left,
    right,
    top,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
  };

  Object.keys(maybePixelProps).forEach((prop) => {
    const value = maybePixelProps[prop];
    if (typeof value === 'number') {
      style = { ...style, [prop]: `${value}px` };
    } else if (value) {
      style = { ...style, [prop]: value };
    }
  });

  const maybePercentageProps = {
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width,
  };

  Object.keys(maybePercentageProps).forEach((prop) => {
    const value = maybePercentageProps[prop];
    if (typeof value === 'number') {
      style = { ...style, [prop]: ((value > 0 && value <= 1) ? `${value * 100}%` : `${value}px`) };
    } else if (value) {
      style = { ...style, [prop]: value };
    }
  });

  const otherProps = {
    flex,
    backgroundColor,
    border,
    borderColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    alignItems,
    alignSelf,
    borderStyle,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    justifyContent,
    opacity,
    overflow,
    position,
    zIndex,
  };

  Object.keys(otherProps).forEach((prop) => {
    const value = otherProps[prop];
    const isDefined = typeof value === 'number' || value;
    if (!isDefined) return;
    style = { ...style, [prop]: value };
  });

  return [style, props];
};

const Box = ({
  as,
  style,
  ...props
}: BoxProps, {
  renderer,
  theme,
}: BoxContext) => {
  const Component = as || 'div';
  const [boxStyle, restProps] = computeBoxStyle(theme, props);
  const rule = renderer.renderRule(() => ({
    ...boxStyle,
    ...style,
  }));
  return (
    <Component
      {...restProps}
      {...{ className: rule }}
    />
  );
};

Box.contextTypes = {
  renderer: PropTypes.object,
  theme: PropTypes.object,
};

export default Box;
