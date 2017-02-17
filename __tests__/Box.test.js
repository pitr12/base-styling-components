import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import chai from 'chai';
// import { render } from 'fela-dom';
import { Box } from '../src';
import rendererWithContext from './helpers/rendererWithContext';

test('Box renders correctly', () => {
  const tree = renderer.create(rendererWithContext(
    <Box>some text inside box component</Box>
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box renders correctly with basic margin and padding', () => {
  const tree = renderer.create(rendererWithContext(
    <Box margin={20} padding={25}>some text inside box component</Box>
  )).toJSON();
  expect(tree).toMatchSnapshot();
});


it('should render box with set margin and padding', () => {
  mount(rendererWithContext(
    <Box margin={20}>
      some text inside box component
    </Box>
  ));

  chai.assert(document.getElementById('fela-stylesheet').textContent.includes('margin-top:20px'));
  chai.assert(document.getElementById('fela-stylesheet').textContent.includes('margin-bottom:20px'));
  chai.assert(document.getElementById('fela-stylesheet').textContent.includes('margin-right:20px'));
  chai.assert(document.getElementById('fela-stylesheet').textContent.includes('margin-left:20px'));
});
