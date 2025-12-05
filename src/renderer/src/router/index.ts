import { createRouter, createWebHashHistory } from 'vue-router';
import ShutdownView from '@/views/Shutdown.vue';
import TimerView from '@/views/Timer.vue';
import StatisticsView from '@/views/Statistics.vue';
import SettingsView from '@/views/Settings.vue';
import FloatView from '@/views/Float.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { 
      path: '/', 
      redirect: '/timer' 
    },
    { path: '/shutdown', component: ShutdownView },
    { path: '/timer', component: TimerView },
    { path: '/statistics', component: StatisticsView },
    { path: '/settings', component: SettingsView },
    { path: '/float', component: FloatView },
  ],
});

// 添加路由守卫用于调试
router.beforeEach((to, from, next) => {
  console.log('Router: Navigation from', from.path, 'to', to.path);
  console.log('Router: To route name:', to.name, 'To route component:', to.matched[0]?.components);
  next();
});

router.afterEach((to, from) => {
  console.log('Router: Navigation completed to', to.path);
  console.log('Router: Matched routes:', to.matched.map(r => r.path));
});

export default router;
