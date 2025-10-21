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
      :initial-data="order"
      :loading="orderStore.loading"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </v-container>
</template>

<script setup lang="ts">
import { useOrderStore } from "~/stores/orderStore";
import type { UpdateOrderDto, Order } from "~/types/order";
import OrderForm from "~/components/OrderForm.vue";

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

const id = computed(() => Number(route.params.id));
const order = ref<Order | null>(null);
const loading = ref(true);

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

const handleSubmit = async (formData: UpdateOrderDto) => {
  try {
    await orderStore.updateOrder(id.value, formData);
    router.push("/orders");
  } catch (err) {
    // Error is handled by the store
  }
};

const handleCancel = () => {
  router.push("/orders");
};
</script>
