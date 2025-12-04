<template>
  <div class="timer">
    <svg viewBox="0 0 120 120">
      <circle class="track" cx="60" cy="60" r="54" />
      <circle
        class="progress"
        cx="60"
        cy="60"
        r="54"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ progress: number }>();
const circumference = 2 * Math.PI * 54;
const dashOffset = computed(() => circumference - (props.progress / 100) * circumference);
</script>

<style scoped>
.timer {
  position: relative;
  width: 240px;
  height: 240px;
}

svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.track {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 6;
}

.progress {
  fill: none;
  stroke: #2563eb;
  stroke-width: 6;
  transition: stroke-dashoffset 0.6s ease;
}

.content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
