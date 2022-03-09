import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

// Yes or No value depending on the user's session
export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Check if user meets criteria - Yes or No
export const permissions = {
  ...generatedPermissions,
};

// Rule based functions
// Can return boolean - Yes or No
// Or filter limiting products they can CRUD

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // canManageProducts permission?
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // Is owner of product?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // canManageCart permission?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // Is owner of product?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // canManageCart permission?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // Is owner of order?
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // Only see available
    return { status: 'AVAILABLE' };
  },
};
