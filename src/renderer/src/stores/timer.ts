import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { TimerConfig, TimerSession } from '@shared/types/timer';

export const useTimerStore = defineStore('timer', () => {
  const currentConfig = ref<TimerConfig | null>(null);
  const isRunning = ref(false);
  const remaining = ref(0);
  const currentSession = ref<TimerSession | null>(null);

  const formattedTime = computed(() => {
    const minutes = Math.floor(remaining.value / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(remaining.value % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  async function startTimer(config: TimerConfig) {
    await window.electronAPI.timer.start(config);
    currentConfig.value = config;
    isRunning.value = true;
    remaining.value = config.focusTime;
  }

  async function pauseTimer() {
    await window.electronAPI.timer.pause();
    isRunning.value = false;
  }

  async function resumeTimer() {
    await window.electronAPI.timer.resume();
    isRunning.value = true;
  }

  async function resetTimer() {
    await window.electronAPI.timer.reset();
    isRunning.value = false;
    remaining.value = 0;
    currentConfig.value = null;
    currentSession.value = null;
  }

  window.electronAPI.on('timer:update', (payload: { remaining: number; session: TimerSession | null }) => {
    remaining.value = payload.remaining;
    currentSession.value = payload.session;
    // 根据是否有 session 和 remaining 来判断是否在运行
    if (payload.session && payload.remaining > 0) {
      isRunning.value = true;
    } else if (payload.remaining === 0 && !payload.session) {
      // 重置状态
      isRunning.value = false;
      currentConfig.value = null;
    }
  });

  return {
    currentConfig,
    isRunning,
    remaining,
    currentSession,
    formattedTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  };
});
