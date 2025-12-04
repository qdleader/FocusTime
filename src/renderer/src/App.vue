<template>
  <div class="app-shell">
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
</template>

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
