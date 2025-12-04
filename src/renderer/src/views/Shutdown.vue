<template>
  <section class="panel">
    <header>
      <div>
        <h2>定时关机</h2>
        <p>支持指定时间 / 倒计时两种模式，灵活设置提醒</p>
      </div>
      <button type="button" @click="refresh">刷新任务</button>
    </header>

    <TimeSelector @schedule="handleSchedule" />

    <h3>当前任务</h3>
    <TaskList :tasks="store.tasks" @cancel="store.cancel" />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useShutdownStore } from '@/stores/shutdown';
import TimeSelector from '@/components/TimeSelector.vue';
import TaskList from '@/components/TaskList.vue';

const store = useShutdownStore();

async function refresh() {
  await store.fetchTasks();
}

async function handleSchedule(payload: any) {
  await store.schedule(payload);
}

onMounted(refresh);
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  padding: 10px 18px;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
