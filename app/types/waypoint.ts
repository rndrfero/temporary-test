export type WaypointType = "Pickup" | "Delivery";

export interface Waypoint {
  id?: number;
  orderId?: number;
  address: string;
  type: WaypointType;
}
