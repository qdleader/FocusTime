<template>
  <section class="settings">
    <h2>系统设置</h2>
    <div v-if="settings">
      <label>
        默认页面
        <select v-model="draft.defaultPage" @change="persist">
          <option value="shutdown">定时关机</option>
          <option value="timer">专注计时</option>
        </select>
      </label>
      <label>
        主题
        <select v-model="draft.theme" @change="persist">
          <option value="light">浅色</option>
          <option value="dark">深色</option>
          <option value="system">跟随系统</option>
        </select>
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { useSettingsStore } from '@/stores/settings';

const store = useSettingsStore();
const draft = reactive({
  defaultPage: 'timer',
  theme: 'system',
});

const settings = store.settings;

watch(
  () => store.settings,
  value => {
    if (value) {
      draft.defaultPage = value.defaultPage;
      draft.theme = value.theme;
    }
  },
  { immediate: true },
);

async function persist() {
  await store.updateSettings({ defaultPage: draft.defaultPage as any, theme: draft.theme as any });
}

onMounted(store.loadSettings);
</script>

<style scoped>
.settings {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cbd5f5;
}
</style>
