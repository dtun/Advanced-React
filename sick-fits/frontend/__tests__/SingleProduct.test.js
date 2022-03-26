import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('SingleProduct', () => {
  it('renders with proper data', async () => {
    const { container } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SINGLE_ITEM_QUERY,
              variables: {
                id: product.id,
              },
            },
            result: {
              data: {
                Product: product,
              },
            },
          },
        ]}
      >
        <SingleProduct id={product.id} />
      </MockedProvider>
    );

    await screen.findByTestId('singleProduct');

    expect(container).toMatchSnapshot();
  });

  it('errors when item not found', async () => {
    const { container } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SINGLE_ITEM_QUERY,
              variables: {
                id: product.id,
              },
            },
            result: {
              errors: [{ message: 'Item Not Found' }],
            },
          },
        ]}
      >
        <SingleProduct id={product.id} />
      </MockedProvider>
    );

    await screen.findByTestId('graphql-error');

    expect(container).toHaveTextContent('Shoot!');
  });
});
