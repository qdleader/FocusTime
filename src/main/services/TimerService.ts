import { randomUUID } from 'crypto';
import type { TimerConfig, TimerSession, TimerPhase } from '@shared/types/timer';
import { StorageService } from './StorageService';
import { NotifyService } from './NotifyService';

interface TimerUpdatePayload {
  remaining: number;
  session: TimerSession | null;
}

export class TimerService {
  private readonly storage = new StorageService();

  private currentConfig: TimerConfig | null = null;

  private currentSession: TimerSession | null = null;

  private interval: NodeJS.Timeout | null = null;

  private remaining = 0;

  private listeners: Array<(payload: TimerUpdatePayload) => void> = [];

  start(config: TimerConfig): void {
    this.clearInterval();
    this.currentConfig = config;
    this.currentSession = this.createSession('focus');
    this.remaining = config.focusTime;
    this.emit(); // 立即发送初始状态
    this.tick();
  }

  pause(): void {
    this.clearInterval();
    this.emit(); // 发送暂停状态更新
  }

  resume(): void {
    if (!this.currentSession || this.remaining <= 0) return;
    this.emit(); // 发送恢复状态更新
    this.tick();
  }

  reset(): void {
    this.clearInterval();
    this.currentSession = null;
    this.currentConfig = null;
    this.remaining = 0;
    this.emit();
  }

  onUpdate(callback: (payload: TimerUpdatePayload) => void): void {
    this.listeners.push(callback);
  }

  private tick(): void {
    this.interval = setInterval(() => {
      this.remaining -= 1;
      this.emit();

      if (this.remaining <= 0) {
        this.handleComplete();
      }
    }, 1000);
  }

  private handleComplete(): void {
    this.clearInterval();
    if (!this.currentSession || !this.currentConfig) return;

    this.currentSession.completed = true;
    this.currentSession.endTime = new Date().toISOString();
    this.currentSession.actualDuration = this.currentSession.plannedDuration;
    this.storage.appendTimerSession(this.currentSession).catch(err => {
      console.error('Failed to save timer session:', err);
    });

    NotifyService.send({
      title: this.currentSession.type === 'focus' ? '专注结束' : '休息结束',
      body: '点击查看详情',
    });

    if (!this.currentConfig.isLoop && this.currentSession.type === 'break') {
      this.reset();
      return;
    }

    const nextPhase: TimerPhase = this.currentSession.type === 'focus' ? 'break' : 'focus';
    this.currentSession = this.createSession(nextPhase);
    this.remaining = nextPhase === 'focus' ? this.currentConfig.focusTime : this.currentConfig.breakTime;
    this.emit();
    this.tick();
  }

  private createSession(type: TimerPhase): TimerSession {
    const configId = this.currentConfig?.id ?? 'unknown';
    const duration = type === 'focus' ? this.currentConfig?.focusTime ?? 0 : this.currentConfig?.breakTime ?? 0;
    return {
      id: randomUUID(),
      configId,
      startTime: new Date().toISOString(),
      type,
      plannedDuration: duration,
      actualDuration: 0,
      completed: false,
      interrupted: false,
    };
  }

  private emit(): void {
    this.listeners.forEach(listener => listener({
      remaining: this.remaining,
      session: this.currentSession,
    }));
  }

  private clearInterval(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
