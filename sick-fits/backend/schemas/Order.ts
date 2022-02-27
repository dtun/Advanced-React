import { list } from '@keystone-next/keystone/schema';
import { text, relationship, integer, virtual } from '@keystone-next/fields';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  // access:
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver: function (item) {
        return `${formatMoney(item.total)}`;
      },
    }),
    total: integer(), // prices in cents
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
