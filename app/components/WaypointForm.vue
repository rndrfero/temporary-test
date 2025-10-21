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
              :items="waypointTypes"
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
import type { WaypointType } from "~/types/waypoint";
import type { VForm } from "vuetify/components";

const emit = defineEmits<{
  submit: [data: { address: string; type: WaypointType }];
}>();

const formRef = ref<VForm | null>(null);
const rules = useValidationRules();

const waypointTypes: WaypointType[] = ["Pickup", "Delivery"];

const form = ref<{
  address: string;
  type: WaypointType | null;
}>({
  address: "",
  type: null,
});

const handleSubmit = async () => {
  const { valid } = await formRef.value!.validate();

  if (valid && form.value.type) {
    emit("submit", {
      address: form.value.address,
      type: form.value.type,
    });
    resetForm();
  }
};

const resetForm = () => {
  form.value = {
    address: "",
    type: null,
  };
  formRef.value?.resetValidation();
};
</script>
