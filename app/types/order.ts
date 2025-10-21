import type { Waypoint } from "./waypoint";

export interface Order {
  id?: number;
  number: string;
  customerName: string;
  date: string;
  waypoints: Waypoint[];
}

export interface CreateOrderDto {
  number: string;
  customerName: string;
  date: string;
}

export interface UpdateOrderDto {
  number?: string;
  customerName?: string;
  date?: string;
}
