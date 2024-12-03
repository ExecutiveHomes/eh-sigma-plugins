// import React from "react";
// import ChartContainer from "./components/ChartContainer";
// import { tasks } from "./data/tasks";
// import "./components/GanttChart.css";
//
// const App = () => {
//   return (
//     <div className="App">
//       <header>
//         <h1>Gantt Chart Plugin</h1>
//       </header>
//       <main>
//         <ChartContainer tasks={tasks} />
//       </main>
//     </div>
//   );
// };
//
// export default App;

import React from "react";
import ChartContainer from "./components/ChartContainer";
import { tasks } from "./data/tasks";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Gantt Chart Plugin</h1>
      </header>
      <main>
        <ChartContainer tasks={tasks} />
      </main>
    </div>
  );
};

export default App;