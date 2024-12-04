import React, { useEffect, useRef } from "react";
import { TimelineHeader, TaskRow } from "./";
import "../GanttChart.css";
import { ChartContainerProps } from "../types";

export const ChartContainer: React.FC<ChartContainerProps> = ({ tasks }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  //   const normalizeDate = (date: Date): Date => {
  //     const offsetInMs = date.getTimezoneOffset() * 60000;
  //     return new Date(date.getTime() + offsetInMs);
  //   };

  const earliestStartDate = new Date(
    Math.min(...tasks.map((task) => new Date(task.startDate).getTime()))
  );

  const latestEndDate = new Date(
    Math.max(...tasks.map((task) => new Date(task.endDate).getTime()))
  );

  const chartStartDate = new Date(earliestStartDate);
  chartStartDate.setDate(chartStartDate.getDate() - 1);

  const chartEndDate = new Date(latestEndDate);
  chartEndDate.setDate(chartEndDate.getDate() + 1);

  const totalDays = Math.ceil(
    (chartEndDate.getTime() - chartStartDate.getTime()) / 86400000
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--total-days",
      totalDays.toString()
    );
    if (headerRef.current && gridRef.current) {
      gridRef.current.style.width = `${headerRef.current.offsetWidth}px`;
    }
  }, [totalDays]);

  return (
    <div className="chart-container">
      <div ref={headerRef}>
        <TimelineHeader chartStartDate={chartStartDate} totalDays={totalDays} />
      </div>
      <div ref={gridRef} className="gantt-grid">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} chartStartDate={chartStartDate} />
        ))}
      </div>
    </div>
  );
};
