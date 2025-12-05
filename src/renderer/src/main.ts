import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);

// 确保路由准备就绪后再挂载
router.isReady().then(() => {
  app.mount('#app');
  console.log('App mounted, current route:', router.currentRoute.value.path);
}).catch((error) => {
  console.error('Router initialization error:', error);
  app.mount('#app');
});
