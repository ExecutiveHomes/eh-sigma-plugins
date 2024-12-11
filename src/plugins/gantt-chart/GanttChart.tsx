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

  const tasks = React.useMemo(() => {
    if (!rawData) return [];
    const { C7P3RyuGHX: names, "4Si_1lwDfD": startDates, uqccOLP_8s: endDates, sX1eqXlLoB: winDurations } = rawData;

    if (!names || !startDates || !endDates) {
      console.warn("Missing required columns in raw data");
      return [];
    }

    return names.map((name: string, index: number) => ({
      id: index + 1,
      text: `${name || `Task ${index + 1}`} (End: ${new Date(endDates[index]).toLocaleDateString()})`,
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

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Willow>
        <div style={{ height: "100%", overflowY: "auto" }}>
          <Gantt tasks={tasks} scales={scales} />
        </div>
      </Willow>
    </div>
  );
};