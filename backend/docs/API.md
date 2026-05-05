# API 接口文档

## 概述

本文档描述了 Metrics 后端服务提供的所有 API 接口。

**基础URL**: `http://localhost:9280/api/v1`

## 目录

- [用户模块](#用户模块)
  - [获取已绑定账号列表](#获取已绑定账号列表)
  - [搜索Steam账号](#搜索steam账号)
  - [绑定Steam账号](#绑定steam账号)
- [库存模块](#库存模块)
  - [获取历史库存](#获取历史库存)
  - [获取实时库存 (SSE)](#获取实时库存-sse)

---

## 用户模块

基础路径: `/api/v1/user`

### 获取已绑定账号列表

获取所有已绑定的 Steam 账号信息。

- **URL**: `/api/v1/user/getAccount`
- **Method**: `GET`
- **参数**: 无

**响应示例**:

```json
{
  "status": "success",
  "message": {
    "accounts": [
      {
        "steam_id": "76561198xxxxxxxx",
        "account_id": "xxxxxxxx",
        "persona_name": "用户名",
        "avatar_url": "头像URL"
      }
    ]
  }
}
```

---

### 搜索Steam账号

通过 Steam ID 搜索账号信息。

- **URL**: `/api/v1/user/searchAccount`
- **Method**: `GET`
- **参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| steam_id | string | 是 | Steam ID |

**请求示例**:
```
GET /api/v1/user/searchAccount?steam_id=76561198xxxxxxxx
```

**响应示例**:

```json
{
  "status": "success",
  "message": [
    {
      "steamid": "76561198xxxxxxxx",
      "personaname": "用户名",
      "avatar": "头像hash"
    }
  ]
}
```

---

### 绑定Steam账号

绑定一个新的 Steam 账号到系统。

- **URL**: `/api/v1/user/bindAccount`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| steam_id | string | 是 | Steam ID |
| account_id | string/number | 是 | 账号ID |
| persona_name | string | 是 | 用户昵称 |
| avatar_url | string | 是 | 头像URL |

**请求体示例**:

```json
{
  "steam_id": "76561198xxxxxxxx",
  "account_id": "xxxxxxxx",
  "persona_name": "用户名",
  "avatar_url": "https://..."
}
```

**响应示例**:

```json
{
  "status": "success",
  "message": {
    "changes": 1
  }
}
```

---

## 库存模块

基础路径: `/api/v1/inventory`

### 获取历史库存

获取指定 Steam 账号的历史库存数据。

- **URL**: `/api/v1/inventory/history`
- **Method**: `GET`
- **参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| steamId | string | 是 | Steam ID |

**请求示例**:
```
GET /api/v1/inventory/history?steamId=76561198xxxxxxxx
```

**响应示例**:

```json
{
  "status": "success",
  "data": [
    {
      "item_name": "物品名称",
      "quantity": 10,
      "timestamp": "2024-01-01 00:00:00"
    }
  ]
}
```

---

### 获取实时库存 (SSE)

通过 Server-Sent Events (SSE) 实时推送库存数据。

- **URL**: `/api/v1/inventory/realTime`
- **Method**: `GET`
- **参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| steamId | string | 是 | Steam ID |

**请求示例**:
```
GET /api/v1/inventory/realTime?steamId=76561198xxxxxxxx
```

**响应说明**:

此接口使用 SSE (Server-Sent Events) 技术，服务器会每 5 秒推送一次库存数据。

**响应头**:
```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

**数据格式**:
```
data: [{"item_name":"物品名称","quantity":10,"timestamp":"2024-01-01 00:00:00"}]
```

**前端使用示例**:

```javascript
const eventSource = new EventSource('/api/v1/inventory/realTime?steamId=xxx');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('实时库存:', data);
};

eventSource.onerror = (error) => {
  console.error('SSE连接错误:', error);
  eventSource.close();
};
```

---

## 错误响应

当请求失败时，API 会返回错误响应：

```json
{
  "status": "error",
  "message": "错误描述信息"
}
```

**常见HTTP状态码**:

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 技术栈

- **语言**: Python 3.13
- **框架**: FastAPI
- **数据库**: SQLite (标准库 sqlite3)
- **HTTP客户端**: httpx
- **包管理**: uv

---

## 更新日志

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-04-18 | 1.0.0 | 初始版本 |
