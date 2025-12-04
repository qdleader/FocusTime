<template>
  <section class="timer-layout">
    <div class="timer-panel">
      <header>
        <h2>专注计时器</h2>
        <select v-model="selectedId" @change="startSelected">
          <option v-for="config in store.configs" :key="config.id" :value="config.id">
            {{ config.name }} ({{ Math.round(config.focusTime / 60) }} / {{ Math.round(config.breakTime / 60) }})
          </option>
        </select>
      </header>

      <CircularTimer :progress="progress">
        <div class="timer-value">{{ store.formattedTime }}</div>
        <p>{{ store.currentSession?.type === 'break' ? '休息中' : '专注中' }}</p>
      </CircularTimer>

      <div class="actions">
        <button type="button" @click="handleStart" :disabled="!selectedConfig">开始</button>
        <button type="button" @click="store.pauseTimer">暂停</button>
        <button type="button" @click="store.resumeTimer">继续</button>
        <button type="button" @click="store.resetTimer">重置</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useTimerStore } from '@/stores/timer';
import CircularTimer from '@/components/CircularTimer.vue';

const store = useTimerStore();
const selectedId = ref('');

const selectedConfig = computed(() => store.configs.find(config => config.id === selectedId.value));

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

async function startSelected() {
  if (selectedConfig.value) {
    await store.startTimer(selectedConfig.value);
  }
}

async function handleStart() {
  await startSelected();
}

onMounted(async () => {
  await store.loadConfigs();
  selectedId.value = store.configs[0]?.id ?? '';
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
}
</style>
