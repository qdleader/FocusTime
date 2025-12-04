import Store from 'electron-store';
import type { ShutdownTask } from '@shared/types/shutdown';
import type { AppSettings } from '@shared/types/common';
import type { TimerConfig, TimerSession } from '@shared/types/timer';

export interface StoreSchema {
  shutdownTasks: ShutdownTask[];
  timerConfigs: TimerConfig[];
  timerSessions: TimerSession[];
  settings: AppSettings;
}

const defaultSettings: AppSettings = {
  autoStart: false,
  theme: 'system',
  defaultPage: 'timer',
  language: 'zh-CN',
  notification: {
    sound: true,
    soundId: 'default',
    popup: true,
    flash: false,
  },
  floatWindow: {
    enabled: true,
    opacity: 0.8,
    size: 'medium',
  },
  dataManagement: {
    autoCleanDays: 30,
  },
};

const defaultConfigs: TimerConfig[] = [
  {
    id: 'preset-pomodoro',
    name: '番茄钟',
    mode: 'pomodoro',
    focusTime: 25 * 60,
    breakTime: 5 * 60,
    isLoop: true,
    enableDisturbBlock: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'preset-deep',
    name: '深度专注',
    mode: 'deep',
    focusTime: 45 * 60,
    breakTime: 10 * 60,
    isLoop: true,
    enableDisturbBlock: false,
    createdAt: new Date().toISOString(),
  },
];

const store = new Store<StoreSchema>({
  name: 'focustime-data',
  defaults: {
    shutdownTasks: [],
    timerConfigs: defaultConfigs,
    timerSessions: [],
    settings: defaultSettings,
  },
});

export class StorageService {
  getShutdownTasks(): ShutdownTask[] {
    return store.get('shutdownTasks', []);
  }

  saveShutdownTasks(tasks: ShutdownTask[]): void {
    store.set('shutdownTasks', tasks);
  }

  getTimerConfigs(): TimerConfig[] {
    return store.get('timerConfigs', defaultConfigs);
  }

  saveTimerConfigs(configs: TimerConfig[]): void {
    store.set('timerConfigs', configs);
  }

  appendTimerSession(session: TimerSession): void {
    const sessions = store.get('timerSessions', []);
    sessions.push(session);
    store.set('timerSessions', sessions);
  }

  getSessions(): TimerSession[] {
    return store.get('timerSessions', []);
  }

  saveSessions(sessions: TimerSession[]): void {
    store.set('timerSessions', sessions);
  }

  getSettings(): AppSettings {
    return store.get('settings', defaultSettings);
  }

  updateSettings(partial: Partial<AppSettings>): AppSettings {
    const current = this.getSettings();
    const merged = { ...current, ...partial } as AppSettings;
    store.set('settings', merged);
    return merged;
  }
}
