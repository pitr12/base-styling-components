const defaultTheme = {
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
  tetxtScale: number[],
  text: {
    fontFamily: string,
    color: string,
    bold: 'bold' | 'normal' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  },
};

export default defaultTheme;
