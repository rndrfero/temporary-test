import { defineStore } from "pinia";
import type { Order, CreateOrderDto, UpdateOrderDto } from "~/types/order";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as Order[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getOrderById: (state) => (id: number) => {
      return state.orders.find((order) => order.id === id);
    },
    totalOrders: (state) => state.orders.length,
  },

  actions: {
    async fetchOrders() {
      this.loading = true;
      this.error = null;
      try {
        const data = await $fetch<Order[]>("http://localhost:3001/orders");
        this.orders = data;
      } catch (err: any) {
        this.error = err.message || "Failed to fetch orders";
      } finally {
        this.loading = false;
      }
    },

    async createOrder(orderData: CreateOrderDto) {
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

    async updateOrder(id: number, orderData: UpdateOrderDto) {
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
  },
});
