<template>
  <DataTable :value="flattenedCategories" :rows="5" :paginator="flattenedCategories.length > 5" tableStyle="width: 100%" :removableSort="true">
    <template #header>
      <div class="flex flex-wrap align-items-center justify-content-between gap-2">
        <span class="text-lg font-semibold">Categories</span>
      </div>
    </template>

    <Column v-for="field in displayFields" :key="field" :field="field" :header="formatHeader(field)" :sortable="true"></Column>

    <template #footer>
      In total there are {{ flattenedCategories ? flattenedCategories.length : 0 }} categories.
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { categories } from '../data/categories';

const flattenedCategories = categories.flat();

const displayFields = ["id", "name", "slug", "iconUrl", "activeFrom", "activeUntil", "createdAt", "updatedAt"];

// Helper function to format header based on field name
const formatHeader = (field) => {
  return field.charAt(0).toUpperCase() + field.slice(1);
};
</script>

<style scoped>
.p-datatable {
  font-size: 12px; 
}

.p-datatable thead th {
  padding: 6px; 
}

.p-datatable tbody td {
  padding: 6px;
}
</style>
