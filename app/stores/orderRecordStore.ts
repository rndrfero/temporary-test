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
      this.order!.waypoints.push({
        ...waypoint,
        orderId: this.order!.id,
      });
    },

    removeWaypointAtIndex(index: number) {
      this.order!.waypoints.splice(index, 1);
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
