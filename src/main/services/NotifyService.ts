import { Notification } from 'electron';
import path from 'path';

interface NotifyOptions {
  title: string;
  body: string;
  sound?: string;
}

export class NotifyService {
  static send(options: NotifyOptions): void {
    const notification = new Notification({
      title: options.title,
      body: options.body,
      silent: !options.sound,
      icon: path.join(process.cwd(), 'resources/icons/icon.png'),
    });

    notification.show();
  }
}
