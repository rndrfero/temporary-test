<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-h4">Create New Order</h1>
      </v-col>
    </v-row>

    <v-alert v-if="orderStore.error" type="error" class="mb-4">
      {{ orderStore.error }}
    </v-alert>

    <OrderForm
      v-if="orderStore.order"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </v-container>
</template>

<script setup lang="ts">
import moment from "moment";
import { useOrderRecordStore } from "~/stores/orderRecordStore";
import type { Order } from "~/types/order";
import OrderForm from "~/components/OrderForm.vue";

const router = useRouter();
const orderStore = useOrderRecordStore();

// Initialize empty order for creation
onMounted(() => {
  orderStore.initializeOrder({
    number: "",
    customerName: "",
    date: moment().format("YYYY-MM-DD"),
    waypoints: [],
  });
});

// Clear order when leaving
onUnmounted(() => {
  orderStore.clearOrder();
});

const handleSubmit = async (formData: Partial<Order>) => {
  try {
    const newOrder = await orderStore.createOrder(formData as Order);
    if (newOrder?.id) {
      // Navigate to edit page for the newly created order
      router.push(`/orders/${newOrder.id}`);
    }
  } catch (err) {
    // Error is handled by the store
  }
};

const handleCancel = () => {
  orderStore.clearOrder();
  router.push("/orders");
};
</script>
