<template>
  <div class="new-category-view">
    <Card class="new-category-card">
      <template #title>
        <h2>New Category</h2>
      </template>
      <template #content>
        <div>
          <ApiNewCategoryForm />
        </div>
      </template>
    </Card>
    <!-- PrimeVue Toast Component -->
    <Toast ref="toast" />
  </div>
</template>
  
<script setup lang="ts">
import ApiNewCategoryForm from '../components/ApiNewCatogoryForm.vue';
</script>

<style>
.new-category-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 650px;
}

.new-category-card {
  width: 300px;
}

</style>