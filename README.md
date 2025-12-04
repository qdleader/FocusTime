# FocusTime

桌面端「定时关机 + 专注时间计时器」一体化应用需求文档（PRD）与技术方案  
适用于 Vite + Electron + TypeScript 技术栈实现

---

## 目录

1. [文档概述](#1-文档概述)  
2. [用户需求分析](#2-用户需求分析)  
3. [功能需求](#3-功能需求)  
4. [非功能需求](#4-非功能需求)  
5. [界面原型规划](#5-界面原型规划)  
6. [项目优先级（MoSCoW）](#6-项目优先级moscow)  
7. [附录](#7-附录)  
8. [技术方案](#桌面端定时关机与专注时间计时器应用技术方案)  

---

## 1. 文档概述

### 1.1 文档目的

明确桌面端“定时关机 + 专注时间计时器”一体化应用的核心需求、功能边界、非功能要求及交互规范，为产品、设计、研发、测试提供统一指导，确保产品满足定时管控与专注效率提升的核心诉求。

### 1.2 产品定位

轻量、高效、易用的桌面端工具，解决：

- 定时关机：帮助合理管控设备使用时长，避免熬夜或忘记关机；
- 专注计时：提供沉浸式计时体验，屏蔽干扰，提升时间管理效率。

面向学生、职场人士、自由职业者、家长等有时间管控需求的桌面端用户，支持 Windows、macOS 主流系统。

### 1.3 核心价值

- **高效管控**：一键设置定时关机，减少设备无效运行，降低能耗；
- **专注提升**：沉浸式计时体验，帮助建立规律节奏；
- **轻量便捷**：体积小、启动快、资源占用低，适配日常桌面场景。

### 1.4 适用范围

适用于产品经理、UI/UX 设计、前端、后端、测试及项目管理人员，作为项目推进各阶段依据。

---

## 2. 用户需求分析

### 2.1 目标用户画像

- **学生**：需要定时关机避免熬夜，通过专注计时规划学习时间。  
- **职场人士**：拆分工作节奏，设置下班关机避免忘记。  
- **自由职业者**：提升时间管理效率，规范作息。  
- **家长**：为孩子设置定时关机，管控使用时长。  

### 2.2 核心用户痛点

1. 忘记关机导致耗电、硬件损耗。  
2. 缺少熬夜管控手段，容易沉迷娱乐内容。  
3. 专注效率低，易被通知或无关软件干扰。  
4. 现有工具分散，体验割裂。  

### 2.3 用户场景示例

1. 学生小李 23:00 定时关机 + 45 分钟专注学习。  
2. 职场人小张开启番茄钟并设置 18:00 定时关机。  
3. 家长每天 21:30 定时关机限制孩子使用电脑。  

---

## 3. 功能需求

### 3.1 定时关机模块

#### 3.1.1 定时方式设置

- 支持「指定时间」与「倒计时」两种模式，任意切换。  
- 指定时间：精确到分钟（年/月/日/时/分）。  
- 倒计时：1 分钟至 24 小时，可输入小时/分钟，点击开始后执行。  
- 提供直观日期选择器与时间输入框，支持手动输入与下拉选择。  

#### 3.1.2 关机任务管理

- 查看当前关机任务（类型、具体时间或剩余时长）。  
- 手动取消关机任务，取消即不再执行。  
- 支持重复任务（每天、每周指定日期、每月指定日期）。  
- 重复任务可设生效周期（仅本周/长期/自定义起止），到期自动失效。  

#### 3.1.3 关机提醒与确认

- 关机前弹窗提醒（默认提前 5 分钟），包含「取消关机」「立即关机」「延迟 10 分钟」。  
- 用户未操作则倒计时结束后自动关机。  
- 支持自定义提醒时长（1/3/5/10 分钟）。  

### 3.2 专注时间计时器模块

#### 3.2.1 计时模式选择

- 默认「番茄钟」（25+5）与「深度专注」（45+10）。  
- 支持自定义模式（1-120 分钟），可保存最多 5 个方案便于复用。  
- 支持循环模式，自动切换专注/休息，直至手动暂停；关闭则单次结束后停止。  

#### 3.2.2 计时状态管理

- 界面显示当前模式、剩余时间（大号字体）、已完成次数。  
- 支持开始、暂停、重置，按钮显著。  
- 计时中可切换专注/休息（需确认弹窗）。  
- 休息结束前 1 分钟轻提醒，提示即将进入专注。  

#### 3.2.3 专注提醒与干扰屏蔽

- 专注或休息结束触发提醒：声音（内置 3 种提示音可选）、桌面弹窗、任务栏闪烁（可配置）。  
- 支持「专注模式干扰屏蔽」：隐藏无关桌面图标、屏蔽非系统弹窗，结束后恢复。  
- 干扰屏蔽可在设置中开/关，避免影响正常操作。  

#### 3.2.4 专注数据统计

- 自动记录每日/每周/每月：总时长、完成次数、常用模式。  
- 提供数据可视化（柱状图、饼图等）。  
- 支持导出 Excel/CSV。  
- 数据默认本地存储，支持手动清理历史数据。  

### 3.3 通用功能模块

#### 3.3.1 桌面悬浮窗

- 悬浮窗显示核心信息（当前计时剩余时间/关机剩余时间），可拖动。  
- 点击进入主界面，右键弹出快捷菜单（暂停/继续、取消关机、退出悬浮窗）。  
- 支持自定义透明度（30%~100%）和大小（小/中/大）。  

#### 3.3.2 系统设置

- 基础：开机自启、默认启动页面（定时关机/专注计时器）、语言（简体中文/英文）。  
- 外观：主题（浅色/深色/跟随系统）、界面皮肤（3 种内置 + 自定义背景）。  
- 提醒：自定义提醒声音、方式（声音/弹窗/任务栏闪烁）、关机提醒时长。  
- 数据：存储路径、自动清理历史数据（7/30/90 天）、数据导出设置。  

#### 3.3.3 异常处理

- 断电/重启恢复：应用重启后恢复未完成的关机与计时任务（需确认后执行）。  
- 错误提示：设置无效时给出明确原因与修正建议。  
- 日志记录：自动记录运行错误日志，支持导出。  

---

## 4. 非功能需求

### 4.1 性能

- 启动时间 ≤ 3 秒（i5/8 GB 设备）。  
- 运行时 CPU ≤ 5%，内存 ≤ 50 MB；悬浮窗模式资源占用降 30%。  
- 计时精度误差 ≤ 1 秒。  
- 连续运行 72 小时无崩溃、不卡顿。  

### 4.2 兼容性

- 支持 Windows 10+（32/64 位）、macOS 10.15+。  
- 适配主流分辨率（≥1366×768），无遮挡。  
- 与常见桌面软件无冲突。  

### 4.3 易用性

- 零学习成本即可完成核心操作。  
- 布局清晰、入口明显、按钮标识准确。  
- 操作有明确反馈（按钮态、弹窗提示等）。  
- 内置帮助中心（FAQ、操作指南）。  

### 4.4 安全性

- 专注数据仅本地存储。  
- 最小权限原则，仅申请必要权限。  
- 安装包安全校验，无捆绑。  

### 4.5 可维护性

- 支持自动检查更新，提供更新日志。  
- 模块化设计，便于扩展与修复。  
- 完整日志管理，可导出追踪问题。  

---

## 5. 界面原型规划

### 5.1 整体风格

简约、清爽、轻量化，浅色为主，支持深色模式；核心信息突出，操作路径短。  

### 5.2 核心界面布局

#### 5.2.1 主界面

- 顶部：应用名称、功能切换（定时关机/专注计时）、设置、帮助入口。  
- 中部：根据当前模块展示对应功能。  
- 底部：版本信息、退出按钮。  

#### 5.2.2 定时关机界面

- 左侧：定时模式选择、时间设置、设定按钮。  
- 右侧：任务列表（类型、时间、状态）及操作（取消、编辑、重复设置）。  

#### 5.2.3 专注计时界面

- 顶部：模式选择 tabs、循环模式开关。  
- 中部：剩余时间大字、当前状态、完成次数。  
- 底部：开始/暂停/重置、干扰屏蔽开关、数据统计入口。  

#### 5.2.4 悬浮窗

- 显示剩余时间，右键菜单提供快捷操作（暂停/继续、取消任务、进入主界面、退出）。  

---

## 6. 项目优先级（MoSCoW）

### 6.1 Must Have

- 定时关机核心（指定时间/倒计时、提醒、取消）。  
- 专注计时核心（番茄钟/深度模式、开始/暂停/重置、提醒）。  
- 桌面悬浮窗、开机自启、主题切换。  
- 核心性能与兼容性。  

### 6.2 Should Have

- 重复关机任务。  
- 自定义/循环专注模式。  
- 专注数据统计与可视化。  
- 干扰屏蔽。  

### 6.3 Could Have

- 数据导出。  
- 自定义皮肤/背景。  
- 多语言支持。  

### 6.4 Won't Have

- 云端数据同步。  
- 社交分享。  
- 高级数据分析。  

---

## 7. 附录

### 7.1 术语

- **番茄钟模式**：25 分钟专注 + 5 分钟休息循环。  
- **悬浮窗**：桌面顶层小窗口，显示核心信息并提供快捷操作。  
- **干扰屏蔽**：隐藏无关图标、屏蔽非系统通知以降低干扰。  

### 7.2 参考资料

- 《番茄工作法图解》——弗朗西斯科·西里洛。  
- 主流桌面工具交互设计规范。  
- Windows/macOS 系统权限与开发文档。  

### 7.3 版本历史

| 版本 | 日期 | 作者 | 说明 |
| --- | --- | --- | --- |
| V1.0 | 2025-12-04 | 资深产品经理 | 初稿，覆盖核心需求、功能模块、非功能需求等。 |

---

# 桌面端定时关机与专注时间计时器应用技术方案

基于 **Vite + Electron + TypeScript** 技术栈，支持跨平台桌面端发布。

## 1. 技术架构设计

### 1.1 整体架构

```
┌─────────────────────────────────────────────────┐
│                  Electron App                    │
├─────────────────────────────────────────────────┤
│  Main Process (Node.js 环境)                    │
│  - 系统关机调度                                   │
│  - 定时任务管理                                   │
│  - 本地数据存储                                   │
│  - 系统通知/提醒                                  │
│  - IPC 通信管理                                   │
│  - 悬浮窗管理                                     │
├─────────────────────────────────────────────────┤
│  Renderer Process (Chromium 环境)               │
│  ┌─────────────────────────────────────────┐   │
│  │  Vue 3 + TypeScript                      │   │
│  │  - 页面路由管理                           │   │
│  │  - 状态管理 (Pinia)                      │   │
│  │  - UI 组件库                              │   │
│  │  - 业务逻辑层                             │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

         ↕ IPC Communication (contextBridge)

┌─────────────────────────────────────────────────┐
│            Operating System APIs                 │
│  - Windows (shutdown /s /t, schtasks)           │
│  - macOS (osascript, shutdown, launchctl)       │
└─────────────────────────────────────────────────┘
```

### 1.2 进程通信设计

使用 Electron IPC：`contextBridge` 安全暴露主进程 API，`ipcMain/ipcRenderer` 双向通信。

## 2. 技术栈选型

| 技术 | 版本 | 用途 |
| --- | --- | --- |
| Electron | ^28.0.0 | 桌面应用框架 |
| Vite | ^5.0.0 | 前端构建工具 |
| TypeScript | ^5.3.0 | 类型安全 |
| Vue 3 | ^3.4.0 | UI 框架 |
| Pinia | ^2.1.0 | 状态管理 |
| Element Plus | ^2.5.0 | UI 组件库 |

辅助库：

```json
{
  "dependencies": {
    "node-schedule": "^2.1.1",
    "electron-store": "^8.1.0",
    "dayjs": "^1.11.10",
    "chart.js": "^4.4.0",
    "howler": "^2.2.4"
  },
  "devDependencies": {
    "electron-builder": "^24.9.0",
    "vite-plugin-electron": "^0.28.0",
    "eslint": "^8.56.0",
    "prettier": "^3.1.0"
  }
}
```

## 3. 核心模块设计

### 3.1 目录结构

```
project-root/
├── src/
│   ├── main/                  # 主进程
│   │   ├── index.ts
│   │   ├── ipc/
│   │   │   ├── shutdown.ts
│   │   │   ├── timer.ts
│   │   │   ├── storage.ts
│   │   │   └── window.ts
│   │   ├── services/
│   │   │   ├── ShutdownService.ts
│   │   │   ├── TimerService.ts
│   │   │   ├── NotifyService.ts
│   │   │   └── StorageService.ts
│   │   ├── utils/
│   │   │   ├── systemCommand.ts
│   │   │   ├── logger.ts
│   │   │   └── autoStart.ts
│   │   └── windows/
│   │       ├── MainWindow.ts
│   │       └── FloatWindow.ts
│   ├── renderer/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── App.vue
│   │   │   ├── router/
│   │   │   ├── stores/
│   │   │   ├── views/
│   │   │   ├── components/
│   │   │   ├── composables/
│   │   │   ├── assets/
│   │   │   └── styles/
│   │   └── index.html
│   ├── preload/
│   │   └── index.ts
│   └── shared/
│       ├── types/
│       └── constants/
├── resources/
│   ├── icons/
│   └── sounds/
├── electron-builder.json5
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### 3.2 核心服务

#### 3.2.1 ShutdownService

负责关机任务调度、执行与提醒，示例：

```
```typescript
import schedule from 'node-schedule';
import { executeShutdown, cancelShutdown } from '../utils/systemCommand';

class ShutdownService {
  private tasks = new Map<string, ShutdownTask>();
  private scheduleJobs = new Map<string, schedule.Job>();

  createTask(task: Omit<ShutdownTask, 'id' | 'createdAt'>): string {
    const id = this.generateId();
    const newTask = { ...task, id, createdAt: new Date() };
    this.tasks.set(id, newTask);
    this.scheduleTask(newTask);
    this.saveToStorage();
    return id;
  }

  private scheduleTask(task: ShutdownTask): void {
    if (task.type === 'specific' && task.time) {
      const job = schedule.scheduleJob(task.time, () => {
        this.executeShutdownWithNotify(task.id);
      });
      this.scheduleJobs.set(task.id, job);
    } else if (task.type === 'countdown' && task.countdown) {
      const executeTime = new Date(Date.now() + task.countdown * 1000);
      const job = schedule.scheduleJob(executeTime, () => {
        this.executeShutdownWithNotify(task.id);
      });
      this.scheduleJobs.set(task.id, job);
    }
  }
}
```
```

#### 3.2.2 TimerService

管理专注计时、循环模式、状态更新：

```
```typescript
class TimerService {
  private currentSession: TimerSession | null = null;
  private timerInterval: NodeJS.Timeout | null = null;
  private remainingTime = 0;

  startTimer(config: TimerConfig): void {
    if (this.currentSession) this.pauseTimer();
    this.currentSession = {
      id: this.generateId(),
      configId: config.id,
      startTime: new Date(),
      type: 'focus',
      duration: config.focusTime,
      completed: false,
    };
    this.remainingTime = config.focusTime;
    if (config.enableDisturbBlock) this.enableDisturbBlock();
    this.startCountdown();
  }
}
```
```

## 4. 数据存储方案

使用 `electron-store`，定义 schema，支持任务、计时配置、会话、设置等数据持久化及自动清理。

## 5. 关键技术实现

- **系统关机命令封装**：根据平台调用 `shutdown /s /t`、`osascript`、`shutdown -h` 等命令，支持取消关机。  
- **开机自启**：macOS 使用 Login Items，Windows 使用注册表。  
- **系统通知**：Electron `Notification` + 自定义声音。  
- **悬浮窗**：`BrowserWindow` 置顶、透明、可拖动，支持 `float:update` 渲染。  
- **IPC 通信**：`preload` 暴露 `shutdown/timer/settings/float` API，主进程注册对应 handler。  

## 6. 前端状态管理

Pinia Store 管理计时、关机、设置状态，监听主进程事件（`timer:update`、`timer:complete`），提供格式化时间、进度等计算属性。

## 7. 构建与打包

- `vite.config.ts` 集成 `vite-plugin-electron`，分别构建主进程、预加载、渲染进程。  
- `electron-builder.json5` 配置多平台打包（mac dmg/zip，win nsis，linux AppImage/deb）。  
- `npm scripts`：`dev`、`build`、各平台打包、`lint`、`format`。  

## 8. 性能优化

- 主进程：懒加载服务、任务队列、缓存常用数据。  
- 渲染进程：路由懒加载、虚拟列表、防抖节流、WebWorker 处理统计。  
- 资源：图片压缩、代码分割、Tree Shaking。  

## 9. 测试策略

- **单元测试**：Vitest 覆盖服务逻辑（如 ShutdownService）。  
- **集成测试**：Spectron/Playwright。  
- **手动测试**：定时关机、计时器、悬浮窗、通知、持久化、多平台、性能。  

## 10. 部署与发布

- 语义化版本：`MAJOR.MINOR.PATCH`。  
- 集成 `electron-updater` 自动更新，监听更新事件。  
- 发布流程：更新版本与 changelog → `npm run build` → 上传包 → 更新商店信息 → 通知用户。  

## 11. 开发规范

- ESLint（Airbnb 规则）、Prettier、Conventional Commits。  
- TypeScript 严格模式。  
- Git 工作流：`main`（稳定）、`develop`、`feature/*`、`bugfix/*`。  

## 12. 风险评估

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| 系统权限不足 | 高 | 提示授予管理员权限 |
| 平台 API 差异 | 中 | 封装统一接口，条件编译 |
| 数据丢失 | 高 | 定期备份、异常恢复 |
| 性能问题 | 中 | 性能监控，优化热点 |

## 13. 后续迭代计划

- **V1.0**：核心关机与计时、基础 UI。  
- **V1.1**：云同步、更多统计图表、自定义皮肤。  
- **V2.0**：AI 建议、团队协作、移动端同步。  

---

> 项目将按照以上 PRD 与技术方案分阶段实现，并在本仓库持续迭代。

---

## 开发指南

1. 安装依赖：`npm install`（首次安装后如需完整 Electron 运行时，请在联网环境执行 `npm rebuild electron --download`）。  
2. 启动开发服务：`npm run dev`（Vite + Electron 热更新）。  
3. 代码检查：`npm run lint`，格式化 `npm run format`。  
4. 生产构建：`npm run build`，生成渲染进程、主进程并调用 `electron-builder` 打包。  
5. 单元测试：`npm run test` / `npm run test:watch`。  
