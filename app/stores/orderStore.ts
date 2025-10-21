import { defineStore } from "pinia";
import type { Order } from "~/types/order";
import type { Waypoint, WaypointType } from "~/types/waypoint";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as Order[],
    loading: false,
    error: null as string | null,
    totalCount: 0,
  }),

  getters: {
    getOrderById: (state) => (id: number) => {
      return state.orders.find((order) => order.id === id);
    },
    totalOrders: (state) => state.orders.length,
  },

  actions: {
    async fetchOrders(page = 1, limit = 10) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(
          `http://localhost:3001/orders?_page=${page}&_limit=${limit}`
        );
        this.totalCount = parseInt(
          response.headers.get("x-total-count") || "0"
        );
        this.orders = await response.json();
      } catch (err: any) {
        this.error = err.message || "Failed to fetch orders";
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
        this.orders.push(newOrder);
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
        const index = this.orders.findIndex((order) => order.id === id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
        return updatedOrder;
      } catch (err: any) {
        this.error = err.message || "Failed to update order";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteOrder(id: number) {
      this.loading = true;
      this.error = null;
      try {
        await $fetch(`http://localhost:3001/orders/${id}`, {
          method: "DELETE",
        });
        this.orders = this.orders.filter((order) => order.id !== id);
      } catch (err: any) {
        this.error = err.message || "Failed to delete order";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // In-memory waypoint manipulation (no API calls)
    addWaypoint(orderId: number, waypoint: Omit<Waypoint, "id" | "orderId">) {
      const order = this.orders.find((o) => o.id === orderId);
      if (order) {
        if (!order.waypoints) {
          order.waypoints = [];
        }
        // Generate a temporary ID for the waypoint
        const maxId =
          order.waypoints.length > 0
            ? Math.max(...order.waypoints.map((w) => w.id || 0))
            : 0;
        const newWaypoint: Waypoint = {
          id: maxId + 1,
          orderId,
          ...waypoint,
        };
        order.waypoints.push(newWaypoint);
      }
    },

    removeWaypoint(orderId: number, waypointId: number) {
      const order = this.orders.find((o) => o.id === orderId);
      if (order && order.waypoints) {
        order.waypoints = order.waypoints.filter((w) => w.id !== waypointId);
      }
    },
  },
});
