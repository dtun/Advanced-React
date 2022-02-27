import { list } from '@keystone-next/keystone/schema';
import { text, relationship, integer } from '@keystone-next/fields';

export const OrderItem = list({
  // access:
  fields: {
    name: text({ isRequired: true }),
    description: text({ ui: { displayMode: 'textarea' } }),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    price: integer(), // prices in cents
    quantity: integer(),
    order: relationship({ ref: 'Order.items' }),
  },
});
