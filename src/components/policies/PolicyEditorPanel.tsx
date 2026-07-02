import { SectionCard } from "@/components/ui/SectionCard";

export function PolicyEditorPanel() {
  return (
    <SectionCard title="策略设计原则" eyebrow="Policy Notes" className="h-full">
      <div className="space-y-4 text-sm leading-7 text-ink-muted">
        <p>所有风险判断统一收口到策略引擎，禁止在页面或业务组件中散落条件判断。</p>
        <p>轻量写入默认走确认流程，高风险变更必须绑定审批模板并保留回滚方案。</p>
        <p>字段脱敏、角色限制、业务域范围和执行效果都应结构化呈现，便于后续接入 Go 后端策略 API。</p>
      </div>
    </SectionCard>
  );
}
