import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ShutdownTask } from '@shared/types/shutdown';

export const useShutdownStore = defineStore('shutdown', () => {
  const tasks = ref<ShutdownTask[]>([]);

  async function fetchTasks() {
    const response = await window.electronAPI.shutdown.getAll();
    if (response.success) {
      tasks.value = response.tasks;
    }
  }

  async function schedule(task: Partial<ShutdownTask>) {
    const response = await window.electronAPI.shutdown.create(task);
    if (response.success) {
      tasks.value.push(response.task);
    }
  }

  async function cancel(taskId: string) {
    await window.electronAPI.shutdown.cancel(taskId);
    tasks.value = tasks.value.map(task =>
      task.id === taskId ? { ...task, status: 'cancelled' } : task,
    );
  }

  return { tasks, fetchTasks, schedule, cancel };
});
