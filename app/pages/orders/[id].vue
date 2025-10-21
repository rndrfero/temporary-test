<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-h4">Edit Order #{{ order?.number || id }}</h1>
      </v-col>
    </v-row>

    <v-alert v-if="loading" type="info" class="mb-4">
      Loading order...
    </v-alert>

    <v-alert v-if="orderStore.error" type="error" class="mb-4">
      {{ orderStore.error }}
    </v-alert>

    <OrderForm
      v-if="order"
      :order="order"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

    <v-row v-if="order" class="mt-6">
      <v-col>
        <WaypointForm @submit="handleAddWaypoint" />
      </v-col>
    </v-row>

    <v-row v-if="order" class="mt-4">
      <v-col>
        <WaypointsTable :order="order" @remove="handleRemoveWaypoint" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useOrderStore } from "~/stores/orderStore";
import type { Order } from "~/types/order";
import type { Waypoint } from "~/types/waypoint";
import OrderForm from "~/components/OrderForm.vue";
import WaypointForm from "~/components/WaypointForm.vue";
import WaypointsTable from "~/components/WaypointsTable.vue";

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

const id = computed(() => Number(route.params.id));
const order = ref<Order | null>(null);
const loading = ref(true);

// Watch for changes in the store to keep the local order in sync
watch(
  () => orderStore.getOrderById(id.value),
  (updatedOrder) => {
    if (updatedOrder) {
      order.value = { ...updatedOrder };
    }
  },
  { deep: true }
);

onMounted(async () => {
  loading.value = true;
  // Ensure orders are loaded
  if (orderStore.orders.length === 0) {
    await orderStore.fetchOrders();
  }

  const foundOrder = orderStore.getOrderById(id.value);
  if (foundOrder) {
    order.value = { ...foundOrder };
  } else {
    orderStore.error = "Order not found";
  }
  loading.value = false;
});

const handleSubmit = async (formData: Partial<Order>) => {
  try {
    // Include the current waypoints when updating
    await orderStore.updateOrder(id.value, {
      ...formData,
      waypoints: order.value?.waypoints || [],
    });
    router.push("/orders");
  } catch (err) {
    // Error is handled by the store
  }
};

const handleCancel = () => {
  router.push("/orders");
};

const handleAddWaypoint = (waypoint: Omit<Waypoint, "id" | "orderId">) => {
  orderStore.addWaypoint(id.value, waypoint);
};

const handleRemoveWaypoint = (waypointId: number) => {
  orderStore.removeWaypoint(id.value, waypointId);
};
</script>
