<template>
  <v-card>
    <v-card-text>
      <v-form
        v-if="orderStore.order"
        ref="formRef"
        @submit.prevent="handleSubmit"
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="orderStore.order.number"
              label="Order Number"
              variant="outlined"
              :rules="[rules.required, rules.maxLength(50)]"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="orderStore.order.customerName"
              label="Customer Name"
              variant="outlined"
              :rules="[
                rules.required,
                rules.minLength(3),
                rules.maxLength(100),
              ]"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="orderStore.order.date"
              label="Date"
              type="date"
              variant="outlined"
              :rules="[rules.required, rules.dateNotInPast]"
            />
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <v-row class="mt-4">
          <v-col>
            <WaypointsTable
              :order="orderStore.order"
              @remove="handleRemoveWaypoint"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <WaypointForm @submit="handleAddWaypoint" />
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <v-row>
          <v-col>
            <v-btn type="submit" color="primary" class="mr-2">
              {{ orderStore.order?.id ? "Update Order" : "Create Order" }}
            </v-btn>
            <v-btn @click="$emit('cancel')"> Cancel </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Order } from "~/types/order";
import type { Waypoint } from "~/types/waypoint";
import type { VForm } from "vuetify/components";
import WaypointForm from "~/components/WaypointForm.vue";
import WaypointsTable from "~/components/WaypointsTable.vue";
import { useOrderRecordStore } from "~/stores/orderRecordStore";

const emit = defineEmits<{
  submit: [data: Partial<Order>];
  cancel: [];
}>();

const formRef = ref<VForm | null>(null);
const rules = useValidationRules();
const orderStore = useOrderRecordStore();

const handleAddWaypoint = (waypoint: Omit<Waypoint, "id" | "orderId">) => {
  orderStore.addWaypoint(waypoint);
};

const handleRemoveWaypoint = (index: number) => {
  orderStore.removeWaypointAtIndex(index);
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();
  if (valid && orderStore.order) {
    emit("submit", orderStore.order);
  }
};
</script>
