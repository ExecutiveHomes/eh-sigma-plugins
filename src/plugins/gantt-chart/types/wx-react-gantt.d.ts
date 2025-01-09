// declare module "wx-react-gantt" {
//   import React from "react";
//
//   interface GanttProps {
//     tasks?: {
//       id: number | string;
//       text: string;
//       start: Date;
//       end: Date;
//       type?: string; // "task", "summary", etc.
//       duration?: number;
//       progress?: number;
//       parent?: number | string;
//     }[];
//     links?: any[];
//     scales?: {
//       unit: string;
//       step: number;
//       format: string;
//     }[];
//     columns?: {
//       id: string;
//       header: string;
//       flexGrow?: number;
//       align?: string;
//       width?: number;
//     }[];
//     taskTypes?: {
//       id: string;
//       label: string;
//     }[];
//     zoomConfig?: {
//       zoom: boolean;
//       maxCellWidth?: number;
//       level: number;
//       levels: {
//         minCellWidth: number;
//         scales: { unit: string; step: number; format: string }[];
//       }[];
//     };
//     toolbar?: {
//       buttons: {
//         id: string;
//         comp: string;
//         icon: string;
//         text?: string;
//         type?: string;
//         menuText?: string;
//       }[];
//     };
//   }
//
//   interface WillowProps {
//     children: React.ReactNode;
//   }
//
//   export const Gantt: React.FC<GanttProps>;
//   export const Willow: React.FC<WillowProps>;
//   export const WillowDark: React.FC<WillowProps>;
// }

declare module "wx-react-gantt" {
  import React, { MutableRefObject } from "react";

  interface Task {
    id: number | string; // Unique identifier for each task
    text: string; // Task name
    start: Date; // Start date of the task
    end: Date; // End date of the task
    type?: string; // "task", "summary", etc.
    duration?: number; // Task duration
    progress?: number; // Progress percentage (0-100)
    parent?: number | string; // ID of the parent task
    readonly?: boolean; // If true, makes the task uneditable
  }

  interface Link {
    id: number | string; // Unique identifier for the link
    source: number | string; // Source task ID
    target: number | string; // Target task ID
    type: string; // Link type (e.g., "finish-to-start")
  }

  interface Scale {
    unit: string; // e.g., "month", "day"
    step: number; // Step size (e.g., 1)
    format: string; // Format string (e.g., "MMMM yyyy")
  }

  interface Column {
    id: string; // Column identifier
    header: string; // Column header text
    flexGrow?: number; // Flex grow value for resizing
    align?: string; // Text alignment (e.g., "center", "left")
    width?: number; // Fixed width (optional)
  }

  interface TaskType {
    id: string; // Type identifier (e.g., "task", "summary")
    label: string; // Display name
  }

  interface ZoomLevel {
    minCellWidth: number; // Minimum cell width for this level
    scales: Scale[]; // Scales applicable to this zoom level
  }

  interface ZoomConfig {
    zoom: boolean; // Enable/disable zooming
    maxCellWidth?: number; // Maximum cell width
    level: number; // Default zoom level index
    levels: ZoomLevel[]; // List of zoom levels
  }

  interface zoom { true }

  interface ToolbarButton {
    id: string; // Unique identifier
    comp: string; // Component type (e.g., "button", "icon")
    icon: string; // Icon class name
    text?: string; // Display text (optional)
    type?: string; // Button type (e.g., "primary")
    menuText?: string; // Context menu text (optional)
  }

  interface ToolbarConfig {
    buttons: ToolbarButton[]; // List of toolbar buttons
  }

  interface ToolbarComponent {
    items: items[]
  }
  interface items {
            id?: string;
            comp: 'button';
            icon?: string;
            css?: string;
            text?: string;
            type?: string;
            layout?: string;
            items?: [];
            handler?: () => {}
  }
  
  interface Marker {
    id: string | number; // Unique marker ID
    start: Date; // Marker position
    text: string; // Displayed text
  }

  interface GanttProps {
    apiRef?: MutableRefObject<any>; // Ref for API access
    tasks?: Task[]; // List of tasks
    links?: Link[]; // List of task links (optional)
    scales?: Scale[]; // Time scales
    columns?: Column[]; // Task columns
    taskTypes?: TaskType[]; // Task types
    zoomConfig?: ZoomConfig; // Zoom configuration
    toolbar?: ToolbarConfig; // Toolbar configuration
    markers?: Marker[]; // Optional markers for highlighting dates
    readonly?: boolean; // If true, disables editing
    start?: Date; // Start date of the chart
    end?: Date; // End date of the chart
    zoom?: boolean;
    cellWidth?: number;
  }

  interface WillowProps {
    children: React.ReactNode; // Content inside the Willow wrapper
  }

  export const ToolbarComponent: React.FC<{ api: any }>;
  export const Gantt: React.FC<GanttProps>;
  export const Willow: React.FC<WillowProps>;
  export const WillowDark: React.FC<WillowProps>;
}