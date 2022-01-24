import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calculateTotalPrice from '../lib/calculateTotalPrice';
import { useCart } from '../lib/cartState';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  image {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;
  if (!product) {
    return null;
  }
  return (
    <CartItemStyles>
      <img
        alt={product.name}
        src={cartItem.product.photo.image.publicUrlTransformed}
        width="100"
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} -{' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export function Cart() {
  const me = useUser();
  const { open, closeCart } = useCart();
  if (!me) {
    return null;
  }
  return (
    <CartStyles open={open}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart} type="button">
          &times;
        </CloseButton>
      </header>

      <ul>
        {me.cart.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calculateTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
