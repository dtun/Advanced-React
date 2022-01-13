import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

export const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut({ children }) {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button onClick={signOut} type="button">
      {children || 'Sign Out!'}
    </button>
  );
}
