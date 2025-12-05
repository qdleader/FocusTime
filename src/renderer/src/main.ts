import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';

console.log('Main.ts: Starting application initialization...');

const app = createApp(App);
app.use(createPinia());
app.use(router);

// 确保路由准备就绪后再挂载
router.isReady().then(() => {
  console.log('Main.ts: Router is ready, mounting app...');
  const appElement = document.getElementById('app');
  if (!appElement) {
    console.error('Main.ts: #app element not found!');
    return;
  }
  app.mount('#app');
  console.log('Main.ts: App mounted successfully');
  console.log('Main.ts: Current route:', router.currentRoute.value.path);
  console.log('Main.ts: Current route full path:', router.currentRoute.value.fullPath);
}).catch((error) => {
  console.error('Main.ts: Router initialization error:', error);
  const appElement = document.getElementById('app');
  if (appElement) {
    app.mount('#app');
    console.log('Main.ts: App mounted despite router error');
  }
});
