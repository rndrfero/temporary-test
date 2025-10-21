<template>
  <v-container>
    <h1 class="text-h4 mb-4">Orders</h1>

    <v-alert v-if="orderStore.loading" type="info" class="mb-4">
      Loading...
    </v-alert>

    <v-alert v-if="orderStore.error" type="error" class="mb-4">
      {{ orderStore.error }}
    </v-alert>

    <v-card class="mb-6">
      <v-card-text>
        <form @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.number"
                label="Order Number"
                variant="outlined"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.customerName"
                label="Customer Name"
                variant="outlined"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.date"
                label="Date"
                type="date"
                variant="outlined"
                required
              />
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary" class="mr-2">
            {{ editingId ? "Update" : "Create" }}
          </v-btn>
          <v-btn v-if="editingId" @click="cancelEdit">Cancel</v-btn>
        </form>
      </v-card-text>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="orderStore.orders"
      :items-per-page="10"
    >
      <template #item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template #item.actions="{ item }">
        <v-btn size="small" icon="mdi-pencil" @click="editOrder(item)" />
        <v-btn
          size="small"
          icon="mdi-delete"
          color="error"
          @click="deleteOrder(item.id!)"
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import moment from "moment";
import { useOrderStore } from "~/stores/orderStore";
import type { Order } from "~/types/order";

const orderStore = useOrderStore();

const form = ref({
  number: "",
  customerName: "",
  date: moment().format("YYYY-MM-DD"),
});

const editingId = ref<number | null>(null);

const headers = [
  { title: "Order Number", key: "number" },
  { title: "Customer Name", key: "customerName" },
  { title: "Date", key: "date" },
  { title: "Actions", key: "actions", sortable: false },
];

onMounted(() => {
  orderStore.fetchOrders();
});

const handleSubmit = async () => {
  if (editingId.value) {
    await orderStore.updateOrder(editingId.value, form.value);
    editingId.value = null;
  } else {
    await orderStore.createOrder(form.value);
  }
  form.value = {
    number: "",
    customerName: "",
    date: moment().format("YYYY-MM-DD"),
  };
};

const editOrder = (order: Order) => {
  editingId.value = order.id!;
  form.value = {
    number: order.number,
    customerName: order.customerName,
    date: order.date,
  };
};

const cancelEdit = () => {
  editingId.value = null;
  form.value = {
    number: "",
    customerName: "",
    date: moment().format("YYYY-MM-DD"),
  };
};

const deleteOrder = async (id: number) => {
  if (confirm("Delete this order?")) {
    await orderStore.deleteOrder(id);
  }
};

const formatDate = (date: string) => moment(date).format("MMM DD, YYYY");
</script>
