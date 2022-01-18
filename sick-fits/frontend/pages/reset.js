import { RequestReset } from '../components/RequestReset';
import { Reset } from '../components/Reset';

export default function ResetPage({ query: { token } }) {
  if (!token) {
    return (
      <div>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset Your Password</p>
      <Reset token={token} />
    </div>
  );
}
