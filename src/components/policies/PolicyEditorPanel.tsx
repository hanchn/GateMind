import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";

export function PolicyEditorPanel() {
  return (
    <SectionCard
      title="策略设计"
      action={
        <HelpTooltip content="风险判断统一收口到策略引擎；高风险变更必须绑定审批模板并保留回滚方案。" />
      }
      className="h-full"
    >
      <div className="space-y-3 text-sm text-ink-muted">
        <p>统一维护放行、确认、审批、阻断和脱敏规则。</p>
        <p>策略结果保持结构化，便于后端策略 API 对接。</p>
      </div>
    </SectionCard>
  );
}
