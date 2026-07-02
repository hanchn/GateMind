import { SectionCard } from "@/components/ui/SectionCard";

export function TableGovernancePanel() {
  return (
    <SectionCard title="治理规则摘要" eyebrow="Governance Notes">
      <div className="space-y-4 text-sm leading-7 text-ink-muted">
        <p>库表治理页面不是直接裸露数据库操作，而是纳管入口。</p>
        <p>可在这里配置敏感字段标记、默认返回条数、最大导出量，以及新增删除动作是否允许 AI 触发。</p>
        <p>高风险表默认进入 restricted，只有审批通过后才允许生成相关工具或开放写入。</p>
      </div>
    </SectionCard>
  );
}
