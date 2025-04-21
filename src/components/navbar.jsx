import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/preview">Preview</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
