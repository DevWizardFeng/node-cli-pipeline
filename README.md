# Node.js CLI Pipeline 学习项目

这是一个专门用于学习 Node.js 命令行界面（CLI）开发的项目，包含多个实用模块和示例代码。

## 📁 项目结构

```
node-cli-pipeline/
├── ansi-test/              # ANSI 转义序列测试
├── cli-progress-test/      # 进度条功能测试
├── keyboard-control/       # 键盘控制和交互式UI
└── README.md              # 项目说明文档
```

## 🎯 学习模块

### 1. ANSI 转义序列 (`ansi-test/`)

**目标**：学习如何使用 ANSI 转义序列控制终端显示

#### 核心文件
- [`index.js`](ansi-test/index.js) - 基础 ANSI 清屏和光标定位
- [`index2.js`](ansi-test/index2.js) - 使用 `readline` 模块的高级控制
- [`index3.js`](ansi-test/index3.js) - 光标精确定位和文本显示
- [`chalk.js`](ansi-test/chalk.js) - 使用 chalk 库的颜色输出

#### 关键知识点
```javascript
// 清屏并移动光标到左上角
process.stdout.write('\x1b[2J\x1b[H');

// 使用 readline 模块
readline.cursorTo(process.stdout, 0, 2);
readline.clearScreenDown(process.stdout);
```

### 2. 进度条实现 (`cli-progress-test/`)

**目标**：学习创建动态命令行进度条

#### 核心文件
- [`ProgressBar.ts`](cli-progress-test/ProgressBar.ts) - 自定义进度条类
- [`index.ts`](cli-progress-test/index.ts) - 使用 cli-progress 库

#### 关键特性
- **自定义进度条**：支持 Unicode 字符渲染
- **光标控制**：隐藏/显示光标，位置保存/恢复
- **第三方库**：cli-progress 库的使用

#### 使用示例
```typescript
import { ProgressBar } from './ProgressBar.js';

const bar = new ProgressBar();
bar.start(100, 0);
bar.update(50);  // 50%进度
bar.stop();
```

### 3. 键盘控制和交互式UI (`keyboard-control/`)

**目标**：学习创建交互式命令行界面

#### 核心文件
- [`base-ui.ts`](keyboard-control/base-ui.ts) - UI 抽象基类
- [`scroll-list.ts`](keyboard-control/scroll-list.ts) - 可滚动列表组件
- [`index.ts`](keyboard-control/index.ts) - 键盘事件监听

#### 关键知识点

##### 键盘事件处理
```typescript
import readline from 'node:readline';

// 启用按键事件
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode) {
  process.stdin.setRawMode(true);
}

// 监听按键
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
});
```

##### UI 组件架构
- **BaseUI 抽象类**：提供基础的终端操作方法
- **坐标系统**：使用 (x, y) 坐标精确定位文本
- **组件继承**：具体UI组件继承 BaseUI 实现

## 🛠️ 技术栈

### 核心依赖
- **ansi-escapes**: ANSI 转义序列工具库
- **chalk**: 终端颜色输出库
- **cli-progress**: 进度条库
- **typescript**: TypeScript 支持

### Node.js 内置模块
- **readline**: 命令行输入输出处理
- **process.stdout**: 标准输出流
- **os**: 操作系统相关信息

## 🚀 快速开始

### 安装依赖
```bash
# ANSI 测试模块
cd ansi-test && npm install

# 进度条测试模块
cd cli-progress-test && npm install

# 键盘控制模块
cd keyboard-control && npm install
```

### 运行示例

#### 1. ANSI 转义序列测试
```bash
node ansi-test/index.js          # 基础清屏
node ansi-test/index2.js         # readline 控制
node ansi-test/index3.js         # 光标定位
node ansi-test/chalk.js          # 颜色输出
```

#### 2. 进度条示例
```bash
# 编译 TypeScript（可选）
cd cli-progress-test && npx tsc

# 运行进度条
node cli-progress-test/index.js          # 使用 cli-progress 库
node cli-progress-test/dist/index.js     # 自定义进度条
```

#### 3. 键盘控制示例
```bash
# 编译 TypeScript
cd keyboard-control && npx tsc

# 运行键盘监听
node keyboard-control/dist/index.js

# 运行可滚动列表示例
# 需要创建测试文件或查看 scroll-list.ts
```

## 📖 核心概念详解

### ANSI 转义序列
- **清屏**: `\x1b[2J` - 清除整个屏幕
- **光标定位**: `\x1b[{y};{x}H` - 移动光标到指定位置
- **颜色**: `\x1b[{color}m` - 设置文本颜色和样式

### 光标控制
- `cursorHide()` / `cursorShow()` - 隐藏/显示光标
- `cursorSavePosition()` / `cursorRestorePosition()` - 保存/恢复光标位置
- `cursorTo(x, y)` - 移动光标到指定坐标

### 终端尺寸获取
```typescript
const { columns, rows } = process.stdout;
```

## 🎨 最佳实践

### 1. 错误处理
- 始终检查 `process.stdin.setRawMode` 是否存在
- 提供退出机制（Ctrl+C）
- 处理终端尺寸变化

### 2. 性能优化
- 使用光标位置保存/避免重复清屏
- 限制渲染频率
- 合理使用 ANSI 转义序列

### 3. 用户体验
- 提供清晰的退出指示
- 使用颜色增强可读性
- 保持界面整洁，避免闪烁

## 🔧 开发技巧

### TypeScript 配置
每个模块都配置了 `tsconfig.json`，支持：
- ES 模块 (`"type": "module"`)
- 现代语法 (`"target": "es2016"`)
- 严格类型检查 (`"strict": true`)

### 调试建议
1. 先在简单终端中测试
2. 逐步添加功能
3. 注意不同终端的兼容性
4. 测试各种边界情况

## 📚 扩展学习

### 相关库推荐
- **ink**: React for CLI
- **blessed**: 高级终端界面库
- **inquirer**: 交互式命令行界面
- **ora**: 优雅的终端加载动画

### 进阶主题
- TUI（终端用户界面）设计
- 跨平台兼容性
- 终端性能优化
- 复杂交互模式实现

## 🤝 贡献

欢迎提交问题和改进建议！这个项目主要用于学习目的，帮助开发者掌握 Node.js CLI 开发的核心技能。

---

**开始你的 CLI 开发之旅吧！** 🎉 
