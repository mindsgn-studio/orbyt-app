import React from 'react';
import renderer from 'react-test-renderer';
import Markets from './nfts.screen';

test('renders correctly', () => {
  const tree = renderer.create(<Markets />).toJSON();
  expect(tree).toMatchSnapshot();
});