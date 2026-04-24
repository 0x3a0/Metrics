# Metrics 项目结构说明

## 1. 项目概览

Metrics 是一个围绕 Steam / CS 库存追踪与饰品价格分析构建的全栈项目。当前仓库已经形成较清晰的分层结构，主要由以下三个运行模块组成：

- `frontend`：前端应用，负责页面展示与用户交互。
- `backend`：后端 API 服务，负责账号绑定、库存查询与数据库访问。
- `crawler`：定时采集服务，负责抓取 Steam 库存与第三方市场价格。

此外，`data/userVal.db` 作为共享的 SQLite 数据库，被后端与爬虫共同使用。

## 2. 顶层目录结构

下面的目录树只保留业务相关目录与核心文件，`node_modules`、`dist` 等依赖和构建产物未纳入说明。

```text
Metrics/
├─ backend/
│  ├─ controllers/
│  ├─ docs/
│  ├─ models/
│  ├─ routers/
│  ├─ utils/
│  ├─ app.js
│  ├─ config.js
│  ├─ database.js
│  ├─ package.json
│  └─ server.js
├─ crawler/
│  ├─ crawls/
│  ├─ database.js
│  ├─ model.js
│  ├─ package.json
│  └─ start.js
├─ data/
│  └─ userVal.db
├─ docs/
│  └─ PROJECT_STRUCTURE.md
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  │  ├─ account/
│  │  │  ├─ main/
│  │  │  └─ sidebars/
│  │  ├─ pages/
│  │  ├─ router/
│  │  ├─ utils/
│  │  ├─ App.vue
│  │  └─ main.js
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.js
├─ Dockerfile
├─ package.json
└─ README.md
```

## 3. 各模块结构与职责

### 3.1 根目录

根目录更多承担“项目协调层”的职责，本身不承载主要业务逻辑。

- `package.json`
  - 定义根级启动脚本。
  - 当前提供 `npm run backend` 和 `npm run frontend` 两个快捷命令。
- `Dockerfile`
  - 预留的容器化文件。
- `README.md`
  - 项目简介与待办事项。

这说明仓库采用的是“根目录协调 + 子模块独立实现”的组织方式，实际功能分别落在 `frontend`、`backend`、`crawler` 中。

### 3.2 frontend：前端应用层

前端使用 `Vue 3 + Vite + Vue Router`，按“页面层 + 组件层 + 工具层”组织代码。

#### 核心入口

- `src/main.js`
  - 创建 Vue 应用实例。
  - 注入路由并挂载到页面。

- `src/App.vue`
  - 前端根组件。
  - 通过 `sidebarLayout` 组织整体页面结构，并在主区域内渲染路由页面。

- `src/router/index.js`
  - 定义前端路由。
  - 当前页面包括：
    - `/dashboard`
    - `/accounts`
    - `/settings`

#### 页面层

- `src/pages/DashboardPage.vue`
  - 仪表盘页。
  - 由头部、统计卡片、库存表格三部分组成。

- `src/pages/AccountPage.vue`
  - 账号管理页。
  - 主要业务由 `AccountPanel.vue` 承担。

- `src/pages/SettingsPage.vue`
  - 设置页。
  - 当前主要展示本地设置项。

#### 组件层

- `src/components/sidebars/`
  - 负责整体布局与侧边导航。
  - `sidebarLayout.vue`：定义左侧栏与主内容区的双栏结构。
  - `sidebarContent.vue`：定义 Dashboard、Accounts、Settings 三个导航入口。

- `src/components/account/`
  - 当前前端最完整的一组业务组件。
  - `AccountPanel.vue`：账号页主容器，负责账号列表加载、搜索账号、绑定账号等核心流程。
  - `AccountSearchForm.vue`：封装 Steam ID 输入、搜索、确认绑定等交互。
  - `AccountList.vue`：展示已绑定账号列表。

- `src/components/main/`
  - 仪表盘展示组件。
  - `HeaderSection.vue`：顶部欢迎区与用户菜单。
  - `AnalyticsCards.vue`：统计卡片区。
  - `InventoryTable.vue`：库存表格区。

- `src/components/SettingsPanel.vue`
  - 设置面板组件。
  - 包含通知、外观、语言、时区等配置项。

- `src/components/AlertMessage.vue`
  - 通用提示组件，用于成功或错误消息反馈。

#### 工具层

- `src/utils/api.js`
  - 前端统一 Axios 实例。
  - 当前封装了以下接口调用：
    - `getAccount`
    - `searchAccount`
    - `bindAccount`

- `src/utils/debounce.js`
  - 通用防抖工具。

- `src/utils/sleep.js`
  - 通用等待工具。

#### 当前实现状态

前端目前属于“部分业务已接通、部分页面仍为演示态”的状态：

- 账号管理页已经与后端 API 打通，是当前最完整的业务闭环。
- 仪表盘中的统计卡片和库存表格仍然使用本地静态数据，尚未接入真实库存分析结果。
- 设置页目前只管理本地状态，没有持久化到后端。

### 3.3 backend：后端服务层

后端使用 `Express + SQLite`，负责提供 HTTP API，并从共享数据库中读取或写入数据。

#### 核心入口

- `server.js`
  - 加载配置与数据库连接。
  - 启动 Express 服务。
  - 在 `SIGINT` 时关闭 HTTP 服务和数据库连接。

- `app.js`
  - 初始化 Express 应用。
  - 注册中间件、路由、404 处理与统一错误处理。

- `config.js`
  - 加载 `.env` 环境变量。

- `database.js`
  - 连接 `../data/userVal.db`。
  - 初始化 `users` 表。

#### 路由层

- `routers/userRouter.js`
  - 用户相关接口：
    - `GET /api/v1/user/getAccount`
    - `GET /api/v1/user/searchAccount`
    - `POST /api/v1/user/bindAccount`

- `routers/inventoryRouter.js`
  - 库存相关接口：
    - `GET /api/v1/inventory/history`
    - `GET /api/v1/inventory/realTime`

#### 控制器层

- `controllers/userController.js`
  - 查询已绑定账号。
  - 调用 Steam China 接口搜索账号。
  - 处理账号绑定与重复绑定校验。

- `controllers/inventoryController.js`
  - 查询库存历史数据。
  - 提供基于 SSE 的实时库存推送。

- `controllers/errorController.js`
  - 统一处理开发环境与生产环境错误响应。
  - 对部分数据库错误做业务化包装。

#### 数据模型层

- `models/userModel.js`
  - 封装 `users` 表相关 SQL。
  - 包括查询已绑定账号、校验账号是否已存在、插入绑定记录。

- `models/inventoryModel.js`
  - 封装库存价格查询 SQL。
  - 当前主要查询某个 Steam 账号最新一批库存价格记录。

#### 工具层

- `utils/catchAsync.js`
  - 异步控制器包装器。

- `utils/catchSync.js`
  - 同步控制器包装器。

- `utils/appError.js`
  - 自定义业务错误类。

#### 文档层

- `docs/API.md`
  - 后端接口文档。

### 3.4 crawler：数据采集层

爬虫模块是一个独立的定时任务服务，用于持续生产库存与价格数据，并写入共享数据库。

#### 核心入口

- `start.js`
  - 爬虫服务入口。
  - 加载环境变量。
  - 启动定时任务。
  - 在检测到存在已绑定账号后，停止初始化检测任务，并转为正式采集任务。

- `database.js`
  - 连接 `../data/userVal.db`。
  - 初始化以下数据表：
    - `inventory`
    - `inventory_item_price`

- `model.js`
  - 封装爬虫使用的 SQL 操作。
  - 包括读取绑定账号、写入库存快照、读取最新库存、写入价格快照等。

#### 采集逻辑

- `crawls/inventory.js`
  - 根据绑定账号抓取 Steam 库存。
  - 将库存快照写入 `inventory` 表。

- `crawls/inventoryPrice.js`
  - 基于最新库存条目批量请求 C5Game 价格。
  - 将价格结果写入 `inventory_item_price` 表。

#### 调度机制

根据当前实现，爬虫的调度流程如下：

1. 服务启动后，每 5 秒检查一次数据库中是否已有绑定账号。
2. 一旦发现至少存在一个绑定账号：
   - 立即执行一次库存抓取。
   - 立即执行一次价格抓取。
3. 之后进入常规定时任务：
   - 库存抓取每 30 分钟执行一次。
   - 价格抓取每 5 分钟执行一次。

这说明爬虫模块以“账号绑定结果”为启动条件，是整个数据生产链路的核心执行者。

### 3.5 data：共享数据层

- `data/userVal.db`
  - 项目唯一的共享 SQLite 数据库文件。
  - 同时被 `backend` 与 `crawler` 访问。

当前数据库主要承载三类数据：

- 用户绑定信息
- 库存快照数据
- 饰品价格数据

## 4. 当前项目的数据流

当前项目已经形成一条比较清晰的业务链路：

1. 用户在前端账号页输入 Steam ID 并发起绑定。
2. 前端通过 `src/utils/api.js` 调用后端用户接口。
3. 后端将账号信息写入 `users` 表。
4. 爬虫检测到已绑定账号后开始定时任务。
5. 爬虫抓取 Steam 库存数据并写入 `inventory` 表。
6. 爬虫继续抓取第三方市场价格并写入 `inventory_item_price` 表。
7. 后端从 SQLite 中读取最新库存和价格结果。
8. 前端再通过 API 获取数据并展示。

这一结构本质上是一个典型的：

`前端交互层 -> 后端服务层 -> 定时采集层 -> 共享数据库层 -> 前端展示层`

## 5. 当前结构特点

从当前代码状态看，这个项目有几个比较明显的结构特征：

- 分层清晰
  - 前端、后端、爬虫、数据层职责分明，边界明确。

- 数据中心单一
  - `data/userVal.db` 是当前系统的统一数据中心，降低了模块间同步复杂度。

- 已形成核心业务闭环
  - “绑定账号 -> 采集库存 -> 采集价格 -> 后端查询 -> 前端展示” 这条主链路已经建立。

- 前端存在“业务页”和“演示页”并存的状态
  - 账号页是业务化程度最高的部分。
  - 仪表盘和设置页目前更偏 UI 原型，尚未完全数据驱动。

## 6. 建议的阅读顺序

如果是新成员第一次接触该仓库，建议按下面顺序理解项目：

1. `README.md`
   - 先理解项目目标和问题域。
2. `frontend/src/router/index.js`
   - 明确前端页面结构。
3. `frontend/src/components/account/`
   - 理解当前已完成的前端核心业务流。
4. `backend/app.js`、`backend/routers/`、`backend/controllers/`、`backend/models/`
   - 理解接口暴露方式和数据访问方式。
5. `crawler/start.js` 与 `crawler/crawls/`
   - 理解系统中的数据是如何被持续生产出来的。
6. `data/userVal.db`
   - 理解系统的共享存储角色。

## 7. 一句话总结

Metrics 当前是一个采用“前端展示 + 后端接口 + 定时爬虫 + 共享 SQLite 数据库”架构的库存分析项目，其中账号绑定是业务入口，定时采集是数据生产核心，SQLite 是整个系统的共享数据中心。
