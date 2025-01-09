import React from "react";
import { Gantt, GanttProps } from "wx-react-gantt";
import { Willow } from "wx-react-gantt";
import { client, useConfig, useElementData, useElementColumns } from "@sigmacomputing/plugin";
import "wx-react-gantt/dist/gantt.css";

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

export const GanttChart: React.FC = () => {
  const config = useConfig();
  const { dataSource } = config;

  const rawData = useElementData(dataSource);
  console.log("rawData:", rawData);

  const rawColumns = useElementColumns(dataSource)
  console.log("rawColumns:", rawColumns)

  const startId = Object.entries(rawColumns).filter(([key, column]) => {
    return column?.name === "DoM Window Start";
  })?.[0][0];
  console.log("start:", startId)

  const endId = Object.entries(rawColumns).filter(([key, column]) => {
    return column?.name === "DoM Window End";
  })?.[0][0];
  console.log("end:", endId)

  const addressId = Object.entries(rawColumns).filter(([key, column]) => {
    return column?.name === "Address";
  })?.[0][0];
  console.log("address:", addressId)

  const cityElementId = Object.entries(rawColumns).filter(([key, column]) => {
    return column?.name === "City";
  })?.[0][0];
  console.log("city:", cityElementId)

  const durationId = Object.entries(rawColumns).filter(([key, column]) => {
    return column?.name === "Window Duration";
  })?.[0][0];
  console.log("duration:", durationId)

  const tasks: GanttProps["tasks"] = React.useMemo(() => {
    if (
      !rawData ||
      !Array.isArray(rawData[cityElementId]) ||
      !Array.isArray(rawData[startId]) ||
      !Array.isArray(rawData[endId]) ||
      !Array.isArray(rawData[durationId]) ||
      !Array.isArray(rawData[addressId]) ||
      rawData[cityElementId].length !== rawData[startId].length ||
      rawData[cityElementId].length !== rawData[endId].length ||
      rawData[cityElementId].length !== rawData[durationId].length ||
      rawData[cityElementId].length !== rawData[addressId].length
    ) {
      console.warn("Missing or invalid data in rawData.");
      return [];
    }

    let taskIdCounter = 1; // Unique ID counter
    const flatTasks: GanttProps["tasks"] = [];
    const cityToIdMap = new Map<string, number>();

    for (let i = 0; i < rawData[cityElementId].length; i++) {
      const city = rawData[cityElementId][i];

      // Add a city (summary) task if it doesn't already exist
      if (!cityToIdMap.has(city)) {
        const cityId = taskIdCounter++;
        cityToIdMap.set(city, cityId);

        flatTasks.push({
          id: cityId,
          text: city,
          start: new Date(rawData[startId][i]),
          end: new Date(rawData[endId][i]),
          type: "summary", // Summary type for parent
        });
      }

      // Add the child task
      flatTasks.push({
        id: taskIdCounter++, // Unique task ID
        text: rawData[addressId][i], // Task name
        start: new Date(rawData[startId][i]),
        end: new Date(rawData[endId][i]),
        duration: rawData[durationId][i],
        progress: 0,
        type: "task", // Child task type
        parent: cityToIdMap.get(city), // Link to the summary task by ID
      });

      // Update the summary start and end dates
      const summaryTask = flatTasks.find(
        (task) => task.id === cityToIdMap.get(city)
      );
      if (summaryTask) {
        summaryTask.start = new Date(
          Math.min(
            summaryTask.start.getTime(),
            new Date(rawData[startId][i]).getTime()
          )
        );
        summaryTask.end = new Date(
          Math.max(
            summaryTask.end.getTime(),
            new Date(rawData[endId][i]).getTime()
          )
        );
      }
    }
    flatTasks.sort((a, b) => a.start.getTime() - b.start.getTime());
    console.log("Processed tasks:", flatTasks);
    return flatTasks;
  }, [rawData, startId, endId, addressId, cityElementId, durationId]);

  const scales = [
    { unit: "month", step: 1, format: "MMMM yyyy" },
    { unit: "day", step: 1, format: "d" },
  ];

  const columns = [
    { id: "text", header: "Name", flexGrow: 3, align: "left", width: 150 },
    { id: "start", header: "Start date", flexGrow: 1, align: "center" },
    { id: "duration", header: "Duration", align: "center", flexGrow: 1 },
    { id: "action", header: "", width: 50, align: "center" },
  ];

  const taskTypes = [
    { id: "task", label: "Address" },
    { id: "summary", label: "City" },
  ];

  const zoomConfig = {
    zoom: true,
    maxCellWidth: 400,
    level: 0, // Start with the first zoom level
    levels: [
      {
        minCellWidth: 200,
        scales: [{ unit: "year", step: 1, format: "yyyy" }],
      },
      {
        minCellWidth: 150,
        scales: [{ unit: "quarter", step: 1, format: "QQQ yyyy" }],
      },
      {
        minCellWidth: 100,
        scales: [{ unit: "month", step: 1, format: "MMMM yyyy" }],
      },
      {
        minCellWidth: 80,
        scales: [{ unit: "week", step: 1, format: "'Week' w" }],
      },
      {
        minCellWidth: 50,
        scales: [{ unit: "day", step: 1, format: "d MMM yyyy" }],
      },
    ],
  };
  const toolbarConfig = {
    buttons: [
      {
        id: "add-task",
        comp: "button",
        icon: "wxi-plus",
        text: "New Task",
        type: "primary",
      },
      { id: "edit-task", comp: "icon", icon: "wxi-edit", text: "Edit Task" },
      {
        id: "delete-task",
        comp: "icon",
        icon: "wxi-delete",
        text: "Delete Task",
      },
      { id: "separator-1", comp: "separator", icon: "", text: "" },
      {
        id: "move-task-up",
        comp: "icon",
        icon: "wxi-angle-up",
        text: "Move Up",
      },
      {
        id: "move-task-down",
        comp: "icon",
        icon: "wxi-angle-down",
        text: "Move Down",
      },
      { id: "zoom-in", comp: "icon", icon: "wxi-zoom-in", text: "Zoom In" },
      { id: "zoom-out", comp: "icon", icon: "wxi-zoom-out", text: "Zoom Out" },
    ],
  };

  console.log("Props passed to Gantt:", {
    tasks,
    scales,
    columns,
    taskTypes,
    zoomConfig,
    toolbar: toolbarConfig,
  });

  const markers = [
    {
      id: 0,
      start: new Date(),
      text: "Today",
    },
  ];
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Willow>
        <div style={{ height: "100%", overflowY: "auto" }}>
          <Gantt
            tasks={tasks}
            markers={markers}
            scales={scales}
            columns={columns}
            taskTypes={taskTypes}
            zoom={true}
            toolbar={toolbarConfig}
            cellWidth={50}
          />
        </div>
      </Willow>
    </div>
  );
};
