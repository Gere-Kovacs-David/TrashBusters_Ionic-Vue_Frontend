import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/feed',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/feed',
      },
      {
        path: 'info',
        component: () => import('@/views/InfoPage.vue'),
      },
      {
        path: 'events',
        component: () => import('@/views/EventsPage.vue'),
      },
      {
        path: 'feed',
        component: () => import('@/views/FeedPage.vue'),
      },
      {
        path: 'map',
        component: () => import('@/views/MapPage.vue'),
      },
      {
        path: 'calendar',
        component: () => import('@/views/CalendarPage.vue'),
      },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
