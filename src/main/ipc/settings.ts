import { ipcMain } from 'electron';
import { StorageService } from '../services/StorageService';
import { setAutoStart, isAutoStartEnabled } from '../utils/autoStart';

const storage = new StorageService();

export function registerSettingsHandlers(): void {
  ipcMain.handle('settings:get', async () => ({
    success: true,
    settings: await storage.getSettings(),
  }));

  ipcMain.handle('settings:update', async (_, payload) => ({
    success: true,
    settings: await storage.updateSettings(payload),
  }));

  ipcMain.handle('settings:autoStart', async (_, enable: boolean) => {
    setAutoStart(enable);
    return { success: true, enabled: isAutoStartEnabled() };
  });
}
