<template>
  <section class="timer-layout">
    <div class="timer-panel">
      <header>
        <h2>专注计时器</h2>
      </header>

      <CircularTimer :progress="progress">
        <div class="timer-value">{{ displayTime }}</div>
        <p>{{ statusText }}</p>
      </CircularTimer>

      <div class="actions">
        <button v-if="!store.isRunning && !store.currentConfig" type="button" @click="handleStart" class="btn-primary">
          开始
        </button>
        <template v-else>
          <button v-if="store.isRunning" type="button" @click="store.pauseTimer">暂停</button>
          <button v-else type="button" @click="store.resumeTimer">继续</button>
          <button type="button" @click="store.resetTimer">重置</button>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTimerStore } from '@/stores/timer';
import CircularTimer from '@/components/CircularTimer.vue';
import type { TimerConfig } from '@shared/types/timer';

const store = useTimerStore();

// 默认配置：25分钟专注 + 5分钟休息
const defaultConfig: TimerConfig = {
  id: 'default-pomodoro',
  name: '番茄钟',
  mode: 'pomodoro',
  focusTime: 25 * 60, // 25分钟
  breakTime: 5 * 60,  // 5分钟
  isLoop: true,
  enableDisturbBlock: false,
  createdAt: new Date().toISOString(),
};

async function handleStart() {
  await store.startTimer(defaultConfig);
}

const displayTime = computed(() => {
  if (store.currentConfig && store.remaining > 0) {
    return store.formattedTime;
  }
  // 未开始时显示默认时间
  const minutes = Math.floor(defaultConfig.focusTime / 60).toString().padStart(2, '0');
  const seconds = (defaultConfig.focusTime % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
});

const statusText = computed(() => {
  if (store.currentSession?.type === 'break') return '休息中';
  if (store.isRunning) return '专注中';
  if (store.currentConfig) return '已暂停';
  return '未开始';
});

const progress = computed(() => {
  const activeConfig = store.currentConfig;
  const remainingSeconds = store.remaining;
  if (!activeConfig || remainingSeconds === 0) return 0;
  const total = store.currentSession?.type === 'break'
    ? activeConfig.breakTime
    : activeConfig.focusTime;
  if (!total) return 0;
  return ((total - remainingSeconds) / total) * 100;
});
</script>

<style scoped>
.timer-layout {
  display: flex;
  justify-content: center;
}

.timer-panel {
  width: 420px;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.timer-value {
  font-size: 48px;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 12px;
}

button {
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: #f1f5f9;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #e2e8f0;
}

button.btn-primary {
  background: #2563eb;
  color: white;
}

button.btn-primary:hover {
  background: #1d4ed8;
}
</style>
