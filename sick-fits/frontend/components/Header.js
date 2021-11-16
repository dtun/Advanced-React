import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
    </header>
  );
}
