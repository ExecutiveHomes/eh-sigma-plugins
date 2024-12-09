import React from "react";
import { Gantt } from "wx-react-gantt";
import { Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css"; // Import required styles
import { client, useConfig, useElementData } from "@sigmacomputing/plugin";

client.config.configureEditorPanel([
  {
    name: "dataSource",
    type: "element",
    label: "Data Source",
  },
  {
    name: "dimensions",
    type: "column",
    source: "dataSource",
    allowMultiple: true,
    label: "Dimensions",
  },
  {
    name: "measures",
    type: "column",
    source: "dataSource",
    allowMultiple: true,
    label: "Measures",
  },
]);

export const GanttChart = () => {
  const config = useConfig();
  const { dataSource } = config;

  const rawData = useElementData(dataSource);
  console.log("Raw Data:", rawData);

  const tasks = React.useMemo(() => {
    if (!rawData) return [];
    const { C7P3RyuGHX: names, "4Si_1lwDfD": startDates, uqccOLP_8s: endDates, sX1eqXlLoB: winDurations } = rawData;

    if (!names || !startDates || !endDates) {
      console.warn("Missing required columns in raw data");
      return [];
    }

    return names.map((name: string, index: number) => ({
      id: index + 1,
      text: name || `Task ${index + 1}`,
      start: new Date(startDates[index]),
      end: new Date(endDates[index]),
      duration: winDurations[index],
      progress: 0,
      type: "task",
    }));
  }, [rawData]);

  const scales = [
    { unit: "month", step: 1, format: "MMMM yyyy" },
    { unit: "day", step: 1, format: "d" },
  ];

//   // Define custom columns for the Gantt chart
//   const columns = [
//     { name: "text", label: "Address", width: "30%" }, // Rename "Task Name" to "Address"
//     { name: "start", label: "Start Date", width: "20%" },
//     { name: "end", label: "End Date", width: "20%" }, // Add a new column for "End Date"
//     { name: "duration", label: "Duration (days)", width: "20%" },
//   ];

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Willow>
        <Gantt tasks={tasks} scales={scales} />
      </Willow>
    </div>
  );
};


// import React from "react";
// import { ChartContainer } from "./components";
// import { Task } from "./types/types";
// import { client, useConfig, useElementData, useElementColumns } from "@sigmacomputing/plugin";
//
// // Configure the editor panel for Sigma
// client.config.configureEditorPanel([
//   {
//     name: "dataSource",
//     type: "element",
//     label: "Data Source",
//   },
//   {
//     name: "dimensions",
//     type: "column",
//     source: "dataSource",
//     allowMultiple: true,
//     label: "Dimensions",
//   },
//   {
//     name: "measures",
//     type: "column",
//     source: "dataSource",
//     allowMultiple: true,
//     label: "Measures",
//   },
// ]);
//
// export const GanttChart = () => {
//   const config = useConfig();
//   const { dataSource } = config;
//
//   // Fetch raw data and column info
//   const rawData = useElementData(dataSource);
//   const columnInfo = useElementColumns(dataSource);
//
//   console.log("Raw Data:", rawData);
//   console.log("Column Info:", columnInfo);
//
//   // Map raw data keys to column names
//   const keyMapping: Record<string, string> = {
//     C7P3RyuGHX: "Address", // Replace with actual column name for addresses
//     "4Si_1lwDfD": "DoM Window Start", // Replace with actual column name for start date
//     uqccOLP_8s: "DoM Window End", // Replace with actual column name for end date
//   };
//
//   // Transform raw data into row-based data
//   const tasks: Task[] = React.useMemo(() => {
//     if (!rawData) return [];
//
//     const { C7P3RyuGHX, "4Si_1lwDfD": startDates, uqccOLP_8s: endDates } = rawData;
//
//     if (!C7P3RyuGHX || !startDates || !endDates) {
//       console.warn("Missing required columns in raw data");
//       return [];
//     }
//
//     // Ensure all arrays have the same length
//     const rowCount = Math.min(C7P3RyuGHX.length, startDates.length, endDates.length);
//
//     return Array.from({ length: rowCount }).map((_, index) => ({
//       id: index + 1,
//       name: C7P3RyuGHX[index] || "Unnamed Task",
//       startDate: startDates[index]
//         ? new Date(startDates[index]).toISOString().split("T")[0]
//         : "",
//       endDate: endDates[index]
//         ? new Date(endDates[index]).toISOString().split("T")[0]
//         : "",
//     }));
//   }, [rawData]);
//
//   console.log("Transformed Tasks:", tasks);
//
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