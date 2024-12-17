// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";

// // Import components for routes
// import { GanttChart } from "./plugins/index";

// export function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<GanttChart />} />
//         <Route path="/gantt-chart" element={<GanttChart />} />
//       </Routes>
//     </Router>
//   );
// }

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components for routes
import { GanttChart } from "./plugins/index";
import { useEffect, useRef } from 'react'; 

export function App() {
  const ganttChartRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (ganttChartRef.current) {
      const styles = window.getComputedStyle(ganttChartRef.current);
      console.log("Gantt Chart Width:", styles.width);
      console.log("Gantt Chart Height:", styles.height);
      console.log("Gantt Chart Font Family:", styles.fontFamily);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div ref={ganttChartRef}><GanttChart /></div>} /> 
        <Route path="/gantt-chart" element={<div ref={ganttChartRef}><GanttChart /></div>} />
      </Routes>
    </Router>
  );
}