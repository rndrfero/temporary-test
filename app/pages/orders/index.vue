<template>
  <v-container>
    <v-row align="center" class="mb-4">
      <v-col>
        <h1 class="text-h4">Orders</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          :to="{ path: '/orders/new' }"
        >
          Add New Order
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="orderStore.error" type="error" class="mb-4">
      {{ orderStore.error }}
    </v-alert>

    <v-data-table-server
      :headers="headers"
      :items="orderStore.orders"
      :items-length="orderStore.totalCount"
      :loading="orderStore.loading"
      @update:options="loadOrders"
    >
      <template #item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template #item.waypoints="{ item }">
        {{ item.waypoints.length }}
      </template>
      <template #item.actions="{ item }">
        <v-btn
          size="small"
          icon="mdi-pencil"
          :to="{ path: `/orders/${item.id}` }"
        />
        <v-btn
          size="small"
          icon="mdi-delete"
          color="error"
          @click="item.id && deleteOrder(item.id)"
        />
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup lang="ts">
import { useOrderCollectionStore } from "~/stores/orderCollectionStore";

interface DataTableOptions {
  page: number;
  itemsPerPage: number;
}

const orderStore = useOrderCollectionStore();

const headers = [
  { title: "Order Number", key: "number" },
  { title: "Customer Name", key: "customerName" },
  { title: "Date", key: "date" },
  { title: "Waypoints", key: "waypoints", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
];

const currentOptions = ref<DataTableOptions>({
  page: 1,
  itemsPerPage: 10,
});

const loadOrders = (options: DataTableOptions) => {
  currentOptions.value = options;
  orderStore.fetchOrders(options.page, options.itemsPerPage);
};

const deleteOrder = async (id: number) => {
  if (confirm("Delete this order?")) {
    await orderStore.deleteOrder(id);
    // Refresh to maintain correct pagination/count
    orderStore.fetchOrders(
      currentOptions.value.page,
      currentOptions.value.itemsPerPage
    );
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
</script>
