import { defineStore } from "pinia";
import type { Order } from "~/types/order";

export const useOrderCollectionStore = defineStore("orderCollection", {
  state: () => ({
    orders: [] as Order[],
    totalCount: 0,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    totalOrders: (state) => state.orders.length,
  },

  actions: {
    async fetchOrders(page = 1, limit = 10) {
      console.log("** fetchOrders", page, limit);
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

    async deleteOrder(id: number) {
      this.loading = true;
      this.error = null;
      try {
        await $fetch(`http://localhost:3001/orders/${id}`, {
          method: "DELETE",
        });
        this.orders = this.orders.filter((order) => order.id !== id);
        this.totalCount = Math.max(0, this.totalCount - 1);
      } catch (err: any) {
        this.error = err.message || "Failed to delete order";
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
