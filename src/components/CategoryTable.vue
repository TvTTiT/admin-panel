<template>
  <!-- Container for the DataTable component -->
  <div class="datatable-container">
    <!-- Global search input with an icon -->
    <div class="p-input-icon-left global-search">
      <i class="pi pi-search"></i>
      <InputText v-model="globalFilter" placeholder="Global Search" />
    </div>

    <!-- DataTable component for displaying categories -->
    <DataTable
      :value="filteredCategories"
      editMode="row"
      dataKey="id"
      :paginator="true"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      :removable-sort="true"
      :tableStyle="{ overflow: 'auto', 'max-height': '600px', width: '100%', 'min-width': '1500px' }"
    >
      <!-- Header template -->
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between">
          <span class="text-lg font-semibold">Categories</span>
        </div>
      </template>

      <!-- Loop through display fields to create columns in the DataTable -->
      <Column v-for="field in displayFields" :key="field" :field="field" :header="formatHeader(field)" :sortable="true"/>

      <!-- Column for row editor actions (e.g., edit and delete buttons) -->
      <Column :rowEditor="true" style="width: 10%" bodyStyle="text-align:center">
        <template #body>
          <button class="p-button p-button-text p-mr-2">
            <i class="pi pi-pencil"></i>
          </button>
          <button class="p-button p-button-text">
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>

      <!-- Footer template displaying the total number of categories -->
      <template #footer>
        In total there are {{ filteredCategories ? filteredCategories.length : 0 }} categories.
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { categories } from '../data/categories';

// Ref for the global search filter
const globalFilter = ref('');
// Ref for flattened categories data
const flattenedCategories = ref(categories.flat());
// Array of fields to display in the DataTable
const displayFields = ["id", "name", "slug", "iconUrl", "activeFrom", "activeUntil", "createdAt", "updatedAt"];
// Ref for storing filtered categories
const filteredCategories = ref(flattenedCategories.value);

// Helper function to format header based on field name
const formatHeader = (field) => field.charAt(0).toUpperCase() + field.slice(1);

// Watch for changes in the global search filter
watch(globalFilter, (newVal) => {
  // Convert the search term to lowercase
  const searchTerm = newVal.toLowerCase();

  // Filter categories based on the search term
  filteredCategories.value = searchTerm
    ? flattenedCategories.value.filter(category => displayFields.some(field => String(category[field]).toLowerCase().includes(searchTerm)))
    : flattenedCategories.value;

  // Ensure filteredCategories is defined
  filteredCategories.value = filteredCategories.value || [];
});
</script>


<style scoped>
.datatable-container {
  overflow-x: auto;
  overflow-y: auto;
}

.p-datatable {
  font-size: 12px;
}

.p-datatable thead th,
.p-datatable tbody td {
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.global-search {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.p-inputtext {
  width: 100%;
}
</style>
