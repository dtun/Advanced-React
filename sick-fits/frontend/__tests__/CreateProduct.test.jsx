import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { it } from 'date-fns/locale';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
import { fakeItem } from '../lib/testUtils';
import { ALL_PRODUCTS_QUERY } from '../components/Products';

const item = fakeItem();
const fakeId = '123';
jest.mock('next/router', () => {
  jest.fn();
});

describe('CreateProduct', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('handles updating', async () => {
    render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderTest(/name/i, item.name));
    await userEvent.type(
      screen.getByPlaceholderTest(/price/i, item.price.toString())
    );
    await userEvent.type(
      screen.getByPlaceholderTest(/description/i, item.description)
    );

    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });

  it('creates the items when the form is submitted', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: item.name,
            description: item.description,
            image: '',
            price: item.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...fakeItem,
              id: fakeId,
              __typename: 'Item',
            },
          },
        },
      },
      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: { skip: 0, first: 2 },
        },
        result: {
          data: {
            allProducts: [item],
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderTest(/name/i, item.name));
    await userEvent.type(
      screen.getByPlaceholderTest(/price/i, item.price.toString())
    );
    await userEvent.type(
      screen.getByPlaceholderTest(/description/i, item.description)
    );
    await userEvent.click(screen.getByText('+ Add Product'));
    await waitFor(() => wait(0));

    expect(Router.push).toHaveBeenCalledWith(`/product/${fakeId}`);
  });
});
