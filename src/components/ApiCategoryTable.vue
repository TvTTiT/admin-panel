<template>
  <div class="datatable-container">
    <h2>Supabase Api Categories</h2>

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
      :tableStyle="{ overflow: 'auto', 'max-height': '600px', width: '100%' }"
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

      <Column :rowEditor="true" style="width: 20%; min-width: 8rem" bodyStyle="text-align:center">
          <template #body>
          <button @click="onEditClick()" class="p-button p-button-text p-mr-2">
              <i class="pi pi-pencil"></i>
          </button>
          <button @click="onDeleteClick()" class="p-button p-button-text">
              <i class="pi pi-trash"></i>
          </button>
          </template>
      </Column>

      <template #footer>
          In total there are {{ categories ? categories.length : 0 }} categories.
      </template>
    </DataTable>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import supabase from '../lib/supabase';
  
  const globalFilter = ref('');
  const categories = ref([]);
  const filteredCategories = ref([]);
  const displayFields = ["id", "name", "slug", "iconUrl", "activeFrom", "activeUntil", "createdAt", "updatedAt"];
  
  const formatHeader = (field) => {
    return field.charAt(0).toUpperCase() + field.slice(1);
  };
  
  const onEditClick = (rowData) => {
    // Handle edit logic with Supabase API here
    console.log('Edit clicked', rowData);
  };
  
  const onDeleteClick = (rowData) => {
    // Handle delete logic with Supabase API here
    console.log('Delete clicked', rowData);
  };
  
  onMounted(async () => {
    try {
      const { data, error } = await supabase.from('Categories').select('*');
      if (error) {
        throw error;
      }
      console.log('Fetched data from Supabase:', data);
      categories.value = data;
  
      // Initialize filteredCategories with all categories
      filteredCategories.value = categories.value;
    } catch (error) {
      console.error('Error fetching data from Supabase:', error.message);
    }
  });
  
  watch(globalFilter, (newVal) => {
    const searchTerm = newVal.toLowerCase();
  
    filteredCategories.value = searchTerm
      ? categories.value.filter(category => {
          return displayFields.some(field => {
            const fieldValue = String(category[field]).toLowerCase();
            return fieldValue.includes(searchTerm);
          });
        })
      : categories.value; // Show all categories when search is empty
  });
  </script>
  
  <style scoped>
  .datatable-container {
    overflow-x: auto;
    overflow-y: auto;
    max-width: 100%;
    max-height: 100%;
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
  
  .global-search{
    display: flex;
    align-items: center; 
    margin-bottom: 5px;
}

  </style>
  