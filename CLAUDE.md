# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Metrics 是一个 CS 饰品追踪全栈应用：用户提供 SteamID，系统同步库存数据，获取多平台（Buff163、c5game 等）在售价格，提供分析报表。

## Coding Rules

- 遵守 Vue 3 组件设计规范，每个组件只负责一个功能模块
- 前端样式使用 TailwindCSS，优先使用 DaisyUI 组件
- 无全局状态管理（无 Pinia/Vuex），状态在组件内部用 Composition API 管理
- 前端路径别名: `@` → `./src`
- 编写代码时包含简易的注释

## 前端样式风格规范

### 🎯 核心风格
现代企业后台风格（Modern Admin UI），强调：
- 简洁克制（Minimal & Clean）
- 专业理性（Professional）
- 数据优先（Data-first）
- 低视觉干扰（Low Noise）
- 以灰阶为基础、白底为主、状态色点缀的轻量级后台 UI 风格

### 🎨 色彩规范（Color Style）

#### 基础色
- 主背景：白色（#FFFFFF）
- 页面背景：极浅灰（#F9FAFB / #F3F4F6）
- 边框：浅灰（#E5E7EB / #F1F5F9）

#### 文本颜色
- 主文本：深灰（#111827）
- 次文本：中灰（#6B7280）
- 辅助文本：浅灰（#9CA3AF）

#### 状态色（仅用于语义表达）
- 成功：绿色（emerald）
- 警告：黄色（amber）
- 错误：红色（rose）

约束：
- 不使用大面积高饱和颜色
- 不使用装饰性渐变
- 色彩以“灰阶 + 少量语义色”为主

### 🔤 字体与层级（Typography）

- 使用清晰、现代的无衬线字体
- 通过“字号 + 粗细 + 颜色灰度”建立层级

层级原则：
- 重要信息：更大、更粗、更深色
- 次要信息：中等字号、中灰
- 辅助信息：小字号、浅灰

约束：
- 不依赖颜色强调层级
- 不使用花哨字体或装饰字体

### 🔲 形状与视觉语言（Visual Language）

- 使用统一的小到中等圆角（rounded）
- 边框细且低对比
- 阴影非常轻（仅用于层级区分）

整体风格：
- 扁平化（Flat）
- 轻质感（Soft UI）
- 无强装饰

约束：
- 不使用重阴影
- 不使用玻璃拟态（Glassmorphism）
- 不使用强渐变或发光效果

### ⚡ 交互反馈（Interaction Style）

- 所有交互反馈必须轻量、克制
- 使用短时长过渡（150~250ms）

常见反馈：
- hover：轻微背景或边框变化
- focus：低对比高亮
- active：细微变化

约束：
- 不使用复杂动画
- 不制造视觉干扰
- 动效必须服务于可读性

### 🧠 风格原则（Design Principles）

Agent 在生成 UI 时必须遵守：

1. **克制优先**
   - 所有视觉表达应尽量减少干扰

2. **一致性优先**
   - 圆角、边框、颜色、字体必须统一

3. **可读性优先**
   - 信息必须清晰、易扫描

4. **语义明确**
   - 颜色仅用于表达状态或意义

5. **功能导向**
   - UI 为信息服务，而不是装饰

### ❌ 禁止事项（Anti-pattern）

- ❌ 大面积高饱和配色
- ❌ 渐变主导的设计
- ❌ 重阴影 / 强立体感
- ❌ 花哨动效
- ❌ 不统一的圆角/边框/字体
- ❌ 装饰性元素过多

### ✅ 最终约束

- 所有 UI 必须看起来像一个“干净、克制、专业的数据后台系统”，而不是营销页面或娱乐产品。
  
## Tech Stack

- **Frontend**: Vue 3 (Composition API + `<script setup>`) + Vite 7 + TailwindCSS 4 + DaisyUI 5 + Vue Router 4 + Axios
- **Backend**: Express.js 5 + better-sqlite3 + Axios + Morgan
- **Crawler**: Node.js + Axios + cron + winston + node:sqlite (DatabaseSync)
- **Database**: 共享 SQLite (`data/userVal.db`)
- **所有子项目均使用 ES Modules** (`"type": "module"`)

## Common Commands

```bash
# 安装依赖（需在根目录、backend、frontend、crawler 各自执行）
npm install

# 开发模式
npm run backend              # 根目录启动后端 (port 9280)
npm run frontend             # 根目录启动前端 (Vite dev server)
cd backend && npm run server-dev   # 后端 nodemon 模式
cd frontend && npm run dev         # 前端 Vite 开发服务器
cd crawler && npm start            # 启动爬虫 (cron 定时任务)

# 构建
cd frontend && npm run build    # 生产构建
cd frontend && npm run preview  # 预览生产构建
```

无测试套件，无 linting 配置。

## Architecture

三个独立子项目，各自有 package.json，非 workspace monorepo，依赖需分别安装。

```
backend/          Express API 服务
  app.js          Express 应用配置（CORS、JSON 解析、Morgan 日志）
  server.js       服务入口
  database.js     SQLite 连接 + users 表初始化
  controllers/    请求处理（inventoryController, userController, errorController）
  models/         prepared statement 数据库查询
  routers/        路由定义 (/api/v1/inventory, /api/v1/user)
  utils/          appError, catchAsync, catchSync

frontend/         Vue 3 SPA
  src/pages/          页面组件 (DashboardPage, AccountPage, SettingsPage)
  src/components/main/    Dashboard 组件 (HeaderSection, AnalyticsCards, InventoryTable)
  src/components/sidebars/  侧边栏 (sidebarLayout, sidebarContent)
  src/utils/          api.js (Axios 封装), debounce.js, sleep.js
  src/router/         路由配置 (/ → /dashboard, /account, /settings)

crawler/          定时爬虫服务
  start.js            CronJob 调度入口
  database.js         SQLite 连接 + inventory/inventory_item_price 表初始化
  model.js            prepared statement 数据库查询
  crawls/inventory.js       Steam 库存爬取
  crawls/inventoryPrice.js  C5Game 价格爬取

data/             共享 SQLite 数据库文件 (userVal.db)
```

### Data Flow

1. 用户通过前端绑定 Steam 账号 → 写入 `users` 表
2. Crawler 每 5 秒检查绑定账号 (`checkAccountJob`)
3. 发现账号后：库存爬取（每 30 分钟）+ 价格爬取（每 5 分钟）
4. 前端通过 SSE 端点 (`/api/v1/inventory/realTime`) 获取实时更新
5. Dashboard 通过 `/api/v1/inventory/history` 展示历史数据

### Database Schema

SQLite 位于 `data/userVal.db`，三个表分别由 backend 和 crawler 初始化：

- **users** (backend/database.js): steam_id, account_id, persona_name, avatar_url
- **inventory** (crawler/database.js): appid, classid, instanceid, name, market_hash_name, steam_id, crawl_time 等
- **inventory_item_price** (crawler/database.js): classid, instanceid, name, sell_price, sell_count, price_source, steam_id, crawl_time 等

**重要**: Backend 使用 `better-sqlite3`，Crawler 使用 `node:sqlite` 的 `DatabaseSync`，两者访问同一个 SQLite 文件但驱动不同。

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/user/getAccount` | 获取已绑定账号 |
| GET | `/api/v1/user/searchAccount?steam_id=xxx` | 搜索 Steam 账号 |
| POST | `/api/v1/user/bindAccount` | 绑定 Steam 账号 |
| GET | `/api/v1/inventory/history?steamId=xxx` | 历史库存数据 |
| GET | `/api/v1/inventory/realTime?steamId=xxx` | SSE 实时库存推送 |

## Environment Variables

**Backend** (`backend/.env`): `PORT=9280`, `NODE_ENV=development`
**Crawler** (`crawler/.env`): `C5GAME_APP_KEY` (C5Game API 密钥)
