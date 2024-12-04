import { ChartContainer } from "./components";
import { tasks } from "./tasks";

export const GanttChart = () => {
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
