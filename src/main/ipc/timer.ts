import { ipcMain } from 'electron';
import { TimerService } from '../services/TimerService';
import { getMainWindow } from '../index';
import { FloatWindow } from '../windows/FloatWindow';

const timerService = new TimerService();
const floatWindow = new FloatWindow();

function sendUpdateToRenderer(payload: { remaining: number; session: any }): void {
  const mainWindow = getMainWindow();
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('timer:update', payload);
  }
  // 同时更新浮动窗口
  floatWindow.update({
    remaining: payload.remaining,
    session: payload.session,
  });
}

export function registerTimerHandlers(): void {
  timerService.onUpdate(payload => {
    sendUpdateToRenderer(payload);
  });

  ipcMain.handle('timer:start', async (_, config) => {
    timerService.start(config);
    // 显示浮动窗口
    await floatWindow.create();
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
    // 隐藏浮动窗口
    floatWindow.destroy();
    return { success: true };
  });
}
