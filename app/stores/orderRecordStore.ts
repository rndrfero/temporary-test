import { defineStore } from "pinia";
import type { Order } from "~/types/order";
import type { Waypoint } from "~/types/waypoint";
import { orderApi } from "~/services/orderApi";
import { useAsyncState } from "~/composables/useAsyncState";

export const useOrderRecordStore = defineStore("orderRecord", () => {
  // Domain-specific state
  const order = ref<Order | undefined>(undefined);

  // Shared async state
  const { loading, error, withLoadingAndError } = useAsyncState();

  // Actions - API calls
  async function fetchOrder(id: number) {
    return withLoadingAndError(async () => {
      order.value = await orderApi.getOrder(id);
    });
  }

  async function createOrder(orderData: Order) {
    return withLoadingAndError(async () => {
      const newOrder = await orderApi.createOrder(orderData);
      order.value = newOrder;
      return newOrder;
    });
  }

  async function updateOrder(id: number, orderData: Partial<Order>) {
    return withLoadingAndError(async () => {
      const updatedOrder = await orderApi.updateOrder(id, orderData);
      order.value = updatedOrder;
      return updatedOrder;
    });
  }

  // Actions - Waypoint manipulation (in-memory, works on order)
  function addWaypoint(waypoint: Omit<Waypoint, "id" | "orderId">) {
    order.value!.waypoints.push({
      ...waypoint,
      orderId: order.value!.id,
    });
  }

  function removeWaypointAtIndex(index: number) {
    order.value!.waypoints.splice(index, 1);
  }

  function initializeOrder(orderData?: Partial<Order>) {
    order.value = {
      id: undefined,
      number: "",
      customerName: "",
      date: "",
      waypoints: [],
      ...orderData,
    } as Order;
    error.value = null;
  }

  function clearOrder() {
    order.value = undefined;
    error.value = null;
  }

  return {
    // State
    order,
    loading,
    error,
    // Actions
    fetchOrder,
    createOrder,
    updateOrder,
    addWaypoint,
    removeWaypointAtIndex,
    initializeOrder,
    clearOrder,
  };
});
