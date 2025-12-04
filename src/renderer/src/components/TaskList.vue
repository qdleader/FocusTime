<template>
  <div class="task-list">
    <article v-for="task in tasks" :key="task.id" class="task-card">
      <header>
        <strong>{{ task.type === 'specific' ? '指定时间' : '倒计时' }}</strong>
        <span class="status" :data-status="task.status">{{ task.status }}</span>
      </header>
      <p v-if="task.time">执行时间：{{ formatDate(task.time) }}</p>
      <p v-else>剩余时长：{{ task.countdown ? Math.round(task.countdown / 60) : 0 }} 分钟</p>
      <button type="button" @click="$emit('cancel', task.id)" :disabled="task.status !== 'active'">
        取消任务
      </button>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { ShutdownTask } from '@shared/types/shutdown';

const props = defineProps<{ tasks: ShutdownTask[] }>();

defineEmits<{ (e: 'cancel', id: string): void }>();

function formatDate(value?: string) {
  if (!value) return '-';
  return new Date(value).toLocaleString();
}
</script>

<style scoped>
.task-list {
  display: grid;
  gap: 16px;
}

.task-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e2e8f0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status[data-status='active'] {
  color: #16a34a;
}

.status[data-status='cancelled'] {
  color: #ef4444;
}

button {
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: #f1f5f9;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
