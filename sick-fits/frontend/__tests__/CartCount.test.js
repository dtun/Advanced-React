import React from 'react';
import { render } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('CartCount', () => {
  it('renders', () => {
    render(<CartCount />);
  });

  it('matches snapshot', () => {
    const { container } = render(<CartCount count={11} />);

    expect(container).toMatchSnapshot();
  });

  it('updates via props', async () => {
    const { container, rerender } = render(<CartCount count={11} />);

    expect(container.textContent).toBe('11');

    rerender(<CartCount count={12} />);

    expect(container.textContent).toBe('1211');

    await wait(400); // Length of animation

    expect(container.textContent).toBe('12');
    expect(container).toMatchSnapshot();
  });
});
