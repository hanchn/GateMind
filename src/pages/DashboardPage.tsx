import { useEffect, useState } from "react";

import { MetricCard } from "@/components/dashboard/MetricCard";
import { PendingApprovalList } from "@/components/dashboard/PendingApprovalList";
import { RiskDistributionPanel } from "@/components/dashboard/RiskDistributionPanel";
import { ToolHeatmapPanel } from "@/components/dashboard/ToolHeatmapPanel";
import { PageHeader } from "@/components/shell/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { getDashboardSummary } from "@/services/dashboardService";
import type { DashboardSummary } from "@/types";

export function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    getDashboardSummary().then(setData);
  }, []);

  if (!data) {
    return <div className="h-full animate-pulse rounded-3xl bg-white/5" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance Console"
        title="企业 MCP 治理总览"
        description="用统一视图查看 GateMind 当前的工具活跃度、风险分布、待审批变更和关键审计事件。"
      />

      <div className="grid gap-4 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <RiskDistributionPanel items={data.risks} />
        <PendingApprovalList items={data.pendingApprovals} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <ToolHeatmapPanel items={data.hotTools} />
        <SectionCard title="最近审计事件" eyebrow="Recent Audit">
          <div className="space-y-4">
            {data.auditEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-ink">{event.toolName}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">{event.createdAt}</p>
                </div>
                <p className="mt-2 text-sm text-cyan-200">{event.traceId}</p>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{event.summary}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
