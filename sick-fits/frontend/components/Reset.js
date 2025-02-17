import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

export const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error: mutationError }] = useMutation(
    RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  const error = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reset();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error || mutationError} />
      <fieldset aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset!</button>
      </fieldset>
    </Form>
  );
}
