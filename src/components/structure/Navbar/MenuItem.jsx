import { Link } from "react-router-dom";

const MenuItem = ({ r, onClick }) => (
  <li>
    <Link
      to={r.path}
      className="inline-block py-1 px-3 hover:text-green-700 font-medium transform transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      {r.name}
    </Link>
  </li>
);

export default MenuItem;
