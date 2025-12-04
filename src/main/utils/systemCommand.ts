import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function executeShutdown(delaySeconds = 0): Promise<void> {
  const platform = process.platform;
  if (platform === 'win32') {
    await execAsync(`shutdown /s /t ${delaySeconds}`);
    return;
  }

  if (platform === 'darwin') {
    const minutes = Math.max(1, Math.ceil(delaySeconds / 60));
    await execAsync(`sudo shutdown -h +${minutes}`);
    return;
  }

  const minutes = Math.max(1, Math.ceil(delaySeconds / 60));
  await execAsync(`shutdown -h +${minutes}`);
}

export async function cancelShutdown(): Promise<void> {
  const platform = process.platform;
  if (platform === 'win32') {
    await execAsync('shutdown /a');
    return;
  }

  if (platform === 'darwin') {
    await execAsync('sudo killall shutdown');
    return;
  }

  await execAsync('shutdown -c');
}
