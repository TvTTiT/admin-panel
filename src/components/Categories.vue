<template>
  <div class="centered-div">
    <h2>Categories</h2>
    <div>
      <button @click="updateSort('name')">Sort by Name</button>
      <button @click="updateSort('createdAt')">Sort by Created At</button>
      <!-- Add more buttons or controls for sorting as needed -->
    </div>
    <DataView :value="flattenedCategories" :dataKey="'id'" :sortField="sortField" :sortOrder="sortOrder" @onSort="onSort">
      <template #list="{ items }">
        <div class="category-container">
          <button v-for="(category, index) in items" :key="index" class="category-item" @click="handleCategoryClick(category)">
            <div class="category-box">
              <img :src="category.iconUrl" :alt="category.name" class="category-icon" />
            </div>
            <div class="category-name">{{ category.name }}</div>
          </button>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import { categories } from '../components/categories';
import { ref } from 'vue';

const flattenedCategories = ref(categories.flat());

const handleCategoryClick = (category) => {
  // Handle category click logic here
  console.log('Category clicked:', category);
};

// Sorting
const sortField = ref(''); // Default sorting is an empty string
const sortOrder = ref(1); // 1 for ascending, -1 for descending

const onSort = (event) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;
};

const updateSort = (field) => {
  sortField.value = field;
};
</script>

<style scoped>
.centered-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px; /* Adjust the max-width as needed */
}

.category-item {
  margin: 10px;
  text-align: center;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  flex: 1 1 20%; /* Display 4 items per row*/
  max-width: 15%; /* Adjust the max-width as needed */
}

.category-box {
  border: 2px solid #ccc; /* Border color for the box */
  padding: 10px; /* Adjust padding as needed */
  border-radius: 8px; /* Adjust border-radius as needed */
}

.category-icon {
  width: 80px; /* Adjust the size as needed */
  height: 80px; /* Adjust the size as needed */
  object-fit: contain;
}

.category-name {
  margin-top: 5px; /* Adjust the spacing between icon and name */
}
</style>