import { ipcMain } from 'electron';
import { TimerService } from '../services/TimerService';
import { getMainWindow } from '../index';

const timerService = new TimerService();

function sendUpdateToRenderer(payload: { remaining: number; session: any }): void {
  const mainWindow = getMainWindow();
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('timer:update', payload);
  }
}

export function registerTimerHandlers(): void {
  timerService.onUpdate(payload => {
    sendUpdateToRenderer(payload);
  });

  ipcMain.handle('timer:start', async (_, config) => {
    timerService.start(config);
    return { success: true };
  });

  ipcMain.handle('timer:pause', async () => {
    timerService.pause();
    return { success: true };
  });

  ipcMain.handle('timer:resume', async () => {
    timerService.resume();
    return { success: true };
  });

  ipcMain.handle('timer:reset', async () => {
    timerService.reset();
    return { success: true };
  });
}
