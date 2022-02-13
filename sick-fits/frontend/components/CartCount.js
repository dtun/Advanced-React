import { useEffect, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
    background: lime;
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

export default function CartCount({ count }) {
  const { openCart, cartOpen } = useCart();
  const countRef = useRef(count);
  useEffect(() => {
    if (count !== countRef.current && count > 0 && !cartOpen) {
      openCart();
    }
    countRef.current = count;
  }, [cartOpen, count, openCart]);
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          className="count"
          classNames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
          unmountOnExit
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}
