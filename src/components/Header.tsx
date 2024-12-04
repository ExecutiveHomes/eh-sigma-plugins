import { Link, useLocation } from "react-router-dom";

// Header Component (conditionally rendered)
export const Header = () => {
  const location = useLocation();
  // Show header only on the home page
  if (location.pathname !== "/") {
    return null;
  }
  return (
    <header className="App-header">
      <h1>React Plugins Demo</h1>
      <nav>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/gantt-chart"
              style={{ textDecoration: "none", color: "green" }}
            >
              Gantt Chart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
