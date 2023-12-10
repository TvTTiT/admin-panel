<!-- App.vue -->
<template>
  <div id="app">
    <MenubarComponent />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import MenubarComponent from './components/MenuBar.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
