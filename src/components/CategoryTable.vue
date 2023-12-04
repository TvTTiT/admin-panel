<template>
    <DataTable :value="flattenedCategories" :rows="5" :paginator="flattenedCategories.length > 5" tableStyle="width: 100%">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Categories</span>
        </div>
      </template>
  
      <!-- Define an array of fields you want to display -->
      <Column v-for="field in displayFields" :key="field" :field="field" :header="formatHeader(field)"></Column>
  
      <template #footer>
        In total there are {{ flattenedCategories ? flattenedCategories.length : 0 }} categories.
      </template>
    </DataTable>
  </template>
  
  <script setup lang="ts">
  import { categories } from '../components/categories';
  
  // Flatten the array of arrays into a single array of category objects
  const flattenedCategories = categories.flat();
  
  // Define an array of fields you want to display
  const displayFields = ["id", "name", "slug", "iconUrl", "activeFrom", "activeUntil", "createdAt", "updatedAt"];
  
  // Helper function to format header based on field name
  const formatHeader = (field) => {
    // You can customize the header formatting here if needed
    return field.charAt(0).toUpperCase() + field.slice(1);
  };
  </script>
  
  <style scoped>
  /* Adjust the styles to make the table more compact */
  .p-datatable {
    font-size: 12px; /* Set the font size to 12px */
  }
  
  .p-datatable thead th {
    padding: 8px; /* Set the padding to 8px */
  }
  
  .p-datatable tbody td {
    padding: 8px; /* Set the padding to 8px */
  }
  </style>
  