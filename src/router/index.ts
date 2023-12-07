// router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Categories from '../views/CategoryView.vue';
import ApiCategories from '../views/ApiCategoryView.vue';
import NewCategoryView from '../views/NewCategoryView.vue'; 
import ApiNewCategoryView from '../views/ApiNewCategoryView.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
    },
    {
      path: '/new-category',
      name: 'new-category',
      component: NewCategoryView, 
    },
    {
      path: '/api-category',
      name: 'api-category',
      component: ApiCategories, 
    },
    {
      path: '/api-new-category',
      name: 'api-new-category',
      component: ApiNewCategoryView, 
    },
  ],
});

export default router;
