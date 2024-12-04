import { ChartContainer } from "./components";
import { tasks } from "./tasks";
import {
  client,
  useConfig,
  useElementData,
  useElementColumns,
} from "@sigmacomputing/plugin";

client.config.configureEditorPanel([
  { name: "data source!!!!!!", type: "element" },
  {
    name: "dimension",
    type: "column",
    source: "data source",
    allowMultiple: true,
  },
  {
    name: "measures!!!!",
    type: "column",
    source: "data source",
    allowMultiple: true,
  },
  { name: "a group of values!!!", type: "group" },
  { name: "text input #1", source: "a group of values", type: "text" },
  { name: "text input #2", source: "a group of values", type: "text" },
  { name: "apiKey", type: "text", secure: true },
]);

export const GanttChart = () => {
  const config = useConfig();

  const columnInfo = useElementColumns(config.source);

  // arrays of the ids corresponding to the "dimension" and "measures" data columns from the editor panel
  const { dimension, measures } = config;

  console.log("columnInfo", columnInfo);
  console.log("dimension", dimension);
  console.log("measures", measures);

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
