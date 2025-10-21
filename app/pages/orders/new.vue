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

    <OrderForm @submit="handleSubmit" @cancel="handleCancel" />
  </v-container>
</template>

<script setup lang="ts">
import { useOrderStore } from "~/stores/orderStore";
import type { Order } from "~/types/order";
import OrderForm from "~/components/OrderForm.vue";

const router = useRouter();
const orderStore = useOrderStore();

const handleSubmit = async (formData: Partial<Order>) => {
  try {
    await orderStore.createOrder(formData as Order);
    router.push("/orders");
  } catch (err) {
    // Error is handled by the store
  }
};

const handleCancel = () => {
  router.push("/orders");
};
</script>
