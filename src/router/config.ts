import { RouteRecordRaw } from 'vue-router';

const HomePage = () => import('@/pages/HomePage.vue');
const FavoritesPage = () => import('@/pages/FavoritesPage.vue');

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/favorites',
    component: FavoritesPage,
  },
];
