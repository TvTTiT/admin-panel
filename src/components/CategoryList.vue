<template>
  <div class="category-container">
    <button v-for="(category, index) in items" :key="index" class="category-item" @click="handleCategoryClick(category)">
      <div class="category-box">
        <img :src="category.iconUrl" :alt="category.name" class="category-icon" />
      </div>
      <div class="category-name">{{ category.name }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['items']);

const handleCategoryClick = (category) => {
  console.log('Category clicked:', category);
};
</script>

<style scoped>
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
  font-size: 14px; /* Adjust font size as needed */
}
</style>
