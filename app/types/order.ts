import type { Waypoint } from "./waypoint";

export interface Order {
  id?: number;
  number: string;
  customerName: string;
  date: string;
  waypoints: Waypoint[];
}
