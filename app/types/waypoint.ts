export const WAYPOINT_TYPES = ["Pickup", "Delivery"] as const;

export type WaypointType = (typeof WAYPOINT_TYPES)[number];

export interface Waypoint {
  id?: number;
  orderId?: number;
  address: string;
  type: WaypointType;
}
