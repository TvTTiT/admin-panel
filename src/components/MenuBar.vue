<template>
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" :to="item.route" custom>
          <a v-ripple :href="item.route" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
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
      label: 'Categories',
      icon: 'pi pi-list',
      route: '/categories'
    },

  ];
  </script>
  