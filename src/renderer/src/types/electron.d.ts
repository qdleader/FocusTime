export {};

declare global {
  interface Window {
    electronAPI: {
      shutdown: {
        create: (task: unknown) => Promise<{ success: boolean; task?: unknown }>;
        cancel: (taskId: string) => Promise<{ success: boolean }>;
        getAll: () => Promise<{ success: boolean; tasks?: unknown[] }>;
      };
      timer: {
        start: (config: unknown) => Promise<{ success: boolean }>;
        pause: () => Promise<{ success: boolean }>;
        resume: () => Promise<{ success: boolean }>;
        reset: () => Promise<{ success: boolean }>;
        getConfigs: () => Promise<{ success: boolean; configs?: unknown[] }>;
        saveConfigs: (configs: unknown) => Promise<{ success: boolean }>;
      };
      settings: {
        get: () => Promise<{ success: boolean; settings?: unknown }>;
        update: (payload: unknown) => Promise<{ success: boolean; settings?: unknown }>;
        setAutoStart: (enable: boolean) => Promise<{ success: boolean; enabled?: boolean }>;
      };
      float: {
        show: () => void;
        hide: () => void;
      };
      on: (channel: string, callback: (...args: unknown[]) => void) => void;
      off: (channel: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

