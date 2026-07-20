import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Job Board Aggregator</Link>
      <div>
        <Link to="/">Jobs</Link>
        {user && <Link to="/tracker">My Tracker</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && (
          <a href="#" onClick={handleLogout}>
            Logout ({user.name})
          </a>
        )}
      </div>
    </nav>
  );
}
