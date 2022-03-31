import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/react-testing';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { fakeUser } from '../lib/testUtils';

const me = fakeUser();
const password = 'wes';
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: '123',
          name: me.name,
          email: me.email,
        },
      },
    },
  },
];

describe('SignUp', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/name/i, me.name));
    await userEvent.type(screen.getByPlaceholderText(/email/i, me.email));
    await userEvent.type(screen.getByPlaceholderText(/password/i, password));
    await userEvent.click(screen.getByText(/sign up/i));

    await screen.findByText(`Signed up with ${me.email}`);
  });
});
