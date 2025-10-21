<template>
  <v-card>
    <v-card-text>
      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.number"
              label="Order Number"
              variant="outlined"
              :rules="[rules.required, rules.maxLength(50)]"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.customerName"
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
              v-model="form.date"
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
              :order="{ waypoints } as any"
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
              {{ order ? "Update Order" : "Create Order" }}
            </v-btn>
            <v-btn @click="$emit('cancel')"> Cancel </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import moment from "moment";
import type { Order } from "~/types/order";
import type { Waypoint } from "~/types/waypoint";
import type { VForm } from "vuetify/components";
import WaypointForm from "~/components/WaypointForm.vue";
import WaypointsTable from "~/components/WaypointsTable.vue";

interface Props {
  order?: Order;
}

const props = withDefaults(defineProps<Props>(), {
  order: undefined,
});

const emit = defineEmits<{
  submit: [data: Partial<Order>];
  cancel: [];
}>();

const formRef = ref<VForm | null>(null);
const rules = useValidationRules();

const form = ref({
  number: props.order?.number || "",
  customerName: props.order?.customerName || "",
  date: props.order?.date || moment().format("YYYY-MM-DD"),
});

const waypoints = ref<Waypoint[]>(props.order?.waypoints || []);

// Watch for changes in order (useful if it loads async)
watch(
  () => props.order,
  (newData) => {
    if (newData) {
      form.value = {
        number: newData.number,
        customerName: newData.customerName,
        date: newData.date,
      };
      waypoints.value = newData.waypoints || [];
    }
  },
  { immediate: true }
);

const handleAddWaypoint = (waypoint: Omit<Waypoint, "id" | "orderId">) => {
  waypoints.value.push({
    ...waypoint,
    id: Date.now(),
    orderId: props.order?.id || 0,
  });
};

const handleRemoveWaypoint = (waypointId: number) => {
  waypoints.value = waypoints.value.filter((w) => w.id !== waypointId);
};

const handleSubmit = async () => {
  const { valid } = await formRef.value!.validate();

  if (valid) {
    emit("submit", { ...form.value, waypoints: waypoints.value });
  }
};
</script>
