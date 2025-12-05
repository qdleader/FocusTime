import schedule, { Job } from 'node-schedule';
import { randomUUID } from 'crypto';
import type { ShutdownTask } from '@shared/types/shutdown';
import { StorageService } from './StorageService';
import { executeShutdown, cancelShutdown } from '../utils/systemCommand';
import { NotifyService } from './NotifyService';

interface CreateTaskPayload {
  type: ShutdownTask['type'];
  time?: string;
  countdown?: number;
  isRepeating?: boolean;
  repeatRule?: ShutdownTask['repeatRule'];
  notifyBefore?: number;
}

export class ShutdownService {
  private readonly storage = new StorageService();

  private readonly tasks = new Map<string, ShutdownTask>();

  private readonly jobs = new Map<string, Job>();

  constructor() {
    this.bootstrap();
  }

  private async bootstrap(): Promise<void> {
    const persisted = await this.storage.getShutdownTasks();
    persisted.forEach(task => {
      this.tasks.set(task.id, task);
      this.scheduleTask(task);
    });
  }

  getAll(): ShutdownTask[] {
    return Array.from(this.tasks.values());
  }

  create(payload: CreateTaskPayload): ShutdownTask {
    const id = randomUUID();
    const now = new Date().toISOString();
    const task: ShutdownTask = {
      id,
      type: payload.type,
      time: payload.time,
      countdown: payload.countdown,
      isRepeating: Boolean(payload.isRepeating),
      repeatRule: payload.repeatRule,
      notifyBefore: payload.notifyBefore ?? 5,
      status: 'active',
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.set(id, task);
    this.scheduleTask(task);
    this.persist();

    return task;
  }

  cancel(taskId: string): boolean {
    const job = this.jobs.get(taskId);
    if (job) {
      job.cancel();
      this.jobs.delete(taskId);
    }

    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'cancelled';
      task.updatedAt = new Date().toISOString();
      this.tasks.set(taskId, task);
    }

    cancelShutdown();
    this.persist();
    return true;
  }

  private scheduleTask(task: ShutdownTask): void {
    if (task.status !== 'active') return;

    const jobTime = this.resolveExecutionDate(task);
    if (!jobTime) return;

    const reminderMs = (task.notifyBefore ?? 5) * 60 * 1000;
    const job = schedule.scheduleJob(jobTime, () => {
      NotifyService.send({
        title: '即将关机',
        body: `系统将在${task.notifyBefore ?? 5}分钟后关机，任务类型：${task.type === 'specific' ? '指定时间' : '倒计时'}`,
      });

      setTimeout(async () => {
        await executeShutdown();
        this.markCompleted(task.id);
      }, reminderMs);
    });

    if (job) {
      this.jobs.set(task.id, job);
    }
  }

  private resolveExecutionDate(task: ShutdownTask): Date | null {
    if (task.type === 'specific' && task.time) {
      const scheduleTime = new Date(task.time);
      return scheduleTime.getTime() > Date.now() ? scheduleTime : null;
    }

    if (task.type === 'countdown' && task.countdown) {
      return new Date(Date.now() + task.countdown * 1000);
    }

    return null;
  }

  private markCompleted(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (!task) return;
    task.status = 'completed';
    task.updatedAt = new Date().toISOString();
    this.tasks.set(taskId, task);
    this.persist();
  }

  private persist(): void {
    this.storage.saveShutdownTasks(this.getAll()).catch(err => {
      console.error('Failed to persist shutdown tasks:', err);
    });
  }
}
