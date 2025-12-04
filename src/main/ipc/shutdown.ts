import { ipcMain } from 'electron';
import { ShutdownService } from '../services/ShutdownService';

const shutdownService = new ShutdownService();

export function registerShutdownHandlers(): void {
  ipcMain.handle('shutdown:create', async (_, payload) => {
    const task = shutdownService.create(payload);
    return { success: true, task };
  });

  ipcMain.handle('shutdown:cancel', async (_, taskId: string) => {
    shutdownService.cancel(taskId);
    return { success: true };
  });

  ipcMain.handle('shutdown:getAll', async () => ({
    success: true,
    tasks: shutdownService.getAll(),
  }));
}
