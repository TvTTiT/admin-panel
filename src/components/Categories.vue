<template>
  <div class="centered-div">
    <h2>Categories</h2>
    <div>
      <!-- Dropdown for sorting by name -->
      <Dropdown v-model="sortKey" :options="['Ascending', 'Descending']" placeholder="Sort By Name" @change="onSortChange" />
    </div>
    <DataView :value="flattenedCategories" :sortOrder="sortOrder" :sortField="sortField" :paginator="true" :rows="5" @page="onPageChange">
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

const sortKey = ref(null);

const handleCategoryClick = (category) => {
  console.log('Category clicked:', category);
};

const sortField = ref('name');
const sortOrder = ref(1);

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
  flex: 1 1 15%; 
  max-width: 20%; /* Adjust the max-width as needed */
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
