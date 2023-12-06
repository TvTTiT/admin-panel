<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" :to="item.route" class="menu-link">
        <a v-bind="props.action">
          <div class="menu-item">
            <span :class="item.icon" class="menu-icon" />
            <span class="menu-label">{{ item.label }}</span>
          </div>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" class="menu-link" v-bind="props.action">
        <div class="menu-item">
          <span :class="item.icon" class="menu-icon" />
          <span class="menu-label">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="submenu-icon pi pi-fw pi-angle-down" />
        </div>
      </a>
    </template>
  </Menubar>
</template>

<style scoped>
.menu-link {
  text-decoration: none; /* Remove underlines */
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
