<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-4">Vuetify Test Page</h1>
          <p class="text-subtitle-1 mb-6">
            Testing Vuetify components installation
          </p>
        </v-col>
      </v-row>

      <!-- Buttons Section -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Buttons</v-card-title>
            <v-card-text>
              <v-btn color="primary" class="mr-2">Primary</v-btn>
              <v-btn color="secondary" class="mr-2">Secondary</v-btn>
              <v-btn color="success" class="mr-2">Success</v-btn>
              <v-btn color="error" class="mr-2">Error</v-btn>
              <v-btn color="warning" class="mr-2">Warning</v-btn>
              <v-btn color="info">Info</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Form Elements -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Form Elements</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="textValue"
                label="Text Field"
                variant="outlined"
                class="mb-3"
              ></v-text-field>

              <v-select
                v-model="selectValue"
                :items="selectItems"
                label="Select"
                variant="outlined"
                class="mb-3"
              ></v-select>

              <v-checkbox v-model="checkboxValue" label="Checkbox"></v-checkbox>

              <v-switch
                v-model="switchValue"
                label="Switch"
                color="primary"
              ></v-switch>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Icons Section -->
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Material Design Icons</v-card-title>
            <v-card-text>
              <v-icon icon="mdi-home" size="large" class="mr-4"></v-icon>
              <v-icon icon="mdi-account" size="large" class="mr-4"></v-icon>
              <v-icon icon="mdi-heart" size="large" class="mr-4"></v-icon>
              <v-icon icon="mdi-star" size="large" class="mr-4"></v-icon>
              <v-icon icon="mdi-settings" size="large"></v-icon>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Data Table -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Data Table</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="tableHeaders"
                :items="tableItems"
                class="elevation-1"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Alert Section -->
      <v-row>
        <v-col cols="12">
          <v-alert type="success" class="mb-2">
            Success Alert - Vuetify is working!
          </v-alert>
          <v-alert type="info" class="mb-2">
            Info Alert - All components loaded
          </v-alert>
          <v-alert type="warning" class="mb-2">
            Warning Alert - Example warning
          </v-alert>
          <v-alert type="error"> Error Alert - Example error </v-alert>
        </v-col>
      </v-row>

      <!-- Chips and Progress -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Chips</v-card-title>
            <v-card-text>
              <v-chip color="primary" class="mr-2">Primary Chip</v-chip>
              <v-chip color="secondary" class="mr-2">Secondary</v-chip>
              <v-chip color="success" closable>Closable</v-chip>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Progress</v-card-title>
            <v-card-text>
              <v-progress-linear
                v-model="progressValue"
                color="primary"
                height="25"
                class="mb-3"
              >
                <strong>{{ Math.ceil(progressValue) }}%</strong>
              </v-progress-linear>

              <v-progress-circular
                :model-value="progressValue"
                color="primary"
                size="64"
              >
                {{ Math.ceil(progressValue) }}
              </v-progress-circular>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

const textValue = ref("");
const selectValue = ref("");
const selectItems = ["Option 1", "Option 2", "Option 3"];
const checkboxValue = ref(false);
const switchValue = ref(false);
const progressValue = ref(65);

const tableHeaders = [
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
];

const tableItems = [
  { name: "John Doe", email: "john@example.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "User" },
  { name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
];
</script>
