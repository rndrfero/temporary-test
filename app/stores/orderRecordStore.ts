import { defineStore } from "pinia";
import type { Order } from "~/types/order";
import type { Waypoint } from "~/types/waypoint";

export const useOrderRecordStore = defineStore("orderRecord", {
  state: () => ({
    order: undefined as Order | undefined,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchOrder(id: number) {
      this.loading = true;
      this.error = null;
      try {
        this.order = await $fetch<Order>(`http://localhost:3001/orders/${id}`);
      } catch (err: any) {
        this.error = err.message || "Failed to fetch order";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async createOrder(orderData: Order) {
      this.loading = true;
      this.error = null;
      try {
        const newOrder = await $fetch<Order>("http://localhost:3001/orders", {
          method: "POST",
          body: orderData,
        });
        this.order = newOrder;
        return newOrder;
      } catch (err: any) {
        this.error = err.message || "Failed to create order";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateOrder(id: number, orderData: Partial<Order>) {
      this.loading = true;
      this.error = null;
      try {
        const updatedOrder = await $fetch<Order>(
          `http://localhost:3001/orders/${id}`,
          {
            method: "PATCH",
            body: orderData,
          }
        );
        this.order = updatedOrder;
        return updatedOrder;
      } catch (err: any) {
        this.error = err.message || "Failed to update order";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Waypoint manipulation (in-memory, works on this.order)
    addWaypoint(waypoint: Omit<Waypoint, "id" | "orderId">) {
      if (!this.order) return;

      if (!this.order.waypoints) {
        this.order.waypoints = [];
      }

      const maxId =
        this.order.waypoints.length > 0
          ? Math.max(...this.order.waypoints.map((w) => w.id || 0))
          : 0;

      const newWaypoint: Waypoint = {
        id: maxId + 1,
        orderId: this.order.id || 0,
        ...waypoint,
      };

      this.order.waypoints.push(waypoint);
    },

    removeWaypoint(waypointId: number) {
      if (!this.order || !this.order.waypoints) return;
      this.order.waypoints = this.order.waypoints.filter(
        (w) => w.id !== waypointId
      );
    },

    initializeOrder(orderData?: Partial<Order>) {
      this.order = {
        id: undefined,
        number: "",
        customerName: "",
        date: "",
        waypoints: [],
        ...orderData,
      } as Order;
      this.error = null;
    },

    clearOrder() {
      this.order = undefined;
      this.error = null;
    },
  },
});
