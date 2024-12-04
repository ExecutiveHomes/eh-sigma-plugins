import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components for routes
import { GanttChart } from "./plugins/index";
import { Home } from "./pages/Home";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gantt-chart" element={<GanttChart />} />
      </Routes>
    </Router>
  );
}
