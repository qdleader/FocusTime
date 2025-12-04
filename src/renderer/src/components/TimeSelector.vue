<template>
  <div class="time-selector">
    <label>
      日期
      <input type="datetime-local" v-model="state.date" />
    </label>
    <label>
      倒计时 (分钟)
      <input type="number" min="1" max="1440" v-model.number="state.countdown" />
    </label>
    <label>
      提前提醒 (分钟)
      <select v-model.number="state.notifyBefore">
        <option v-for="option in notifyOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>
    <slot name="actions">
      <button type="button" @click="emitSchedule">设置关机</button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const emit = defineEmits<{ (e: 'schedule', payload: any): void }>();

const state = reactive({
  date: '',
  countdown: 60,
  notifyBefore: 5,
});

const notifyOptions = [1, 3, 5, 10];

function emitSchedule() {
  emit('schedule', {
    type: state.date ? 'specific' : 'countdown',
    time: state.date ? new Date(state.date).toISOString() : undefined,
    countdown: state.date ? undefined : state.countdown * 60,
    notifyBefore: state.notifyBefore,
  });
}
</script>

<style scoped>
.time-selector {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #475569;
}

input,
select,
button {
  margin-top: 6px;
  padding: 10px;
  border: 1px solid #cbd5f5;
  border-radius: 8px;
  font-size: 14px;
}

button {
  background: #2563eb;
  color: #fff;
  cursor: pointer;
  border: none;
}
</style>
