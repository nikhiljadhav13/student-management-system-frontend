import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link className="brand" to={user ? (user.role === 'teacher' ? '/teacher' : '/student') : '/login'}>
        Student Portal
      </Link>
      {user ? (
        <div className="nav-user">
          <span>{user.name}</span>
          <button className="button button-secondary" type="button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}
