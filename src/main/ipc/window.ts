import { ipcMain } from 'electron';
import { FloatWindow } from '../windows/FloatWindow';

const floatWindow = new FloatWindow();

export function registerWindowHandlers(): void {
  ipcMain.on('float:show', () => {
    floatWindow.create();
  });

  ipcMain.on('float:hide', () => {
    floatWindow.destroy();
  });

  ipcMain.on('float:update', (_, payload) => {
    floatWindow.update(payload);
  });
}
