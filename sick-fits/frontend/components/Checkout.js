import styled from 'styled-components';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import { useCart } from '../lib/cartState';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { closeCart } = useCart();
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Page transition
    nProgress.start();

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error);
      nProgress.done();
      return; // Stops fn from running
    }

    // Send token to Keystone
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    // Change the page to view order
    router.push({
      pathname: '/order[id]',
      query: {
        id: order.data.checkout.id,
      },
    });

    closeCart();
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles loading={loading} onSubmit={handleSubmit}>
      {error ? <p>{error.message}</p> : null}
      {graphQLError ? <p>{graphQLError.message}</p> : null}
      <CardElement />
      <SickButton>CHECKOUT NOW</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
