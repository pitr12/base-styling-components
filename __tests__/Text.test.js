// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import chai from 'chai';
import { Text, defaultTheme } from '../src';
import { getFontFamily, getColor, getFontWeight, getTextSize } from '../src/defaultTheme';
import rendererWithContext from './helpers/rendererWithContext';

const getStyleNode = () => {
  const node = document.getElementById('fela-stylesheet');
  return node && node.textContent;
};

test('Text renders correctly', () => {
  const tree = renderer.create(rendererWithContext(
    <Text>some text inside text component</Text>
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text renders correctly as h1', () => {
  const tree = renderer.create(rendererWithContext(
    <Text as="h1">some h1 title</Text>
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text renders correctly with set styling', () => {
  const tree = renderer.create(rendererWithContext(
    <Text margin={25} padding={25} color="red">some text inside text component</Text>
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should set correct default styling', () => {
  mount(rendererWithContext(
    <Text>some text inside box component</Text>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes(`font-family:${getFontFamily(defaultTheme.text.fontFamily, defaultTheme)}`));
    chai.assert(styleNode.includes(`color:${getColor(defaultTheme.text.color, defaultTheme)}`));
  }
});

it('should set correct custom styling', () => {
  mount(rendererWithContext(
    <Text fontFamily={'Arial'} size={30}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes('font-family:Arial'));
    chai.assert(styleNode.includes('font-size:30px'));
  }
});

it('should set correct custom styling using style porp', () => {
  mount(rendererWithContext(
    <Text
      style={{
        fontFamily: 'Arial',
        fontSize: '30px',
      }}
    >
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes('font-family:Arial'));
    chai.assert(styleNode.includes('font-size:30px'));
  }
});

it('should set correct font family', () => {
  const font = 'Arial';
  mount(rendererWithContext(
    <Text fontFamily={font}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`font-family:${font}`));
});

it('should set correct line height', () => {
  const size = 20;
  mount(rendererWithContext(
    <Text lineHeight={size}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`line-height:${size}px`));
});

it('should set correct line height using string value with units', () => {
  const size = '25px';
  mount(rendererWithContext(
    <Text lineHeight={size}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`line-height:${size}`));
});

it('should set correct font size', () => {
  const size = 20;
  mount(rendererWithContext(
    <Text size={size}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`font-size:${size}px`));
});

it('should set correct font size using string value with units', () => {
  const size = '4px';
  mount(rendererWithContext(
    <Text size={size}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`font-size:${size}`));
});

it('should set correct font size using string value without units', () => {
  const size = '20';
  mount(rendererWithContext(
    <Text size={size}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`font-size:${size}px`));
});

it('should set correct font size using scale value', () => {
  const size = 0;
  mount(rendererWithContext(
    <Text size={size}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`font-size:${defaultTheme.textScale[size]}`));
});

it('should set text as italic', () => {
  mount(rendererWithContext(
    <Text italic>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes('font-style:italic'));
});

it('should transform text to uppercase', () => {
  mount(rendererWithContext(
    <Text textTransform="uppercase">
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes('text-transform:uppercase'));
});

it('should align text to center', () => {
  mount(rendererWithContext(
    <Text textAlign="center">
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes('text-align:center'));
});

it('should underline text', () => {
  mount(rendererWithContext(
    <Text textDecoration="underline">
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes('text-decoration:underline'));
});

it('should set correct text pseudo classes', () => {
  mount(rendererWithContext(
    <Text
      color="red"
      style={{
        ':hover': {
          color: 'green',
        },
      }}
    >
      hover buttonn
    </Text>
  ));
  const styleNode = getStyleNode();
  if (styleNode) {
    chai.assert(styleNode.includes('color:red'));
    chai.assert(styleNode.includes(':hover{color:green}'));
  }
});

it('should set correct text color', () => {
  const color = 'black';
  mount(rendererWithContext(
    <Text color={color}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`color:${getColor(color, defaultTheme)}`));
});

it('should set correct fontWeight', () => {
  const fontWeight = 'light';
  mount(rendererWithContext(
    <Text fontWeight={fontWeight}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`font-weight:${getFontWeight(fontWeight, defaultTheme)}`));
});

it('should set correct fontSize', () => {
  const size = 3;
  mount(rendererWithContext(
    <Text size={size}>
      some text inside box component
    </Text>
  ));
  const styleNode = getStyleNode();
  styleNode && chai.assert(styleNode.includes(`font-size:${getTextSize(size, defaultTheme)}`));
});
