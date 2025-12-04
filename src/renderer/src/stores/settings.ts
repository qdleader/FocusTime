import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AppSettings } from '@shared/types/common';

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<AppSettings | null>(null);

  async function loadSettings() {
    const response = await window.electronAPI.settings.get();
    if (response.success) {
      settings.value = response.settings;
    }
  }

  async function updateSettings(payload: Partial<AppSettings>) {
    const response = await window.electronAPI.settings.update(payload);
    if (response.success) {
      settings.value = response.settings;
    }
  }

  return { settings, loadSettings, updateSettings };
});
