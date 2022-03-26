import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('Product', () => {
  it('renders the price tag and title', () => {
    const { container } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders the image properly', () => {
    render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    const img = screen.getByAltText(product.name);

    expect(img).toBeInTheDocument();
  });
});
