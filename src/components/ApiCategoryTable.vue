<template>
  <div class="datatable-container">
    <h2>Supabase Api Categories</h2>

    <!-- Global search input -->
    <div class="p-input-icon-left global-search">
      <i class="pi pi-search"></i>
      <InputText v-model="globalFilter" placeholder="Global Search" />
    </div>

    <!-- Floating icon button to add a new category -->
    <Button class="floating-icon-button p-button-rounded" @click="handleAddCategory">
      <i class="pi pi-plus"></i>
    </Button>

    <!-- DataTable component to display categories -->
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
      <!-- Header template -->
      <template #header>
          <span>Categories</span>
      </template>

      <!-- Column definitions -->
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

      <!-- Column for row editing actions -->
      <Column :rowEditor="true" style="width: 150px" bodyStyle="text-align:center">
        <template #body="rowData">
          <button v-if="!editingRows.includes(rowData.data.id)" class="p-button p-button-text" @click="editRow(rowData.data.id)">
            <i class="pi pi-pencil"></i>
          </button>
          <template v-else>
            <button class="p-button p-button-text" @click="saveRow(rowData.data.id)">
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

      <!-- Footer template showing the total number of categories -->
      <template #footer>
        In total there are {{ filteredCategories ? filteredCategories.length : 0 }} categories.
      </template>
    </DataTable>
    <!-- Toast component for displaying notifications -->
    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import supabase from '../lib/supabase';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';

// Vue Router instance
const router = useRouter();
// PrimeVue Toast instance
const toast = useToast();
// Ref for tracking editing rows
const editingRows = ref([]);
// Ref for global search filter
const globalFilter = ref('');
// Ref for storing categories data
const categories = ref([]);
// Ref for storing filtered categories
const filteredCategories = ref([]);
// Array of fields to display in the DataTable
const displayFields = ["id", "name", "slug", "iconUrl", "activeFrom", "activeUntil", "createdAt", "updatedAt"];

// Function to format header labels
const formatHeader = (field) => field.charAt(0).toUpperCase() + field.slice(1);

// Function to initiate editing of a row
const editRow = (id) => {
  console.log(`Editing row ${id}`);
  editingRows.value.push(id);
};

// Function to save changes made to a row
const saveRow = async (id) => {
  try {
    console.log(`Saving changes for row ${id}`);
    editingRows.value = editingRows.value.filter(rowId => rowId !== id);

    // Find the edited category in the categories array
    const editedCategory = categories.value.find(category => category.id === id);

    // Update the category data in Supabase
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

    // Refresh data from Supabase
    await fetchDataFromSupabase();

    // Display success message
    toast.add({ severity: 'success', summary: 'Success', detail: 'Row updated successfully', life: 3000 });
  } catch (error) {
    console.error('Error updating data in Supabase:', error.message);

    // Display error message
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update row', life: 3000 });
  }
};

// Function to delete a row
const deleteRow = async (id) => {
  try {
    console.log(`Deleting row ${id}`);

    // Remove the deleted category from the categories array
    categories.value = categories.value.filter(category => category.id !== id);
    editingRows.value = editingRows.value.filter(rowId => rowId !== id);

    // Delete the category data from Supabase
    const { error } = await supabase
      .from('Categories')
      .delete()
      .eq('id', id);

    if (error) throw error;

    console.log('Deleted data in Supabase');

    // Refresh data from Supabase
    await fetchDataFromSupabase();

    // Display success message
    toast.add({ severity: 'success', summary: 'Success', detail: 'Row deleted successfully', life: 3000 });
  } catch (error) {
    console.error('Error deleting data in Supabase:', error.message);

    // Display error message
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete row', life: 3000 });
  }
};

// Function to fetch data from Supabase
const fetchDataFromSupabase = async () => {
  try {
    // Fetch all data from the 'Categories' table in Supabase
    const { data, error } = await supabase.from('Categories').select('*');
    if (error) throw error;

    console.log('Fetched data from Supabase:', data);

    // Update the categories and filteredCategories refs
    categories.value = data;
    filteredCategories.value = categories.value;
  } catch (error) {
    console.error('Error fetching data from Supabase:', error.message);
  }
};

// Function to cancel the edit mode for a row
const cancelEdit = (id) => {
  console.log(`Canceling edit for row ${id}`);
  editingRows.value = editingRows.value.filter(rowId => rowId !== id);
};

// Function to handle adding a new category
const handleAddCategory = () => {
  // Navigate to the 'api-new-category' route
  router.push({ name: 'api-new-category' });
};

// Fetch data from Supabase when the component is mounted
onMounted(async () => {
  fetchDataFromSupabase();
});

// Watch for changes in the global search filter
watch(globalFilter, (newVal) => {
  const searchTerm = newVal.toLowerCase();

  // Filter categories based on the search term
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

