import React from "react";
import "../GanttChart.css";
import { TaskRowProps } from "../types";

export const TaskRow: React.FC<TaskRowProps> = ({ task, chartStartDate }) => {
  const taskStart = new Date(task.startDate).getTime();
  const taskEnd = new Date(task.endDate).getTime();
  const chartStart = chartStartDate.getTime();

  const startColumn = Math.round((taskStart - chartStart) / 86400000) + 2;
  const endColumn = Math.round((taskEnd - chartStart) / 86400000) + 3;

  return (
    <div className="task-row">
      <span className="task-name">{task.name}</span>
      <div
        className="time-bar"
        style={{
          gridColumnStart: startColumn,
          gridColumnEnd: endColumn,
        }}
      />
    </div>
  );
};
