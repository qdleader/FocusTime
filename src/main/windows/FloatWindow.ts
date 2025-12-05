import { BrowserWindow, screen, app } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FloatWindow {
  private window: BrowserWindow | null = null;

  async create(): Promise<BrowserWindow> {
    if (this.window) return this.window;

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    this.window = new BrowserWindow({
      width: 220,
      height: 120,
      x: width - 260,
      y: height - 180,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      resizable: false,
      skipTaskbar: true,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, '..', 'preload', 'index.cjs'),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
      await this.window.loadURL(`${process.env.VITE_DEV_SERVER_URL}#/float`);
    } else {
      await this.window.loadFile(path.join(app.getAppPath(), 'dist-electron/renderer/index.html'), {
        hash: '#/float',
      });
    }

    this.window.once('ready-to-show', () => this.window?.show());
    return this.window;
  }

  update(data: unknown): void {
    this.window?.webContents.send('float:update', data);
  }

  destroy(): void {
    this.window?.close();
    this.window = null;
  }
}
