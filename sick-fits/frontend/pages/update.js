import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  const { id } = query;
  return (
    <div>
      <UpdateProduct id={id} />
    </div>
  );
}
