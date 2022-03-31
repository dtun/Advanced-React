import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/react-testing';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'bos@gmail.com';
const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: {
        email,
      },
    },
    result: {
      data: {
        sendUserPasswordResetLink: null,
      },
    },
  },
];

describe('RequestReset', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('calls the mutation when submitted', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/email/i, email));
    await userEvent.click(screen.getByText(/request reset/i, email));

    await screen.findByText(/success/i);
  });
});
