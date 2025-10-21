<template>
  <v-card>
    <v-card-title>Add Waypoint</v-card-title>
    <v-card-text>
      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.type"
              label="Type"
              :items="WAYPOINT_TYPES"
              variant="outlined"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.address"
              label="Address"
              variant="outlined"
              :rules="[
                rules.required,
                rules.minLength(5),
                rules.maxLength(200),
              ]"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn type="submit" color="primary" class="mr-2">
              Add Waypoint
            </v-btn>
            <v-btn @click="resetForm"> Clear </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Waypoint } from "~/types/waypoint";
import { WAYPOINT_TYPES } from "~/types/waypoint";
import type { VForm } from "vuetify/components";

type WaypointFormData = Omit<Waypoint, "id" | "orderId">;

const emit = defineEmits<{
  submit: [data: WaypointFormData];
}>();

const formRef = ref<VForm | null>(null);
const rules = useValidationRules();

const createInitialFormState = (): WaypointFormData => ({
  address: "",
  type: "Pickup",
});

const form = ref<WaypointFormData>(createInitialFormState());

const handleSubmit = async () => {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();

  if (valid) {
    emit("submit", form.value);
    resetForm();
  }
};

const resetForm = () => {
  form.value = createInitialFormState();
  formRef.value?.resetValidation();
};
</script>
