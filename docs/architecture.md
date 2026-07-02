# GateMind MCP Gateway 架构设计

## 1. 设计目标

GateMind 不是单个系统的 MCP Server，而是企业级 Agent 工具治理与统一接入网关。

本项目第一阶段只做一个 Go 单体项目，但内部按模块拆分，确保后续可平滑演进为独立服务，而不是一开始就拆成分布式系统。

核心目标：

1. 提供统一 MCP Gateway 入口。
2. 建立工具目录（Tool Registry）与动态暴露机制。
3. 建立风险分级、权限校验、策略判断能力。
4. 建立确认 / 审批 / 执行分离机制。
5. 建立审计日志、回放、追踪基础能力。
6. 支持按业务域聚合企业系统，而不是按单个应用散乱接入。

## 2. 核心设计原则

### 2.1 单体优先，模块清晰

先做一个 Go 项目，内部做成“模块化单体”：

- 一个可部署单元
- 一个代码仓库
- 一套数据库
- 模块间只通过接口和应用服务交互

这样可以降低前期复杂度，同时避免后面变成互相直调的屎山。

### 2.2 先治理，后连接

项目优先级不是“接更多系统”，而是先把这些能力做对：

- 工具登记
- 风险分级
- 权限边界
- 审批机制
- 审计追踪
- 可回滚抽象

没有治理能力前，不允许高风险工具直连执行。

### 2.3 按业务能力建模，不按系统堆代码

不要按 `shopify/feishu/erp/wms` 粗暴堆模块。

应该按以下维度建模：

- 网关入口
- 工具目录
- 策略引擎
- 审批中心
- 审计中心
- 业务域 Provider

系统接入只是业务域内部的一种适配器实现。

### 2.4 执行链路强约束

所有工具调用必须经过统一链路：

`认证 -> 工具解析 -> 上下文装配 -> 策略判断 -> 确认/审批 -> 执行 -> 审计`

禁止绕开网关直接调用底层执行器。

### 2.5 高风险动作必须拆阶段

高风险工具不允许直接设计成“一步写入”，必须拆成：

1. `preview`
2. `create_change_request`
3. `approve`
4. `execute`

这样才能保证审批、审计、回滚、复核都能挂上去。

## 3. 总体架构

```text
Agent / AI Client
        |
        v
MCP Gateway API Layer
        |
        v
Gateway Orchestrator
        |
        +-------------------+
        |                   |
        v                   v
Tool Registry         Policy Engine
        |                   |
        +---------+---------+
                  |
                  v
          Approval Service
                  |
                  v
           Tool Executor Router
                  |
                  v
        Domain Providers / MCP Adapters
                  |
                  v
            Enterprise Systems

Sidecar Capability:
- Audit Log
- Replay Trace
- Masking / Redaction
- Metrics / Observability
```

## 4. 模块划分

### 4.1 API Gateway 模块

职责：

- 提供统一 HTTP / MCP 入口
- 解析 Agent 请求
- 做基础认证与请求追踪
- 调用应用层 Use Case

不负责：

- 直接写审批逻辑
- 直接写策略逻辑
- 直接拼接业务系统接口

### 4.2 Gateway Orchestrator 模块

职责：

- 编排一次完整工具调用流程
- 协调 Registry、Policy、Approval、Audit、Executor
- 统一沉淀执行状态与错误语义

这是系统的大脑，但只允许做编排，不允许塞大量业务细节。

### 4.3 Tool Registry 模块

职责：

- 维护工具元数据
- 管理工具版本
- 管理所属业务域 / 所属系统 / 负责人
- 定义输入输出 schema
- 标记只读 / 写入 / 批量 / 是否可回滚
- 标记风险等级、审批要求、暴露条件

这是治理基础，不是简单的工具列表。

### 4.4 Policy Engine 模块

职责：

- 结合用户身份、Agent 身份、场景、会话上下文、工具元数据做决策
- 输出 `allow / deny / confirm / approval_required / masked_allow`
- 注入脱敏规则、字段过滤规则、风险提示

策略判断结果必须结构化，不能靠零散 `if else` 到处写。

### 4.5 Approval 模块

职责：

- 创建变更单
- 管理审批状态机
- 记录审批意见
- 支持单人审批、多级审批、多人会签
- 审批通过后触发可执行状态

建议审批状态：

- `draft`
- `pending`
- `approved`
- `rejected`
- `expired`
- `executed`
- `rolled_back`

### 4.6 Audit 模块

职责：

- 记录谁发起、谁审批、调用什么工具、输入输出是什么
- 记录命中策略、脱敏情况、执行前后快照
- 支持 trace 查询与回放

审计模块只负责事实记录，不参与业务编排。

### 4.7 Executor Router 模块

职责：

- 根据工具定义找到对应业务域 Provider
- 负责调用前标准化参数
- 负责调用后统一结果结构
- 负责幂等键、超时、重试、熔断等执行控制

### 4.8 Domain Provider 模块

职责：

- 聚合业务域能力，而不是暴露单系统原子接口
- 屏蔽多个企业系统差异
- 对外输出稳定工具语义

示例业务域：

- 商品域
- 订单域
- 库存域
- 素材域
- 项目域
- 权限域

## 5. 推荐目录结构

```text
GateMind/
  cmd/
    gatemind/
      main.go
  internal/
    app/
      bootstrap/
      config/
      container/
    gateway/
      api/
      mcp/
      usecase/
      dto/
    registry/
      domain/
      service/
      repository/
    policy/
      domain/
      service/
      evaluator/
    approval/
      domain/
      service/
      repository/
    audit/
      domain/
      service/
      repository/
    executor/
      service/
      router/
    provider/
      product/
      inventory/
      project/
      shared/
    platform/
      auth/
      logging/
      tracing/
      persistence/
      cache/
  pkg/
    mcpkit/
    jsonx/
    clockx/
  configs/
    config.yaml
  docs/
    architecture.md
```

## 6. 依赖方向

必须遵守以下依赖规则：

```text
api -> usecase -> domain service -> repository interface
api -> usecase -> executor interface -> provider interface
platform -> repository implementation / infra implementation

禁止：
provider 反向依赖 gateway
approval 直接依赖 provider
policy 直接依赖具体数据库实现
api 层直接操作数据库
模块间跨目录互相读写内部结构体
```

一句话：

上层依赖抽象，下层实现抽象；模块之间通过接口说话，不通过“顺手 import 一下”说话。

## 7. 核心领域对象

### 7.1 ToolDefinition

```text
id
name
version
domain
system
owner
description
input_schema
output_schema
risk_level
mode(read/query/draft/write/batch/delete)
requires_confirmation
requires_approval
rollback_supported
exposure_rules
tags
status
```

### 7.2 AccessContext

```text
request_id
session_id
user_id
agent_id
tenant_id
roles
task_type
environment
tool_name
tool_version
input_payload
```

### 7.3 PolicyDecision

```text
decision(allow/deny/confirm/approval_required)
reason_codes
masked_fields
risk_level
approval_template
warnings
```

### 7.4 ChangeRequest

```text
id
tool_name
tool_version
requester
approvers
status
preview_payload
execution_payload
approval_record
expires_at
executed_at
rollback_token
```

### 7.5 AuditEvent

```text
id
trace_id
event_type
actor
tool
input_snapshot
output_snapshot
policy_snapshot
approval_snapshot
result
created_at
```

## 8. 关键调用链路

### 8.1 Level 0 / Level 1

只读或草稿类能力：

```text
invoke -> registry lookup -> policy evaluate -> allow
      -> executor -> audit record -> response
```

特点：

- 自动执行
- 必做权限校验
- 必做审计记录
- 命中脱敏策略时返回脱敏结果

### 8.2 Level 2

轻量写入：

```text
invoke -> policy evaluate -> confirm required
      -> user confirm
      -> execute
      -> audit
```

特点：

- 用户确认必选
- 不允许默默执行

### 8.3 Level 3 / Level 4

高风险变更：

```text
preview -> create change request -> approval flow
       -> revalidate -> execute -> audit -> rollback(if needed)
```

特点：

- 强制审批
- 执行前二次校验
- 必须保留变更单和审计链路
- Level 4 可配置为默认禁止直接执行

## 9. API 设计建议

第一阶段不要试图把所有接口都做成 MCP 协议原生接口。

建议分两层：

### 9.1 内部治理 API

用于后台和管理面：

- `POST /api/tools/register`
- `GET /api/tools`
- `POST /api/policy/evaluate`
- `POST /api/change-requests`
- `POST /api/change-requests/{id}/approve`
- `POST /api/change-requests/{id}/execute`
- `GET /api/audit/events`

### 9.2 Agent 调用入口

用于统一工具调用：

- `POST /api/gateway/invoke`
- `POST /api/gateway/preview`
- `POST /api/gateway/confirm`

后续如果要接入标准 MCP，可在 `gateway/mcp` 层把这些 Use Case 映射为 MCP Tools 暴露给 Agent。

## 10. 数据库建议

第一阶段建议单库，但采用“本地优先、线上可迁移”策略：

- 本地开发默认使用 `SQLite`
- 线上环境目标使用 `PostgreSQL`

这样设计的原因：

- 本地启动成本最低，不依赖额外数据库服务
- 适合先把 Registry / Policy / Approval / Audit 主链路跑通
- 后续迁移到线上数据库时，不需要重写 use case 和领域层
- 只要仓储接口、SQL 方言边界、迁移脚本规范提前收住，迁移成本可控

### 10.1 推荐方案

第一阶段：

- 数据库文件放在本地，例如 `./data/gatemind.db`
- 所有核心表先落在 SQLite
- 通过 migration 管理表结构，而不是手写散乱建表逻辑

第二阶段：

- 保持领域模型、仓储接口、应用服务不变
- 将 repository 实现从 SQLite 适配到 PostgreSQL
- 通过标准 migration 将表结构迁移到线上库

一句话：

先把“业务模型和仓储抽象”设计稳定，再替换数据库实现，而不是把 SQL 和业务逻辑绑死在一起。

核心表：

- `tool_definitions`
- `tool_versions`
- `policy_rules`
- `change_requests`
- `change_request_approvals`
- `audit_events`
- `execution_records`

原则：

- 工具定义和策略规则必须可持久化
- 审计日志必须可检索
- 批量高风险操作必须有独立执行记录
- 数据库类型不能泄漏到业务层

### 10.2 代码层约束

为保证后续可迁移，必须遵守以下约束：

- `domain` 层不感知 SQLite / PostgreSQL 差异
- `usecase/service` 层只依赖 repository interface
- `repository` 层按实现拆分，例如：
- `internal/.../repository/sqlite`
- `internal/.../repository/postgres`
- 公共查询对象、分页对象、事务接口放在抽象层
- 禁止在 handler 或 use case 中直接拼接数据库方言 SQL

### 10.3 表结构设计约束

因为未来要迁移到 PostgreSQL，第一阶段即使使用 SQLite，也不要乱用 SQLite 特有写法。

建议约束：

- 主键统一使用 `TEXT/UUID` 风格，不依赖数据库自增语义
- 时间字段统一使用应用层生成的 RFC3339 或 UTC 时间
- JSON 扩展字段统一按文本 JSON 存储，避免早期依赖某库特性
- 枚举值统一由应用层常量控制，不依赖数据库 enum 类型
- 软删除、状态机、审计字段提前统一命名

### 10.4 推荐迁移工具

Go 项目建议从第一天就接 migration 工具，例如：

- `golang-migrate`
- `goose`

要求：

- 所有 schema 变更必须走 migration
- 本地 SQLite 和线上 PostgreSQL 尽量共享同一套迁移语义
- 如果存在数据库方言差异，必须显式分文件管理，而不是埋在代码里

### 10.5 配置建议

建议配置结构从一开始就支持多数据库驱动：

```text
database:
  driver: sqlite
  dsn: ./data/gatemind.db
  max_open_conns: 1
  max_idle_conns: 1
```

未来迁移线上时，只替换为：

```text
database:
  driver: postgres
  dsn: postgres://user:pass@host:5432/gatemind?sslmode=disable
  max_open_conns: 20
  max_idle_conns: 10
```

### 10.6 迁移策略

推荐迁移顺序：

1. 本地先用 SQLite 把所有主链路做通。
2. 保证 repository 接口稳定。
3. 给 SQLite 和 PostgreSQL 各自补足 repository 实现。
4. 用同一批 migration 校验表结构一致性。
5. 在线上环境切 PostgreSQL，只切配置和基础设施实现。

### 10.7 当前结论

这项目最适合的起步方式不是一开始就上线上数据库，而是：

- 开发期：`SQLite`
- 生产期：`PostgreSQL`
- 架构前提：`Repository Interface + Migration + Driver-based Persistence`

这样既能满足你现在基于本地数据库启动，也能保证未来迁移线上时不返工业务代码。

## 11. 防屎山约束

这是本项目最重要的工程纪律。

### 11.1 禁止在 handler 里写业务

HTTP/MCP handler 只做：

- 参数解析
- 调用 use case
- 返回结果

### 11.2 禁止在模块间直接串库表

比如 `approval` 模块不能直接改 `audit` 表，必须通过 `audit` 服务接口写入。

### 11.3 禁止系统适配器泄漏到上层

例如 Shopify / ERP / Feishu SDK 类型，不能扩散到网关 use case 层。

上层只认统一 DTO 和领域对象。

### 11.4 禁止把策略散落到各处

风险判断、审批要求、字段脱敏、环境限制，必须统一进入 `policy` 模块。

### 11.5 禁止高风险一步直写

任何涉及：

- 金额
- 库存
- 权限
- 删除
- 批量修改
- 发布生产

都必须走 preview + change request。

### 11.6 禁止过早微服务化

第一阶段只做模块化单体。

先把边界画清楚，再决定是否拆服务。

## 12. 第一阶段 MVP 范围

建议只做三类能力，能快速验证架构是否成立：

### 12.1 Level 0

- `search_tools`
- `get_tool_detail`
- `query_inventory_snapshot`
- `get_project_status`

### 12.2 Level 1

- `generate_weekly_report_draft`
- `generate_product_copy_draft`

### 12.3 Level 2 / 3

- `update_tag_preview`
- `create_change_request`
- `approve_change_request`
- `execute_change_request`

先不做：

- 真正的多系统复杂编排
- 大规模规则引擎
- 多租户隔离细节
- 完整 UI 管理后台

## 13. 第二阶段演进方向

当单体项目稳定后，再考虑拆分：

1. 将审批中心拆成独立服务。
2. 将审计中心拆成独立日志服务。
3. 将业务域 Provider 拆成独立 MCP Server。
4. 引入消息队列处理异步审批与回放。
5. 引入策略 DSL 或规则配置中心。

前提是：

先有清晰边界，再做服务拆分。

## 14. 推荐落地顺序

1. 先搭模块化单体骨架。
2. 先做 Tool Registry。
3. 再做 Policy Engine。
4. 再做 invoke / preview / change request 主链路。
5. 最后接 1 到 2 个业务域 Provider 做演示。

## 15. 一句话结论

这个项目最合理的起步方案，不是“做一堆 Go 包连接一堆系统”，而是：

做一个 **Go 模块化单体的企业 MCP Gateway**，以 **Registry + Policy + Approval + Audit + Provider Router** 为核心骨架，让所有 Agent 调用都走统一治理链路。
