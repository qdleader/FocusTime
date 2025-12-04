export type TimerMode = 'pomodoro' | 'deep' | 'custom';
export type TimerPhase = 'focus' | 'break';

export interface TimerConfig {
  id: string;
  name: string;
  mode: TimerMode;
  focusTime: number;
  breakTime: number;
  isLoop: boolean;
  enableDisturbBlock: boolean;
  soundId?: string;
  createdAt: string;
}

export interface TimerSession {
  id: string;
  configId: string;
  startTime: string;
  endTime?: string;
  type: TimerPhase;
  plannedDuration: number;
  actualDuration: number;
  completed: boolean;
  interrupted: boolean;
  interruptReason?: string;
}
