import { contextBridge, ipcRenderer } from 'electron';

const api = {
  shutdown: {
    create: (task: unknown) => ipcRenderer.invoke('shutdown:create', task),
    cancel: (taskId: string) => ipcRenderer.invoke('shutdown:cancel', taskId),
    getAll: () => ipcRenderer.invoke('shutdown:getAll'),
  },
  timer: {
    start: (config: unknown) => ipcRenderer.invoke('timer:start', config),
    pause: () => ipcRenderer.invoke('timer:pause'),
    resume: () => ipcRenderer.invoke('timer:resume'),
    reset: () => ipcRenderer.invoke('timer:reset'),
    getConfigs: () => ipcRenderer.invoke('timer:configs'),
    saveConfigs: (configs: unknown) => ipcRenderer.invoke('timer:saveConfigs', configs),
  },
  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    update: (payload: unknown) => ipcRenderer.invoke('settings:update', payload),
    setAutoStart: (enable: boolean) => ipcRenderer.invoke('settings:autoStart', enable),
  },
  float: {
    show: () => ipcRenderer.send('float:show'),
    hide: () => ipcRenderer.send('float:hide'),
  },
  on: (channel: string, callback: (...args: unknown[]) => void) => {
    ipcRenderer.on(channel, (_, ...args) => callback(...args));
  },
  off: (channel: string, callback: (...args: unknown[]) => void) => {
    ipcRenderer.removeListener(channel, callback as any);
  },
};

contextBridge.exposeInMainWorld('electronAPI', api);

declare global {
  interface Window {
    electronAPI: typeof api;
  }
}
