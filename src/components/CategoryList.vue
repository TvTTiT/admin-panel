<template>
  <div>
    <h2>Static Categories</h2>
    <div class="category-container">
      <div v-for="(category, index) in items" :key="index" class="category-item p-shadow-4" @click="handleCategoryClick(category)">
        <div class="category-box">
          <img :src="category.iconUrl" :alt="category.name" class="category-icon" />
        </div>
        <div class="category-name">{{ category.name }}</div>
      </div>

      <button class="add-category p-button p-button-outlined" @click="handleAddCategoryClick">
        <i class="pi pi-plus add-category-icon"></i>
        <div class="category-name add-category-name">New Category</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 

const props = defineProps(['items']);
const router = useRouter(); 

const handleCategoryClick = (category) => {
  console.log('Category clicked:', category);
};

const handleAddCategoryClick = () => {
  // Navigate to the NewCategoryView
  router.push({ name: 'new-category' });
};
</script>


<style scoped>
.category-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 80px;
  overflow-x: auto;
  padding: 10px;
}

.category-item, .add-category {
  margin-right: 10px;
  text-align: center;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  margin-bottom: 10px;
}

.category-item:hover, .add-category:hover {
  transform: scale(1.05);
}

.add-category-icon {
  font-size: 25px;
  color: #333;
  margin-top: 30px; 
}

.category-box, .add-category {
  border: 2px solid #eee;
  padding: 10px;
  border-radius: 8px;
  width: 150px; 
  height: 150px; 
}

.category-icon {
  width: 100%; 
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.category-name, .add-category-name {
  margin-top: 5px;
  font-size: 14px;
  color: #333;
}

.add-category {
  transition: transform 0.3s;
}
</style>