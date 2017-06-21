// @flow
import {
  getColor,
  getFontFamily,
  getFontWeight,
  getMarginOrPadding,
  getRadius,
  getTextLineHeight,
  getTextSize,
} from './defaultTheme';
import type { // eslint-disable-line no-duplicate-imports
  ThemeType,
  ThemeColorName,
  ThemeFontFamily,
  ThemeFontWeight,
  ThemeFontSize,
  ThemeScale,
  ThemeBorderRadius,
} from './defaultTheme';

export type {
  ThemeType,
  ThemeColorName,
  ThemeFontFamily,
  ThemeFontWeight,
  ThemeFontSize,
  ThemeScale,
  ThemeBorderRadius,
};
export { default as Box } from './Box';
export { default as Text } from './Text';
export { default as defaultTheme } from './defaultTheme';

export {
  getColor,
  getFontFamily,
  getFontWeight,
  getMarginOrPadding,
  getRadius,
  getTextLineHeight,
  getTextSize,
};
