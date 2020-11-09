import React from 'react';
import Routes from 'react-routes';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
        </ul>
      </nav>
      <Routes />
    </Router>
  );
};

export default App;
