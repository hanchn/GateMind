export type RiskLevel = 0 | 1 | 2 | 3 | 4;

export type ToolStatus = "active" | "draft" | "disabled";
export type PolicyEffect = "allow" | "confirm" | "approval_required" | "deny";
export type ApprovalStatus = "pending" | "approved" | "rejected" | "executed";
export type DomainHealth = "healthy" | "warning" | "degraded";
export type ConnectionStatus = "connected" | "pending" | "failed" | "disabled";
export type RequestStatus = "pending" | "approved" | "rejected";
export type GovernanceStatus = "managed" | "draft" | "restricted";
export type TokenStatus = "active" | "expiring" | "revoked";

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: "cyan" | "orange" | "red" | "violet";
}

export interface RiskDistributionItem {
  level: RiskLevel;
  count: number;
  label: string;
}

export interface HotTool {
  id: string;
  name: string;
  domain: string;
  usageCount: number;
  successRate: string;
}

export interface ToolSummary {
  id: string;
  name: string;
  domain: string;
  system: string;
  riskLevel: RiskLevel;
  status: ToolStatus;
  owner: string;
  updatedAt: string;
  description: string;
  exposureRule: string;
}

export interface PolicySummary {
  id: string;
  name: string;
  priority: number;
  scope: string;
  effect: PolicyEffect;
  enabled: boolean;
  approverFlow: string;
}

export interface ApprovalItem {
  id: string;
  title: string;
  requester: string;
  domain: string;
  riskLevel: RiskLevel;
  status: ApprovalStatus;
  createdAt: string;
  impactScope: string;
  rollbackPlan: string;
}

export interface AuditEvent {
  id: string;
  traceId: string;
  actor: string;
  toolName: string;
  domain: string;
  decision: string;
  createdAt: string;
  summary: string;
}

export interface DomainSummary {
  id: string;
  name: string;
  owner: string;
  toolCount: number;
  health: DomainHealth;
  providerStatus: string;
  description: string;
}

export interface ConnectionSummary {
  id: string;
  name: string;
  environment: string;
  driver: string;
  status: ConnectionStatus;
  owner: string;
  databaseCount: number;
  lastCheckedAt: string;
  requestSource: string;
}

export interface ConnectionRequest {
  id: string;
  name: string;
  driver: string;
  domain: string;
  requester: string;
  scope: string;
  reason: string;
  status: RequestStatus;
  createdAt: string;
}

export interface TableGovernanceItem {
  id: string;
  connectionName: string;
  databaseName: string;
  tableName: string;
  sensitivity: string;
  status: GovernanceStatus;
  owner: string;
  operationMode: string;
}

export interface PersonalToken {
  id: string;
  name: string;
  scope: string;
  expiresAt: string;
  lastUsedAt: string;
  status: TokenStatus;
  maskedValue: string;
}

export interface DashboardSummary {
  metrics: DashboardMetric[];
  risks: RiskDistributionItem[];
  pendingApprovals: ApprovalItem[];
  hotTools: HotTool[];
  auditEvents: AuditEvent[];
}
