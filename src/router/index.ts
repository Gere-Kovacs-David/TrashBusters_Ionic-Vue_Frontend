import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import LandingPage from '../views/LandingPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/landing',
  },
  {
    path: '/recovery',
    name: 'PasswordRecoveryPage',
    component: () => import('@/views/PasswordRecoveryPage.vue'),
  },
  {
    path: '/landing',
    component: LandingPage,
    children: [
      {
      path: '/login',
      name: 'LoginPage',
      component: LoginComponent,
      },
      {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterComponent,
      },
      
    ]
  },
  {
    path: '/landing/login',
    component: LoginComponent,
  },
  {
    path: '/landing/register',
    component: RegisterComponent,
  },
  {
    path: '/recovery',
    component: () => import('@/views/PasswordRecoveryPage.vue'),
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

      {
        path: 'profile',
        component: () => import('@/views/ProfilePage.vue'),
      },

      {
        path: 'postmodal',
        component: () => import('@/components/PostModal.vue'),
      },
      

    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
