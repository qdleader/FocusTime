import { ipcMain } from 'electron';
import { TimerService } from '../services/TimerService';

const timerService = new TimerService();

export function registerTimerHandlers(): void {
  timerService.onUpdate(payload => {
    if (payload.session) {
      // bridge updates to renderer when needed
    }
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
