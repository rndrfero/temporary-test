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
          @click="deleteOrder(item.id!)"
        />
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup lang="ts">
import moment from "moment";
import { useOrderStore } from "~/stores/orderStore";

const orderStore = useOrderStore();

const headers = [
  { title: "Order Number", key: "number" },
  { title: "Customer Name", key: "customerName" },
  { title: "Date", key: "date" },
  { title: "Actions", key: "actions", sortable: false },
];

const loadOrders = (options: any) => {
  orderStore.fetchOrders(options.page, options.itemsPerPage);
};

const deleteOrder = async (id: number) => {
  if (confirm("Delete this order?")) {
    await orderStore.deleteOrder(id);
  }
};

const formatDate = (date: string) => moment(date).format("MMM DD, YYYY");
</script>
