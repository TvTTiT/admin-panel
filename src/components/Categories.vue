<template>
  <div class="centered-div">
    <h2>Categories</h2>
    <div>
      <!-- Dropdown for sorting by name -->
      <Dropdown v-model="sortKey" :options="sortOptions" placeholder="Sort By Name" @change="onSortChange" />
    </div>
    <DataView :value="flattenedCategories" :sortOrder="sortOrder" :sortField="sortField" @onSort="onSort">
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
import { ref, watch } from 'vue';

const flattenedCategories = ref(categories.flat());

const sortKey = ref(null); // Add this line to define sortKey

const handleCategoryClick = (category) => {
  console.log('Category clicked:', category);
};

const sortField = ref('name'); // Default sorting is by name
const sortOrder = ref(1); // 1 for ascending, -1 for descending

const sortOptions = ['Ascending', 'Descending'];

const onSort = () => {
  // Trigger sorting logic based on sortField and sortOrder
  // You can implement your sorting logic here
  // For simplicity, let's assume the categories array is already sorted
  flattenedCategories.value.sort((a, b) => {
    const fieldA = a[sortField.value].toUpperCase();
    const fieldB = b[sortField.value].toUpperCase();

    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }

    return sortOrder.value * comparison;
  });
};

const onSortChange = () => {
  // Update sortField and sortOrder based on the selected option
  if (sortKey.value === 'Ascending') {
    sortField.value = 'name';
    sortOrder.value = 1;
  } else if (sortKey.value === 'Descending') {
    sortField.value = 'name';
    sortOrder.value = -1;
  }
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
