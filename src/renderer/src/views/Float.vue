<template>
  <div class="float">
    <strong>{{ label }}</strong>
    <span>{{ remaining }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const label = ref('专注剩余');
const remaining = ref('00:00');

window.electronAPI.on('float:update', (payload: { remaining: number; type: string }) => {
  label.value = payload.type === 'shutdown' ? '关机剩余' : '专注剩余';
  const minutes = Math.floor(payload.remaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(payload.remaining % 60)
    .toString()
    .padStart(2, '0');
  remaining.value = `${minutes}:${seconds}`;
});
</script>

<style scoped>
.float {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(37, 99, 235, 0.85);
  border-radius: 16px;
  font-size: 24px;
}

strong {
  font-size: 16px;
  margin-bottom: 8px;
}
</style>
