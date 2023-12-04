<template>
  <DataTable
    v-model:editingRows="editingRows"
    :value="flattenedCategories"
    :editMode="'row'"
    dataKey="id"
    @row-edit-save="onRowEditSave"
    :paginator="true"
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20]"
    :tableStyle="{minWidth: '50rem'}"
  >
    <template #header>
      <div class="flex flex-wrap align-items-center justify-content-between gap-2">
        <span class="text-lg font-semibold">Categories</span>
      </div>
    </template>

    <Column v-for="field in displayFields" :key="field" :field="field" :header="formatHeader(field)" :sortable="true">
      <template #editor="{ data, field }">
        <input v-model="data[field]" />
      </template>
    </Column>

    <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>

    <template #footer>
      In total there are {{ flattenedCategories ? flattenedCategories.length : 0 }} categories.
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { categories } from '../data/categories';

const flattenedCategories = ref(categories.reduce((acc, current) => acc.concat(current), []));

const editingRows = ref([]);

const displayFields = ["id", "name", "slug", "iconUrl", "activeFrom", "activeUntil", "createdAt", "updatedAt"];

// Helper function to format header based on field name
const formatHeader = (field) => {
  return field.charAt(0).toUpperCase() + field.slice(1);
};

const onRowEditSave = (event) => {
  console.log('Row edit saved:', event);
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
