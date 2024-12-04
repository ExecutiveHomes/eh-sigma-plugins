// src/types/types.ts

// Interface for a Task
export interface Task {
  id: number; // Unique identifier for the task
  name?: string; // Optional task name
  startDate: string; // Start date in string format
  endDate: string; // End date in string format
  description?: string; // Optional description
  progress?: number; // Task progress percentage (0-100)
  [key: string]: any; // Allow additional dynamic properties
}

// Props for the ChartContainer component
export interface ChartContainerProps {
  tasks: Task[]; // Array of tasks
}

// Props for the TaskRow component
export interface TaskRowProps {
  task: Task; // A single task object
  chartStartDate: Date; // The start date of the chart
}

// Props for the TimelineHeader component
export interface TimelineHeaderProps {
  chartStartDate: Date; // The start date of the timeline
  totalDays: number; // Total number of days in the timeline
}

// Utility Types
export type Nullable<T> = T | null; // Utility type for nullable values