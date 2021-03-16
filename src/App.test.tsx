import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from './App';
import { createReduxStore } from 'state-management/store';

const store = createReduxStore();

test('should render app header', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headerElement = screen.getByText(/Table Football Score Tracker/i);
  expect(headerElement).toBeInTheDocument();
});
