// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type { BoxProps } from './Box';
import Box from './Box';  // eslint-disable-line no-duplicate-imports
import defaultTheme, {
  getTextSize,
  getTextLineHeight,
  getColor,
  getFontWeight,
  getFontFamily,
} from './defaultTheme';
import type { // eslint-disable-line no-duplicate-imports
  ThemeType,
  ThemeFontSize,
  ThemeColorName,
  ThemeFontFamily,
  ThemeFontWeight,
} from './defaultTheme';

type TextProps = BoxProps & {
  fontFamily?: ThemeFontFamily,
  fontWeight?: ThemeFontWeight,
  size?: ThemeFontSize,
  fontSize?: ThemeFontSize,
  align?: 'left' | 'right' | 'center' | 'justify',
  textAlign?: 'left' | 'right' | 'center' | 'justify',
  color?: ThemeColorName,
  decoration?: 'none' | 'underline' | 'line-through',
  textDecoration?: 'none' | 'underline' | 'line-through',
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase',
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase',
  italic?: boolean,
  bold?: boolean,
  lineHeight?: number | string,
};

type TextContext = {
  theme: ThemeType,
};

const computeTextStyle = (theme = defaultTheme, {
  fontFamily = theme.text.fontFamily,
  fontWeight = theme.text.fontWeight,
  size = theme.text.size,
  fontSize = size,
  align,
  textAlign = align,
  color = theme.text.color,
  decoration,
  textDecoration = decoration,
  transform,
  textTransform = transform,
  italic,
  bold,
  lineHeight,

  ...props
}) => {
  let style = {
    fontFamily: getFontFamily(fontFamily, theme),
  };

  const isNumber = /^-?\d+\.?\d*$/;

  if (color) {
    style = { ...style, color: getColor(color, theme) };
  }

  if (fontWeight) {
    style = { ...style, fontWeight: getFontWeight(fontWeight, theme) };
  }

  if (fontSize || fontSize === 0) {
    style = {
      ...style,
      fontSize: getTextSize(fontSize, theme),
      lineHeight: getTextLineHeight(fontSize, theme),
    };
  }

  if (lineHeight) {
    if (typeof lineHeight === 'number' || isNumber.test(lineHeight)) {
      style = { ...style, lineHeight: `${lineHeight}px` };
    } else {
      style = { ...style, lineHeight };
    }
  }

  if (textAlign) {
    style = { ...style, textAlign };
  }

  if (textDecoration) {
    style = { ...style, textDecoration };
  }

  if (textTransform) {
    style = { ...style, textTransform };
  }

  if (italic) {
    style = { ...style, fontStyle: 'italic' };
  }

  if (bold) {
    style = { ...style, fontWeight: 'bold' };
  }

  return [style, props];
};

class Text extends React.Component<TextProps> {
  props: TextProps

  render() {
    const { as, style, ...props } = this.props;
    const { theme }: TextContext = this.context;
    const [textStyle, restProps] = computeTextStyle(theme, props);
    return (
      <Box
        as={as}
        {...restProps}
        style={{
          ...textStyle,
          ...style,
        }}
      />
    );
  }
}

Text.contextTypes = {
  theme: PropTypes.object,
};

export default Text;
