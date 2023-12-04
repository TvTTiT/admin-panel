<!-- Home.vue -->

<template>
  <div class="home-container">
    <Card>
      <template #title>
        <h2>Welcome to Admin Panel</h2>
      </template>
      <template #content>
        <Button class="p-button p-button-primary" @click="goToCategories">Go to Categories</Button>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToCategories = () => {
  router.push({ name: 'categories' });
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
    height: 300px; 
  margin: 0;
}

.p-card h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.p-button {
  font-size: 14px;
  padding: 8px 16px;
  margin-top: 10px;
}
</style>