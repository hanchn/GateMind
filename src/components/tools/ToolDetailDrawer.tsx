import { RiskBadge } from "@/components/ui/RiskBadge";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ToolSummary } from "@/types";

interface ToolDetailDrawerProps {
  tool?: ToolSummary;
}

export function ToolDetailDrawer({ tool }: ToolDetailDrawerProps) {
  if (!tool) {
    return (
      <SectionCard title="工具详情" eyebrow="Detail Drawer" className="h-full">
        <p className="text-sm leading-7 text-ink-muted">选择左侧工具后，这里会展示风险信息、暴露规则和治理摘要。</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title={tool.name} eyebrow="Tool Detail" className="h-full">
      <div className="space-y-5 text-sm text-ink-muted">
        <div className="flex flex-wrap items-center gap-3">
          <RiskBadge level={tool.riskLevel} />
          <StatusBadge status={tool.status} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">工具描述</p>
          <p className="mt-2 leading-7 text-ink">{tool.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">业务域</p>
            <p className="mt-2 text-ink">{tool.domain}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">系统来源</p>
            <p className="mt-2 text-ink">{tool.system}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">负责人</p>
            <p className="mt-2 text-ink">{tool.owner}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em]">最近更新</p>
            <p className="mt-2 text-ink">{tool.updatedAt}</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em]">暴露规则</p>
          <p className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 leading-7 text-ink">
            {tool.exposureRule}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
