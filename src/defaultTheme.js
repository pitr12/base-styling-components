// @flow

// theme types
export type ThemeColorName = string | 'black' | 'gray' | 'white' | 'brandColor';
export type ThemeFontFamily = 'roboto' | 'roboto-condensed' | string;
export type ThemeFontWeight = 'light' | 'regular' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type ThemeFontSize = 0 | 1 | 2 | 3 | 4 | 5 | number | string;
export type ThemeScale = string | "small" | "medium" | "large";
export type ThemeBorderRadius = string | "small" | "medium" | "circle";
export type ThemeType = {
  scale: string[],
  scalePreset: {[ThemeScale]: string},
  borderRadius: {[ThemeBorderRadius]: string},
  fontFamily: {[ThemeFontFamily]: string},
  fontWeight: {[ThemeFontWeight]: number},
  textScale: string[],
  textLineHeight: string[],
  text: {
    fontFamily: ThemeFontFamily,
    fontWeight: ThemeFontWeight,
    color: ThemeColorName,
    size: ThemeFontSize,
  },
  colors: {[ThemeColorName]: string},
  getColor?: (string, any)=>string,
  getFontFamily?: (string, any)=>string,
  getFontWeight?: (ThemeFontWeight, any)=>number,
  getMarginOrPadding?: (ThemeScale | string | number, any)=>string,
  getRadius?: (ThemeBorderRadius | string | number, any)=>string,
  getTextLineHeight?: (number | string, any)=>string,
  getTextSize?: (number | string, any)=>string,
};

export const isNumber = /^-?\d+\.?\d*$/;

const theme: ThemeType = {
  /**
   * Margin & padding
   */
  scale: [
    '0px', '2px', '4px', '8px', '16px', '24px', '32px',
  ],
  scalePreset: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  /**
   * Border radius
   */
  borderRadius: {
    small: '4px',
    medium: '8px',
    circle: '10000px',
  },
  /**
   * Typo
   */
  fontFamily: {
    roboto: 'Roboto',
    'roboto-condensed': 'Roboto Condensed',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  textScale: [
    '10.5px', '12px', '14px', '16px', '20px', '28px',
  ],
  textLineHeight: [
    '16px', '18px', '20px', '24px', '26px', '36px',
  ],
  text: {
    fontFamily: 'roboto',
    fontWeight: 'regular',
    color: 'black',
    size: 2,
  },
  /**
   * Shared colors
   */
  colors: {
    black: '#121212',
    brandColor: '#121212',
    gray: '#e6e6e6',
    white: 'white',
  },
};

/**
 * Helper fns
 */
export function getColor(nameOrColor: string, currentTheme: any): string {
  return currentTheme.colors[nameOrColor] || nameOrColor;
}

export function getFontFamily(name: string, currentTheme: any): string {
  return currentTheme.fontFamily[name] || name;
}

export function getFontWeight(nameOrValue: ThemeFontWeight, currentTheme: any): number {
  // $FlowFixMe
  return currentTheme.fontWeight[nameOrValue] || nameOrValue;
}

export function getMarginOrPadding(
  nameOrValue: ThemeScale | string | number, currentTheme: any
): string {
  let val = nameOrValue;
  if (typeof nameOrValue === 'number' || isNumber.test(nameOrValue)) {
    val = parseFloat(val);
    return ((val < currentTheme.scale.length) ? currentTheme.scale[val] : `${val}px`);
  }
  val = currentTheme.scalePreset[nameOrValue];
  return val === undefined ? nameOrValue : val;
}

export function getRadius(
  nameOrValue: ThemeBorderRadius | string | number, currentTheme: any
): string {
  let val = nameOrValue;
  if (typeof nameOrValue === 'number' || isNumber.test(nameOrValue)) {
    return `${parseFloat(val)}px`;
  }
  val = currentTheme.borderRadius[nameOrValue];
  return val === undefined ? nameOrValue : val;
}

export function getTextLineHeight(size: number | string, currentTheme: any): string {
  if (typeof size === 'number' || isNumber.test(size)) {
    const value = parseFloat(size);
    return ((value < currentTheme.textLineHeight.length) ? currentTheme.textLineHeight[value] : `${value}px`);
  }
  return size;
}

export function getTextSize(size: number | string, currentTheme: any): string {
  if (typeof size === 'number' || isNumber.test(size)) {
    const value = parseFloat(size);
    return ((value < currentTheme.textScale.length) ? currentTheme.textScale[value] : `${value}px`);
  }
  return size;
}

/**
 * Also provide helpers as part of theme
 */
theme.getColor = getColor;
theme.getFontFamily = getFontFamily;
theme.getFontWeight = getFontWeight;
theme.getMarginOrPadding = getMarginOrPadding;
theme.getRadius = getRadius;
theme.getTextLineHeight = getTextLineHeight;
theme.getTextSize = getTextSize;

export default theme;
