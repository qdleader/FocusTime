export interface NotificationSettings {
  sound: boolean;
  soundId: string;
  popup: boolean;
  flash: boolean;
}

export type ThemePreference = 'light' | 'dark' | 'system';
export type DefaultPage = 'shutdown' | 'timer';
export type Language = 'zh-CN' | 'en-US';

export interface FloatWindowSettings {
  enabled: boolean;
  opacity: number;
  size: 'small' | 'medium' | 'large';
}

export interface DataManagementSettings {
  autoCleanDays: number;
  exportPath?: string;
}

export interface AppSettings {
  autoStart: boolean;
  theme: ThemePreference;
  defaultPage: DefaultPage;
  language: Language;
  notification: NotificationSettings;
  floatWindow: FloatWindowSettings;
  dataManagement: DataManagementSettings;
}
