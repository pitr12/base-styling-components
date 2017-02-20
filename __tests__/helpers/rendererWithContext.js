import React from 'react';
import { createRenderer } from 'fela';
import { Provider, ThemeProvider } from 'react-fela';
import prefixAll from 'inline-style-prefixer/static';
import { defaultTheme } from '../../src';

const createFelaRenderer = () => {
  const prefixerPlugin = styleObject => prefixAll(styleObject);
  const config = {
    plugins: [prefixerPlugin],
  };
  return createRenderer(config);
};

const getNextMountNode = () => {
  const nextMountNode = document.createElement('style');
  nextMountNode.id = 'fela-stylesheet';
  const mountNode = document.getElementById('fela-stylesheet');

  if (mountNode) {
    const parentNode = mountNode.parentNode;
    parentNode.replaceChild(nextMountNode, mountNode);
  } else {
    document.head.appendChild(nextMountNode);
  }
  return nextMountNode;
};

const rendererWithContext = node => (
  <Provider renderer={createFelaRenderer()} mountNode={getNextMountNode()}>
    <ThemeProvider theme={defaultTheme}>
      {node}
    </ThemeProvider>
  </Provider>
);


export default rendererWithContext;
