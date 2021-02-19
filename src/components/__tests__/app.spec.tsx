import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { App } from '../app';
import { isLoggedInVar } from '../../apollo';

jest.mock('../../routers/logged-out-router', () => {
  return {
    LoggedOutRouter: () => <span>Logged out</span>
  }
})
jest.mock('../../routers/logged-in-router', () => {
  return {
    LoggedInRouter: () => <span>Logged in</span>
  }
})

describe('App', () => {
  it('renders LoggedOutRouter', () => {
    const { getByText } = render(<App />);
    getByText('Logged out');
  });
  it('renders LoggedInRouter', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true)
    });
    getByText('Logged in');
  });
});
