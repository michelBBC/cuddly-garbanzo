// List.react.test.js
import React from 'react';
import List from './list';
import renderer from 'react-test-renderer';

test('List changes the class when hovered', () => {
  const input = ['one', 'two', 'three'];
  const name = 'Hello';
  const component = renderer.create(
    <List className="list-products" name={name} displaySuggestions={true} items={input} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});