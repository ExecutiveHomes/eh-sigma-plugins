declare module "wx-react-gantt" {
  import React from "react";

  interface GanttProps {
    tasks?: any[];
    links?: any[];
    scales?: any[];
  }

  interface WillowProps {
    children: React.ReactNode;
  }

  export const Gantt: React.FC<GanttProps>;
  export const Willow: React.FC<WillowProps>;
  export const WillowDark: React.FC<WillowProps>;
}