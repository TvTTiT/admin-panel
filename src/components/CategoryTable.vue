<template>
  <div class="datatable-container">
    <div class="p-input-icon-left global-search">
      <i class="pi pi-search"></i>
      <InputText v-model="globalFilter" placeholder="Global Search" />
    </div>

    <DataTable
      :value="filteredCategories"
      :editMode="'row'"
      dataKey="id"
      :paginator="true"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      :removable-sort="true"
      :tableStyle="{ overflow: 'auto', 'max-height': '600px', width: '100%', 'min-width': '1500px' }" 
    >

    <template #header>
      <div class="flex flex-wrap align-items-center justify-content-between">
        <span class="text-lg font-semibold">Categories</span>
      </div>
    </template>

    <Column v-for="field in displayFields" :key="field" :field="field" :header="formatHeader(field)" :sortable="true">
      <template #editor="{ data, field }">
        <input v-model="data[field]" />
      </template>
    </Column>

    <Column :rowEditor="true" style="width: 10% " bodyStyle="text-align:center">
      <template #body>
        <button class="p-button p-button-text p-mr-2">
          <i class="pi pi-pencil"></i>
        </button>
        <button class="p-button p-button-text">
          <i class="pi pi-trash"></i>
        </button>
      </template>
    </Column>

    <template #footer>
      In total there are {{ filteredCategories ? filteredCategories.length : 0 }} categories.
    </template>
  </DataTable>
</div>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';
import { categories } from '../data/categories';

const globalFilter = ref('');
const flattenedCategories = ref(categories.reduce((acc, current) => acc.concat(current), []));
const displayFields = ["id", "name", "slug", "iconUrl", "activeFrom", "activeUntil", "createdAt", "updatedAt"];

// Helper function to format header based on field name
const formatHeader = (field) => {
  return field.charAt(0).toUpperCase() + field.slice(1);
};

// Watch for changes in globalFilter and update the filteredCategories accordingly
const filteredCategories = ref(flattenedCategories.value);

watch(globalFilter, (newVal) => {
  const searchTerm = newVal.toLowerCase();

  filteredCategories.value = searchTerm
    ? flattenedCategories.value.filter(category => {
        return displayFields.some(field => {
          const fieldValue = String(category[field]).toLowerCase();
          return fieldValue.includes(searchTerm);
        });
      })
    : flattenedCategories.value;

  // Check if there is no data and set filteredCategories to an empty array
  if (filteredCategories.value === undefined) {
    filteredCategories.value = [];
  }
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

.p-datatable thead th {
  padding: 8px;
}

.p-datatable tbody td {
  padding: 6px;
}

.global-search {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.p-datatable {
  font-size: 12px;
  table-layout: fixed;
  width: 100%;
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