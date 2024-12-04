import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";

// Import components for routes
import GanttChart from "./plugins/gantt-chart/src/App";

const Home = () => (
  <div>
    <h2>Home Page</h2>
    <p>Welcome to the React Plugins Demo!</p>
  </div>
);

// Header Component (conditionally rendered)
const Header = () => {
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

function App() {
  return (
    <Router>
      <div className="App">
        {/* Conditionally render the Header */}
        <Header />

        {/* Main content based on routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gantt-chart" element={<GanttChart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
