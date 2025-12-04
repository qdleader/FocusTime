import { BrowserWindow, app } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class MainWindow {
  private window: BrowserWindow | null = null;

  async create(): Promise<BrowserWindow> {
    this.window = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 960,
      minHeight: 640,
      title: 'FocusTime',
      show: false,
      webPreferences: {
        preload: path.join(__dirname, '..', 'preload', 'index.js'),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
      await this.window.loadURL(process.env.VITE_DEV_SERVER_URL);
      this.window.webContents.openDevTools({ mode: 'detach' });
    } else {
      await this.window.loadFile(path.join(app.getAppPath(), 'dist-electron/renderer/index.html'));
    }

    this.window.once('ready-to-show', () => this.window?.show());

    return this.window;
  }

  getWindow(): BrowserWindow | null {
    return this.window;
  }
}
