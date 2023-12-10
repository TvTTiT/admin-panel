<template>
  <Menubar :model="items">
    <template #item="{ item, props }">
      <router-link :to="item.route" class="menu-link">
        <div v-bind="props.action" class="menu-item">
          <span :class="item.icon" class="menu-icon" />
          <span class="menu-label">{{ item.label }}</span>
        </div>
      </router-link>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
const items = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label: 'Static Categories',
    icon: 'pi pi-list',
    route: '/categories'
  },
  {
    label: 'API Categories',
    icon: 'pi pi-cloud-download',
    route: '/api-category'
  },
];
</script>

<style scoped>
.menu-link {
  text-decoration: none;
}

.menu-item {
  display: flex;
  align-items: center;
}

.menu-icon {
  margin-right: 8px; 
}

.menu-label {
  margin-right: 16px; 
}
</style>

