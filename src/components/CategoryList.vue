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
  max-width: 1000px; 
}

.category-item {
  margin: 10px;
  text-align: center;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  flex: 1 1 15%;
  max-width: 20%; 
}

.category-box {
  border: 2px solid #ccc; 
  padding: 10px; 
  border-radius: 8px; 
}

.category-icon {
  width: 80px; 
  height: 80px; 
  object-fit: contain;
}

.category-name {
  margin-top: 5px; 
  font-size: 14px; 
}
</style>
