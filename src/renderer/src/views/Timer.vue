<template>
  <section class="timer-layout">
    <div class="timer-panel">
      <header>
        <h2>专注计时器</h2>
      </header>

      <!-- 时间设置（仅在未开始时显示） -->
      <div v-if="!store.isRunning && !store.currentConfig" class="time-settings">
        <div class="time-input-group">
          <label>专注时间（分钟）</label>
          <input
            v-model.number="focusMinutes"
            type="number"
            min="1"
            max="120"
            class="time-input"
            @change="validateTime"
          />
        </div>
        <div class="time-input-group">
          <label>休息时间（分钟）</label>
          <input
            v-model.number="breakMinutes"
            type="number"
            min="1"
            max="60"
            class="time-input"
            @change="validateTime"
          />
        </div>
      </div>

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
import { computed, ref } from 'vue';
import { useTimerStore } from '@/stores/timer';
import CircularTimer from '@/components/CircularTimer.vue';
import type { TimerConfig } from '@shared/types/timer';

const store = useTimerStore();

// 默认配置：30分钟专注 + 5分钟休息
const focusMinutes = ref(30);
const breakMinutes = ref(5);

function validateTime() {
  if (focusMinutes.value < 1) focusMinutes.value = 1;
  if (focusMinutes.value > 120) focusMinutes.value = 120;
  if (breakMinutes.value < 1) breakMinutes.value = 1;
  if (breakMinutes.value > 60) breakMinutes.value = 60;
}

function createConfig(): TimerConfig {
  return {
    id: `custom-${Date.now()}`,
    name: '自定义',
    mode: 'custom',
    focusTime: focusMinutes.value * 60,
    breakTime: breakMinutes.value * 60,
    isLoop: true,
    enableDisturbBlock: false,
    createdAt: new Date().toISOString(),
  };
}

async function handleStart() {
  const config = createConfig();
  await store.startTimer(config);
}

const displayTime = computed(() => {
  if (store.currentConfig && store.remaining > 0) {
    return store.formattedTime;
  }
  // 未开始时显示当前设置的时间
  const minutes = Math.floor(focusMinutes.value).toString().padStart(2, '0');
  const seconds = '00';
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

.time-settings {
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
}

.time-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.time-input-group label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.time-input {
  width: 80px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}

.time-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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
