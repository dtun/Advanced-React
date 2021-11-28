import { list } from '@keystone-next/keystone/schema';
import { select, text, relationship, integer } from '@keystone-next/fields';

export const Product = list({
  // access:
  fields: {
    name: text({
      isRequired: true,
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unvailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        createView: { fieldMode: 'hidden' },
        displayMode: 'segmented-control',
      },
    }),
    price: integer(), // prices in cents
    // todo Photo
  },
});
