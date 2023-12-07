<template>
  <div class="datatable-container">
    <h2>Supabase Api Categories</h2>

    <div class="p-input-icon-left global-search">
      <i class="pi pi-search"></i>
      <InputText v-model="globalFilter" placeholder="Global Search" />
    </div>

    <!-- Add a floating icon button -->
    <Button class="floating-icon-button p-button-rounded" @click="handleAddCategory">
      <i class="pi pi-plus"></i>
    </Button>

    <DataTable
      v-model:editingRows="editingRows"
      :value="filteredCategories"
      editMode="row"
      dataKey="id"
      :paginator="true"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      :removable-sort="true"
      :tableStyle="{ overflow: 'auto', 'max-height': '600px', width: '100%', 'min-width': '1500px' }"
      @row-edit-save="saveRow"
      @row-edit-cancel="cancelEdit"
    >
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-lg font-semibold">Categories</span>
        </div>
      </template>

      <Column v-for="field in displayFields" :key="field" :field="field" :header="formatHeader(field)" :sortable="true">
        <template #body="rowData">
          <template v-if="!editingRows.includes(rowData.data.id)">
            <template v-if="['activeFrom', 'activeUntil'].includes(field)">
              {{ rowData.data[field] }}
            </template>
            <template v-else-if="['id', 'updatedAt'].includes(field)">
              {{ rowData.data[field] }}
            </template>
            <template v-else>
              {{ rowData.data[field] }}
            </template>
          </template>
          <template v-else>
            <template v-if="['activeFrom', 'activeUntil', 'createdAt'].includes(field)">
              <Calendar v-model="rowData.data[field]" :showIcon="true" :placeholder="formatHeader(field)" />
            </template>
            <template v-else-if="['id', 'updatedAt'].includes(field)">
              {{ rowData.data[field] }}
            </template>
            <template v-else>
              <InputText v-model="rowData.data[field]" />
            </template>
          </template>
        </template>
      </Column>

      <Column :rowEditor="true" style="width: 150px" bodyStyle="text-align:center">
        <template #body="rowData">
          <button v-if="!editingRows.includes(rowData.data.id)" class="p-button p-button-text p-mr-2" @click="editRow(rowData.data.id)">
            <i class="pi pi-pencil"></i>
          </button>
          <template v-else>
            <button class="p-button p-button-text p-mr-2" @click="saveRow(rowData.data.id)">
              <i class="pi pi-check"></i>
            </button>
            <button class="p-button p-button-text" @click="cancelEdit(rowData.data.id)">
              <i class="pi pi-times"></i>
            </button>
          </template>
          <button class="p-button p-button-text" @click="deleteRow(rowData.data.id)">
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>

      <template #footer>
        In total there are {{ filteredCategories ? filteredCategories.length : 0 }} categories.
      </template>
    </DataTable>
    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import supabase from '../lib/supabase';
import { useToast } from "primevue/usetoast";
import {useRouter } from 'vue-router'; 

const router = useRouter(); 
const toast = useToast();
const editingRows = ref([]);
const globalFilter = ref('');
const categories = ref([]);
const filteredCategories = ref([]);
const displayFields = ["id", "name", "slug", "iconUrl", "activeFrom", "activeUntil", "createdAt", "updatedAt"];

const formatHeader = (field) => field.charAt(0).toUpperCase() + field.slice(1);

const editRow = (id) => {
  console.log(`Editing row ${id}`);
  editingRows.value.push(id);
};

const saveRow = async (id) => {
  try {
    console.log(`Saving changes for row ${id}`);
    editingRows.value = editingRows.value.filter(rowId => rowId !== id);

    const editedCategory = categories.value.find(category => category.id === id);

    const { data, error } = await supabase
      .from('Categories')
      .update({
        name: editedCategory.name,
        slug: editedCategory.slug,
        iconUrl: editedCategory.iconUrl,
        activeFrom: editedCategory.activeFrom,
        activeUntil: editedCategory.activeUntil,
        createdAt: editedCategory.createdAt,
        updatedAt: new Date(),
      })
      .eq('id', id);

    if (error) throw error;

    console.log('Updated data in Supabase:', data);

    await fetchDataFromSupabase();

    // Display success message
    toast.add({ severity: 'success', summary: 'Success', detail: 'Row updated successfully', life: 3000 });
  } catch (error) {
    console.error('Error updating data in Supabase:', error.message);
    
    // Display error message
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update row', life: 3000 });
  }
};

const deleteRow = async (id) => {
  try {
    console.log(`Deleting row ${id}`);

    categories.value = categories.value.filter(category => category.id !== id);
    editingRows.value = editingRows.value.filter(rowId => rowId !== id);

    const { error } = await supabase
      .from('Categories')
      .delete()
      .eq('id', id);

    if (error) throw error;

    console.log('Deleted data in Supabase');

    await fetchDataFromSupabase();

    // Display success message
    toast.add({ severity: 'success', summary: 'Success', detail: 'Row deleted successfully', life: 3000 });
  } catch (error) {
    console.error('Error deleting data in Supabase:', error.message);

    // Display error message
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete row', life: 3000 });
  }
};

const fetchDataFromSupabase = async () => {
  try {
    const { data, error } = await supabase.from('Categories').select('*');
    if (error) throw error;

    console.log('Fetched data from Supabase:', data);
    categories.value = data;
    filteredCategories.value = categories.value;
  } catch (error) {
    console.error('Error fetching data from Supabase:', error.message);
  }
};

const cancelEdit = (id) => {
  console.log(`Canceling edit for row ${id}`);
  editingRows.value = editingRows.value.filter(rowId => rowId !== id);
};

const handleAddCategory = () => {
  // Navigate to the ApiNewCategory
  router.push({ name: 'api-new-category' });
};

onMounted(async () => {
  fetchDataFromSupabase();
});

watch(globalFilter, (newVal) => {
  const searchTerm = newVal.toLowerCase();

  filteredCategories.value = searchTerm
    ? categories.value.filter(category => displayFields.some(field => String(category[field]).toLowerCase().includes(searchTerm)))
    : categories.value;
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

.floating-icon-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000; 
}

</style>

