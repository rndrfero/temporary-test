<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-h4">
          Edit Order #{{ orderStore.order?.number || id }}
        </h1>
      </v-col>
    </v-row>

    <v-alert v-if="orderStore.loading" type="info" class="mb-4">
      Loading order...
    </v-alert>

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

const route = useRoute();
const router = useRouter();
const orderStore = useOrderRecordStore();

const id = computed(() => Number(route.params.id));

onMounted(async () => {
  await orderStore.fetchOrder(id.value);
});

onUnmounted(() => {
  orderStore.clearOrder();
});

const handleSubmit = async (formData: Partial<Order>) => {
  await orderStore.updateOrder(id.value, formData);
};

const handleCancel = () => {
  router.push("/orders");
};
</script>
