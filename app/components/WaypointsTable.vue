<template>
  <v-data-table
    :headers="headers"
    :items="order?.waypoints || []"
    :items-per-page="-1"
    hide-default-footer
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Waypoints</v-toolbar-title>
      </v-toolbar>
    </template>

    <template #[`item.type`]="{ item }">
      <v-chip
        :color="item.type === 'Pickup' ? 'primary' : 'success'"
        size="small"
      >
        {{ item.type }}
      </v-chip>
    </template>

    <template #[`item.actions`]="{ index }">
      <v-btn
        icon="mdi-delete"
        size="small"
        variant="text"
        color="error"
        @click="$emit('remove', index)"
      />
    </template>

    <template #no-data>
      <v-alert type="info" variant="tonal" class="ma-4">
        No waypoints available
      </v-alert>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { Order } from "~/types/order";

interface Props {
  order?: Order;
}

const props = withDefaults(defineProps<Props>(), {
  order: undefined,
});

const emit = defineEmits<{
  remove: [index: number];
}>();

const headers = [
  { title: "ID", key: "id", align: "start" as const },
  { title: "Type", key: "type", align: "start" as const },
  { title: "Address", key: "address", align: "start" as const },
  {
    title: "Actions",
    key: "actions",
    align: "center" as const,
    sortable: false,
  },
];
</script>
