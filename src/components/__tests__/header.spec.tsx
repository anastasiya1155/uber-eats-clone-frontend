import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../header';
import { ME_QUERY } from '../../hooks/useMe';

const me = { id: 1, verified: true, email: '', role: '' };

describe('Header', () => {
  it('renders without verify banner', async () => {
    await waitFor(async () => {
      const { queryByText } = render(<BrowserRouter>
        <MockedProvider mocks={[{
          request: { query: ME_QUERY },
          result: { data: { me } }
        }]}>
          <Header/>
        </MockedProvider>
      </BrowserRouter>);
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(queryByText('Please verify your email.')).toBeNull();
    });
  });
  it('renders verify banner', async () => {
    await waitFor(async () => {
      const { getByText } = render(<BrowserRouter>
        <MockedProvider mocks={[{
          request: { query: ME_QUERY },
          result: { data: { me: {...me, verified: false } } },
        }]}>
          <Header/>
        </MockedProvider>
      </BrowserRouter>);
      await new Promise(resolve => setTimeout(resolve, 0));
      getByText('Please verify your email.');
    });
  });
});
