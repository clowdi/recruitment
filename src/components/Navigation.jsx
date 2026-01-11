import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Clowdi</span>
          <span className="logo-tagline">Recruitment Solutions</span>
        </Link>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/jobs" className="nav-link">Jobs</Link></li>
          <li><Link to="/admin" className="nav-link admin-link">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
