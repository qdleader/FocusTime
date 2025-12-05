import type { default as Store } from 'electron-store';
import type { ShutdownTask } from '@shared/types/shutdown';
import type { AppSettings } from '@shared/types/common';
import type { TimerSession } from '@shared/types/timer';

export interface StoreSchema {
  shutdownTasks: ShutdownTask[];
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

let store: Store<StoreSchema> | null = null;

async function getStore(): Promise<Store<StoreSchema>> {
  if (!store) {
    const StoreModule = await import('electron-store');
    const StoreClass = StoreModule.default;
    store = new StoreClass<StoreSchema>({
      name: 'focustime-data',
      defaults: {
        shutdownTasks: [],
        timerSessions: [],
        settings: defaultSettings,
      },
    });
  }
  return store;
}

export class StorageService {
  async getShutdownTasks(): Promise<ShutdownTask[]> {
    const s = await getStore();
    return s.get('shutdownTasks', []);
  }

  async saveShutdownTasks(tasks: ShutdownTask[]): Promise<void> {
    const s = await getStore();
    s.set('shutdownTasks', tasks);
  }

  async appendTimerSession(session: TimerSession): Promise<void> {
    const s = await getStore();
    const sessions = s.get('timerSessions', []);
    sessions.push(session);
    s.set('timerSessions', sessions);
  }

  async getSessions(): Promise<TimerSession[]> {
    const s = await getStore();
    return s.get('timerSessions', []);
  }

  async saveSessions(sessions: TimerSession[]): Promise<void> {
    const s = await getStore();
    s.set('timerSessions', sessions);
  }

  async getSettings(): Promise<AppSettings> {
    const s = await getStore();
    return s.get('settings', defaultSettings);
  }

  async updateSettings(partial: Partial<AppSettings>): Promise<AppSettings> {
    const current = await this.getSettings();
    const merged = { ...current, ...partial } as AppSettings;
    const s = await getStore();
    s.set('settings', merged);
    return merged;
  }
}
