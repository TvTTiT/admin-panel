import { createRouter, createWebHistory } from 'vue-router'
import Categories from '../views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'categories',
      component: Categories
    },
  ]
})

export default router
