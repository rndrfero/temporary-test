<template>
  <v-card>
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

        <v-divider class="my-4" />

        <v-row>
          <v-col>
            <v-btn
              type="submit"
              color="primary"
              class="mr-2"
              :loading="loading"
            >
              {{ initialData ? "Update Order" : "Create Order" }}
            </v-btn>
            <v-btn @click="$emit('cancel')"> Cancel </v-btn>
          </v-col>
        </v-row>
      </form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import moment from "moment";
import type { Order } from "~/types/order";

interface Props {
  initialData?: Order;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: undefined,
  loading: false,
});

const emit = defineEmits<{
  submit: [data: { number: string; customerName: string; date: string }];
  cancel: [];
}>();

const form = ref({
  number: props.initialData?.number || "",
  customerName: props.initialData?.customerName || "",
  date: props.initialData?.date || moment().format("YYYY-MM-DD"),
});

// Watch for changes in initialData (useful if it loads async)
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.value = {
        number: newData.number,
        customerName: newData.customerName,
        date: newData.date,
      };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit("submit", { ...form.value });
};
</script>
