import Box from './Box';
import Text from './Text';
import defaultTheme from './defaultTheme';
import type { themeType } from './defaultTheme'; // eslint-disable-line no-duplicate-imports

export type { themeType };
export { default as Box } from './Box';
export { default as Text } from './Text';
export { default as defaultTheme } from './defaultTheme';

export default {
  Box,
  Text,
  defaultTheme,
};
