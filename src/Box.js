// @flow
import React from 'react';
import PropTypes from 'prop-types';
import defaultTheme, { getMarginOrPadding, getRadius, getColor } from './defaultTheme';
import type { ThemeType, ThemeColorName } from './defaultTheme'; // eslint-disable-line no-duplicate-imports

type MarginOrPadding = "small" | "medium" | "large" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | number | string;
type BorderRadius = "small" | "medium" | "circle" | string | number

export type BoxProps = {
  as?: string | () => React.Element<*>,
  style?: Object,
  m?: MarginOrPadding,
  margin?: MarginOrPadding,
  mh?: MarginOrPadding,
  marginHorizontal?: MarginOrPadding,
  mv?: MarginOrPadding,
  marginVertical?: MarginOrPadding,
  mb?: MarginOrPadding,
  marginBottom?: MarginOrPadding,
  ml?: MarginOrPadding,
  marginLeft?: MarginOrPadding,
  mr?: MarginOrPadding,
  marginRight?: MarginOrPadding,
  mt?: MarginOrPadding,
  marginTop?: MarginOrPadding,
  p?: MarginOrPadding,
  padding?: MarginOrPadding,
  ph?: MarginOrPadding,
  paddingHorizontal?: MarginOrPadding,
  pv?: MarginOrPadding,
  paddingVertical?: MarginOrPadding,
  pb?: MarginOrPadding,
  paddingBottom?: MarginOrPadding,
  pl?: MarginOrPadding,
  paddingLeft?: MarginOrPadding,
  pr?: MarginOrPadding,
  paddingRight?: MarginOrPadding,
  pt?: MarginOrPadding,
  paddingTop?: MarginOrPadding,
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
  background?: ThemeColorName,
  backgroundColor?: ThemeColorName,
  border?: string,
  borderBottomColor?: string,
  borderBottomWidth?: number | string,
  borderColor?: string,
  borderLeftColor?: string,
  borderLeftWidth?: number | string,
  borderRightColor?: string,
  borderRightWidth?: number | string,
  borderStyle?: 'solid' | 'dotted' | 'dashed',
  borderTopColor?: string,
  borderRadius?: BorderRadius,
  borderTopLeftRadius?: BorderRadius,
  borderTopRightRadius?: BorderRadius,
  borderBottomLeftRadius?: BorderRadius,
  borderBottomRightRadius?: BorderRadius,
  borderTopWidth?: number | string,
  borderWidth?: number | string,
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  display?: 'inline' | 'block' | 'flex' | 'inline-block' | 'box' | 'inline-flex' | 'inline-table' | 'list-item' | 'run-in' | 'table' | 'table-caption' | 'table-column-group' | 'table-header-group' | 'table-footer-group' | 'table-row-group' | 'table-cell' | 'table-column' | 'table-row' | 'none' | 'initial' | 'inherit',
  flexBasis?: number | string,
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: 'wrap' | 'nowrap',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  opacity?: number,
  overflow?: 'visible' | 'hidden' | 'scroll',
  position?: 'absolute' | 'relative' | 'fixed',
  verticalAlign?: string,
  zIndex?: number,
  boxSizing?: 'content-box' | 'border-box' | 'initial' | 'inherit',
};

type BoxContext = {
  renderer: any,
  theme: ThemeType,
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
  background,
  backgroundColor = background,
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
  display,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  opacity,
  overflow,
  position,
  verticalAlign,
  zIndex,
  boxSizing,

  ...props
}) => {
  let style = {
    position: 'relative',
    flexDirection: 'row',
    display: 'block',
    boxSizing: 'border-box',
  };

  const isNumber = /^-?\d+\.?\d*$/;

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
    if (maybeScaleProps[prop]) {
      style = { ...style, [prop]: getMarginOrPadding(maybeScaleProps[prop], theme) };
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
  };

  Object.keys(maybePixelProps).forEach((prop) => {
    let value = maybePixelProps[prop];
    if (value) {
      if (typeof value === 'number' || isNumber.test(value)) {
        value = parseFloat(value);
        style = { ...style, [prop]: `${value}px` };
      } else {
        style = { ...style, [prop]: value };
      }
    }
  });

  const borderRadiusProps = {
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
  };

  Object.keys(borderRadiusProps).forEach((prop) => {
    if (borderRadiusProps[prop]) {
      style = { ...style, [prop]: getRadius(borderRadiusProps[prop], theme) };
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
    let value = maybePercentageProps[prop];
    if (value) {
      if (typeof value === 'number' || isNumber.test(value)) {
        value = parseFloat(value);
        style = { ...style, [prop]: ((value > 0 && value <= 1) ? `${value * 100}%` : `${value}px`) };
      } else {
        style = { ...style, [prop]: value };
      }
    }
  });

  if (backgroundColor) {
    style = { ...style, backgroundColor: getColor(backgroundColor, theme) };
  }

  const otherProps = {
    flex,
    border,
    borderColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    alignItems,
    alignSelf,
    display,
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
    verticalAlign,
    zIndex,
    boxSizing,
  };

  Object.keys(otherProps).forEach((prop) => {
    const value = otherProps[prop];
    const isDefined = typeof value === 'number' || value;
    if (!isDefined) return;
    style = { ...style, [prop]: value };
  });

  return [style, props];
};

class Box extends React.Component {
  props: BoxProps;

  render() {
    const { as, style, ...props } = this.props;
    const { renderer, theme }: BoxContext = this.context;
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
  }
}

Box.contextTypes = {
  renderer: PropTypes.object,
  theme: PropTypes.object,
};

export default Box;
