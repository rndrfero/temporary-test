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
import { useOrderRecordStore } from "~/stores/orderRecordStore";
import type { Order } from "~/types/order";
import OrderForm from "~/components/OrderForm.vue";

const router = useRouter();
const orderStore = useOrderRecordStore();

onMounted(() => {
  const todayDate = new Date().toISOString().split("T")[0];
  orderStore.initializeOrder({
    date: todayDate,
  });
});

onUnmounted(() => {
  orderStore.clearOrder();
});

const handleSubmit = async (formData: Partial<Order>) => {
  const newOrder = await orderStore.createOrder(formData as Order);
  if (newOrder && newOrder.id) {
    router.push(`/orders/${newOrder.id}`);
  }
};

const handleCancel = () => {
  router.push("/orders");
};
</script>
