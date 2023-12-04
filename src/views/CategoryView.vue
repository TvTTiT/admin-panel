<template>
  <div class="centered-div">
    <h2>Categories</h2>
    <div class="toggle-container">
      <!-- Display Button -->
      <Button @click="toggleView" :label="displayList ? 'Switch to Table View' : 'Switch to List View'" :icon="displayList ? 'pi pi-table' : 'pi pi-list'" class="p-button-primary" />

      <!-- Dropdown for sorting by name (visible only in list view) -->
      <Dropdown v-if="displayList" v-model="sortKey" :options="['Ascending', 'Descending']" placeholder="Sort By Name" @change="onSortChange" />
    </div>
    <template v-if="displayList">
      <DataView :value="flattenedCategories" :sortOrder="sortOrder" :sortField="sortField" :paginator="true" :rows="5" @page="onPageChange">
        <template #list="{ items }">
          <CategoryList :items="items" />
        </template>
      </DataView>
    </template>
    <template v-else>
      <CategoryTable :categories="flattenedCategories" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { categories } from '../data/categories';
import { ref } from 'vue';
import CategoryList from '../components/CategoryList.vue';
import CategoryTable from '../components/CategoryTable.vue'; 

const flattenedCategories = ref(categories.flat());

const sortKey = ref(null);

const sortField = ref('name');
const sortOrder = ref(1);

const displayList = ref(true); // Add a state variable to determine the display mode

const onSortChange = () => {
  if (sortKey.value === 'Ascending') {
    sortField.value = 'name';
    sortOrder.value = 1;
  } else if (sortKey.value === 'Descending') {
    sortField.value = 'name';
    sortOrder.value = -1;
  }
};

// Pagination logic
const onPageChange = (event) => {
  console.log('Page changed:', event.page + 1);
};

const toggleView = () => {
  displayList.value = !displayList.value;
};
</script>

<style scoped>
.centered-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px; 
}

.toggle-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.toggle-container Button {
  margin-right: 10px;
  padding: 5px 10px; 
  font-size: 14px; 
  width: 150px; 
}

/* Ensure the dropdown doesn't affect layout when hidden */
.toggle-container Dropdown {
  display: none;
}

/* Display the dropdown only in list view */
.displayList Dropdown {
  display: block;
  width: 150px; 
}

/* Additional styles for DataView and other components */
.DataView {
  margin-top: 10px;
}

.CategoryTable {
  width: 100%; 
}

.CategoryList {
  list-style: none;
  padding: 0;
}

.CategoryList .category-item {
  margin-bottom: 10px; 
}

.CategoryTable table {
  width: 100%; 
}

.CategoryTable th,
.CategoryTable td {
  padding: 10px; 
}
</style>
