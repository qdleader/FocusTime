import { createRouter, createWebHashHistory } from 'vue-router';
import ShutdownView from '@/views/Shutdown.vue';
import TimerView from '@/views/Timer.vue';
import StatisticsView from '@/views/Statistics.vue';
import SettingsView from '@/views/Settings.vue';
import FloatView from '@/views/Float.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/timer' },
    { path: '/shutdown', component: ShutdownView },
    { path: '/timer', component: TimerView },
    { path: '/statistics', component: StatisticsView },
    { path: '/settings', component: SettingsView },
    { path: '/float', component: FloatView },
  ],
});

export default router;
