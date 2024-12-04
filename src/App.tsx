import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components for routes
import { GanttChart } from "./plugins/index";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GanttChart />} />
        <Route path="/gantt-chart" element={<GanttChart />} />
      </Routes>
    </Router>
  );
}
