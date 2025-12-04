import { app } from 'electron';

export function setAutoStart(enable: boolean): void {
  app.setLoginItemSettings({
    openAtLogin: enable,
    openAsHidden: true,
  });
}

export function isAutoStartEnabled(): boolean {
  return app.getLoginItemSettings().openAtLogin;
}
