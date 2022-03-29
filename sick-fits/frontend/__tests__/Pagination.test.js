import { screen, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('Pagination', () => {
  it('displays a loading message', () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );

    expect(container).toHaveTextContent('Loading...');
  });

  it('renders pagination for 18 items', async () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination />
      </MockedProvider>
    );

    await screen.findByTestId('pagination');

    expect(container).toHaveTextContent('Page 1 of 9');
    expect(container).toMatchSnapshot();
  });

  it('disables prev on first page', async () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(6)}>
        <Pagination page={1} />
      </MockedProvider>
    );

    await screen.findByTestId('pagination');

    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);

    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });

  it('disables next on last page', async () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(6)}>
        <Pagination page={3} />
      </MockedProvider>
    );

    await screen.findByTestId('pagination');

    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);

    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });

  it('enables all on middle page', async () => {
    render(
      <MockedProvider mocks={makePaginationMocksFor(6)}>
        <Pagination page={6} />
      </MockedProvider>
    );

    await screen.findByTestId('pagination');

    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);

    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });
});
