import { Link } from 'react-router-dom';

const Nav = () => {
  //Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/candidates">Potential Candidates</Link>
      </li>
    </ul>
  </nav>
);
};

export default Nav;
