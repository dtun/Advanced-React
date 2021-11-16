import { any } from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

Page.propTypes = {
  children: any,
};
