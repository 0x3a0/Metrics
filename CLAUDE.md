# CLAUDE.md

本文件用于约束 Claude Code 在本仓库中的工作方式。

## 项目概览

Metrics 是一个 CS 饰品数据看板项目：

- 前端负责账号绑定、Dashboard 和 Settings 页面
- 后端负责账户数据写入与 API 提供
- Crawler 定时抓取库存与价格数据
- 数据统一落在共享 SQLite：`data/userVal.db`

本仓库不是 workspace monorepo。`backend`、`frontend`、`crawler` 都有独立 `package.json`，依赖需要分别安装。

## 技术栈

- Frontend: Vue 3 + Composition API + Vite 7 + Vue Router 4 + Axios + TailwindCSS 4 + DaisyUI 5
- Backend: Express 5 + better-sqlite3 + Axios + Morgan
- Crawler: Node.js + cron + Axios + winston + `node:sqlite`
- Database: `data/userVal.db`
- 所有子项目均使用 ES Modules

## 目录速览

- `backend/`: Express API 与 SQLite 访问
- `frontend/`: Vue SPA
- `crawler/`: 定时抓取任务
- `data/`: 共享 SQLite 数据库

前端关键位置：

- 页面：`frontend/src/pages`
- 组件：`frontend/src/components`
- API 封装：`frontend/src/utils/api.js`
- 全局主题与插件：`frontend/src/style.css`
- 路由：`/dashboard`、`/accounts`、`/settings`

## 通用工作规则

- 优先做小而准的改动，贴合现有架构。
- 前端状态默认保留在组件内，使用 Composition API 管理。
- 前端导入别名为 `@ -> frontend/src`。
- 注释只在必要处补充，不写解释性废话。
- 不新增与现有栈重复的 UI 框架、样式框架或状态库。

## 前端强制规范

Agent 编写或修改前端时，默认且必须使用：

- TailwindCSS：负责布局、间距、响应式与细节控制
- DaisyUI：负责按钮、表单、卡片、弹窗、表格、告警等语义组件

必须遵守：

- 优先使用 DaisyUI 组件与模式：`btn`、`card`、`table`、`input`、`select`、`modal`、`alert`、`badge`、`loading`、`dropdown`、`tabs`、`stats`、`menu`、`navbar`
- 用 Tailwind 负责页面骨架、网格、间距、对齐、尺寸和响应式
- DaisyUI 能解决的，不要退回大段自定义 CSS
- 不要引入 Element Plus、Ant Design、Vuetify、Bootstrap 等其他 UI 库
- 非必要不要引入 Sass、Less 等额外样式层
- DaisyUI 不够时，先用 Tailwind 扩展，再考虑在 `frontend/src/style.css` 增加少量共享样式
- 字体和主题优先复用 `frontend/src/style.css` 里的现有设置

## 前端设计风格

目标风格：

- 现代后台
- 克制、专业、低噪音
- 数据优先
- 桌面端信息密度优先，同时保证移动端可用

视觉规则：

- 以浅色主题和灰阶为主
- 语义色只用于状态、告警和强调
- 避免高饱和、炫光、强渐变
- 使用小到中等圆角、细边框、轻阴影
- 多用卡片、表格、统计块、筛选区、结构化面板
- 层级主要靠字号、字重、留白，不靠大量颜色
- 字体优先沿用当前主题中的 `Roboto` 与 `Open Sans`

交互规则：

- 过渡尽量控制在 150ms 到 250ms
- `hover`、`focus`、`active` 需要明确，但不要夸张
- 动效服务于可读性，不做装饰性炫技
- `loading`、`empty`、`error` 状态优先使用 DaisyUI 风格，并保持全站一致

禁止项：

- 把营销页风格塞进后台主界面
- 玻璃拟态、重阴影、重模糊、强 3D
- 与数据争抢注意力的大装饰插画
- 页面之间随机换配色
- 过多自定义动画
- 同一功能中混用 DaisyUI 与另一套组件库

## 关键业务流

1. 用户在 Accounts 页面绑定 Steam 账号
2. Backend 将账号写入 `users`
3. Crawler 定时抓取库存和价格
4. Backend 提供 `/api/v1/user/*` 与 `/api/v1/inventory/*`
5. Dashboard 读取历史数据，并通过 SSE 接收实时更新

## 常用命令

需要在哪个子项目工作，就进入哪个目录单独安装依赖。

```bash
# root
npm run backend
npm run frontend

# backend
cd backend
npm install
npm run server-dev

# frontend
cd frontend
npm install
npm run dev
npm run build

# crawler
cd crawler
npm install
npm start
```

## 环境说明

- Backend 默认端口：`9280`
- Backend 环境文件：`backend/.env`
- Crawler 环境文件：`crawler/.env`
- Crawler 必需密钥：`C5GAME_APP_KEY`
