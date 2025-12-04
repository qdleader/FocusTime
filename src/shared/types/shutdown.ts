export type ShutdownTaskType = 'specific' | 'countdown';
export type ShutdownTaskStatus = 'active' | 'paused' | 'completed' | 'cancelled';

export interface RepeatRule {
  frequency: 'daily' | 'weekly' | 'monthly';
  daysOfWeek?: number[];
  dateOfMonth?: number;
  startDate?: string;
  endDate?: string;
}

export interface ShutdownTask {
  id: string;
  type: ShutdownTaskType;
  time?: string;
  countdown?: number;
  isRepeating: boolean;
  repeatRule?: RepeatRule;
  notifyBefore: number;
  status: ShutdownTaskStatus;
  createdAt: string;
  updatedAt: string;
}
