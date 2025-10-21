import { defineStore } from "pinia";
import type { Order } from "~/types/order";
import { orderApi } from "~/services/orderApi";
import { useAsyncState } from "~/composables/useAsyncState";

export const useOrderCollectionStore = defineStore("orderCollection", () => {
  // Domain-specific state
  const orders = ref<Order[]>([]);
  const totalCount = ref(0);

  // Shared async state
  const { loading, error, withLoadingAndError } = useAsyncState();

  // Actions
  async function fetchOrders(page = 1, limit = 10) {
    return withLoadingAndError(async () => {
      const result = await orderApi.getOrders(page, limit);
      orders.value = result.orders;
      totalCount.value = result.totalCount;
    });
  }

  async function deleteOrder(id: number) {
    return withLoadingAndError(async () => {
      await orderApi.deleteOrder(id);
      // No need to update local state - page will refresh
    });
  }

  return {
    // State
    orders,
    totalCount,
    loading,
    error,
    // Actions
    fetchOrders,
    deleteOrder,
  };
});
