<template>
  <div>
    <h1>Orders</h1>

    <div v-if="orderStore.loading">Loading...</div>
    <div v-if="orderStore.error">Error: {{ orderStore.error }}</div>

    <form @submit.prevent="handleSubmit">
      <input v-model="form.number" placeholder="Order Number" required />
      <input v-model="form.customerName" placeholder="Customer Name" required />
      <input v-model="form.date" type="date" required />
      <button type="submit">{{ editingId ? "Update" : "Create" }}</button>
      <button v-if="editingId" type="button" @click="cancelEdit">Cancel</button>
    </form>

    <div v-for="order in orderStore.orders" :key="order.id">
      <p>
        {{ order.number }} - {{ order.customerName }} -
        {{ formatDate(order.date) }}
      </p>
      <button @click="editOrder(order)">Edit</button>
      <button @click="deleteOrder(order.id!)">Delete</button>
    </div>
  </div>
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
