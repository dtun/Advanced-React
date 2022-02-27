import stripe from 'stripe';

export const stripeConfig = new stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
});
