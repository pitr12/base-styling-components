import React from 'react';
import { createRenderer } from 'fela';
import { Provider, ThemeProvider } from 'react-fela';
import prefixAll from 'inline-style-prefixer/static';
import { defaultTheme } from '../../src';

const prefixerPlugin = styleObject => prefixAll(styleObject);
const config = {
  plugins: [prefixerPlugin],
};
const felaRenderer = createRenderer(config);

const nextMountNode = document.createElement('style');
nextMountNode.id = 'fela-stylesheet';
document.head.appendChild(nextMountNode);

const rendererWithContext = node => (
  <Provider renderer={felaRenderer} mountNode={nextMountNode}>
    <ThemeProvider theme={defaultTheme}>
      {node}
    </ThemeProvider>
  </Provider>
);


export default rendererWithContext;
