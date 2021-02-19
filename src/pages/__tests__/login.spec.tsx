import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import userEvent from '@testing-library/user-event';
import { render, waitFor, RenderResult } from '../../test-utils';
import { Login, LOGIN_MUTATION } from '../login';

describe('Login', () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Login/>
        </ApolloProvider>);
    })
  });
  it('should render ok', async () => {
    await waitFor(() => {
      expect(document.title).toEqual('Login | Uber Eats Clone');
    });
  });
  it('displays email validation errors', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, 'example');
    });
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Email is required/i);
  });
  it('displays password validation errors', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const button = getByRole('button');
    await waitFor(() => {
      userEvent.type(email, 'example@test.com');
      userEvent.click(button);
    });
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Password is required/i);
  });
  it('submits form and fires mutation', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const formData = {
      email: 'example@test.com',
      password: '12345pass',
    };
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole('button');
    jest.spyOn(Storage.prototype, 'setItem');
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: 'token',
          error: null,
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({loginInput: formData});
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token');
  });
  it('shows an error on mutation', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const formData = {
      email: 'example@test.com',
      password: '12345pass',
    };
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole('button');
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: false,
          token: null,
          error: 'Some error',
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });
    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent('Some error');
  });
});
