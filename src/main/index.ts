import { app, BrowserWindow } from 'electron';
import { registerShutdownHandlers } from './ipc/shutdown';
import { registerTimerHandlers } from './ipc/timer';
import { registerSettingsHandlers } from './ipc/settings';
import { registerWindowHandlers } from './ipc/window';
import { MainWindow } from './windows/MainWindow';
import { logger } from './utils/logger';

let mainWindow: BrowserWindow | null = null;

const ensureSingleInstance = (): boolean => {
  const gotLock = app.requestSingleInstanceLock();
  if (!gotLock) {
    app.quit();
    return false;
  }

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  return true;
};

async function createMainWindow(): Promise<void> {
  const windowFactory = new MainWindow();
  mainWindow = await windowFactory.create();
}

function registerIpcHandlers(): void {
  registerShutdownHandlers();
  registerTimerHandlers();
  registerSettingsHandlers();
  registerWindowHandlers();
}

if (ensureSingleInstance()) {
  app.whenReady().then(async () => {
    await createMainWindow();
    registerIpcHandlers();
  }).catch(error => {
    logger.error('Application failed to start', error);
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
