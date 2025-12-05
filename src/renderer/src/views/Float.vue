<template>
  <div class="float-container">
    <div class="float-circle">
      <div class="timer-content">
        <div class="timer-label">{{ label }}</div>
        <div class="timer-time">{{ remaining }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const label = ref('专注');
const remaining = ref('00:00');

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${secs}`;
}

window.electronAPI.on('float:update', (payload: { remaining: number; session: any }) => {
  if (payload.session) {
    label.value = payload.session.type === 'break' ? '休息' : '专注';
    remaining.value = formatTime(payload.remaining);
  } else {
    remaining.value = formatTime(payload.remaining);
  }
});

onMounted(() => {
  // 初始显示
  remaining.value = '00:00';
  console.log('Float window mounted');
});
</script>

<style>
/* 全局样式，确保背景透明 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  background: transparent;
}
</style>

<style scoped>
.float-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  margin: 0;
  padding: 0;
}

.float-circle {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.timer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
}

.timer-label {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
  margin-bottom: 4px;
  letter-spacing: 1px;
}

.timer-time {
  font-size: 28px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 2px;
}
</style>
