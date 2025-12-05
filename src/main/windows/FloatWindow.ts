import { BrowserWindow, screen, app } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FloatWindow {
  private window: BrowserWindow | null = null;

  async create(): Promise<BrowserWindow> {
    if (this.window && !this.window.isDestroyed()) {
      this.window.show();
      this.window.setAlwaysOnTop(true, 'screen-saver');
      this.window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
      return this.window;
    }

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const floatSize = 120; // 圆形直径
    const x = width - floatSize - 20;
    const y = height - floatSize - 20;

    console.log(`Creating float window at (${x}, ${y}), size: ${floatSize}x${floatSize}`);

    this.window = new BrowserWindow({
      width: floatSize,
      height: floatSize,
      x,
      y,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      resizable: false,
      skipTaskbar: true,
      show: false,
      roundedCorners: false,
      focusable: false,
      fullscreenable: false,
      hasShadow: false,
      backgroundColor: '#00000000',
      webPreferences: {
        preload: path.join(__dirname, '..', 'preload', 'index.cjs'),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    // 保证在全屏/多桌面也可见
    this.window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

    if (process.env.VITE_DEV_SERVER_URL) {
      await this.window.loadURL(`${process.env.VITE_DEV_SERVER_URL}#/float`);
    } else {
      await this.window.loadFile(path.join(app.getAppPath(), 'dist-electron/renderer/index.html'), {
        hash: '#/float',
      });
    }

    this.window.once('ready-to-show', () => {
      console.log('Float window ready to show');
      if (this.window && !this.window.isDestroyed()) {
        this.window.show();
        this.window.setAlwaysOnTop(true, 'screen-saver');
      }
    });

    // 确保窗口显示
    this.window.once('did-finish-load', () => {
      console.log('Float window finished loading');
      if (this.window && !this.window.isDestroyed()) {
        this.window.show();
        this.window.setAlwaysOnTop(true, 'screen-saver');
      }
    });

    // 添加错误处理
    this.window.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Float window failed to load:', errorCode, errorDescription);
    });

    return this.window;
  }

  update(data: unknown): void {
    if (this.window && !this.window.isDestroyed()) {
      this.window.webContents.send('float:update', data);
    }
  }

  destroy(): void {
    this.window?.close();
    this.window = null;
  }
}
