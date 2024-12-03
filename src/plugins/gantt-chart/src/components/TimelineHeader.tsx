import React from "react";
import "../styles/GanttChart.css";
import { TimelineHeaderProps } from "../types/types";

const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  chartStartDate,
  totalDays,
}) => {
  const dates = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(chartStartDate);
    date.setDate(chartStartDate.getDate() + i);
    return date;
  });

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatDateWithOrdinal = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${month} ${day}${getOrdinalSuffix(day)}`;
  };

  return (
    <div className="timeline-header">
      <div className="timeline-cell">Task Name</div>
      {dates.map((date, index) => (
        <div key={index} className="timeline-cell">
          {formatDateWithOrdinal(date)}
        </div>
      ))}
    </div>
  );
};

export default TimelineHeader;