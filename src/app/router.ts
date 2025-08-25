import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/shared/store/app';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: () => import('@/pages/auth/AuthPage.vue') },
  { path: '/plans', component: () => import('@/pages/plans/PlansPage.vue') },
  { path: '/settings', component: () => import('@/pages/settings/SettingsWizard.vue') },
  { path: '/settings/triggers', component: () => import('@/pages/settings/TriggersStep.vue') },
  { path: '/payments', component: () => import('@/pages/payments/PaymentsPage.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const store = useAppStore();
  const publicPaths = ['/auth'];
  if (!store.token && !publicPaths.includes(to.path)) {
    return '/auth';
  }
  if (store.token && to.path === '/auth') {
    return '/plans';
  }
});

export default router;
