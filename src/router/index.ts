import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './config';

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
