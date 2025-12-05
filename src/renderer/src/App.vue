<template>
  <!-- 浮动窗口路由不显示主布局 -->
  <RouterView v-if="routerReady && isFloatRoute" />
  <div v-else-if="routerReady" class="app-shell">
    <header class="app-header">
      <div class="branding">
        <h1>FocusTime</h1>
        <p>定时关机 & 专注时间管理</p>
      </div>
      <nav class="app-nav">
        <RouterLink to="/shutdown">定时关机</RouterLink>
        <RouterLink to="/timer">专注计时</RouterLink>
        <RouterLink to="/statistics">数据统计</RouterLink>
        <RouterLink to="/settings">系统设置</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
    <footer class="app-footer">FocusTime © 2025</footer>
  </div>
  <div v-else style="padding: 20px; text-align: center;">
    <p>加载中...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const routerReady = ref(false);

const isFloatRoute = computed(() => {
  return router.currentRoute.value.path === '/float';
});

onMounted(async () => {
  try {
    await router.isReady();
    routerReady.value = true;
    console.log('App mounted, current route:', router.currentRoute.value.path);
  } catch (error) {
    console.error('Router initialization error:', error);
    routerReady.value = true; // 即使出错也显示内容
  }
});

// 监听路由变化
watch(() => router.currentRoute.value.path, (path) => {
  console.log('Route changed to:', path);
});
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.branding h1 {
  margin: 0;
  font-size: 20px;
}

.branding p {
  margin: 0;
  color: #64748b;
  font-size: 12px;
}

.app-nav {
  display: flex;
  gap: 16px;
}

.app-nav a.active {
  color: #2563eb;
  font-weight: 600;
}

.app-main {
  flex: 1;
  padding: 24px 32px;
}

.app-footer {
  text-align: center;
  padding: 12px;
  font-size: 12px;
  color: #94a3b8;
}
</style>
