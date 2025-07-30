/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('../src/navigation/AppNavigator', () =>
  require('../__mocks__/AppNavigator'),
);

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
