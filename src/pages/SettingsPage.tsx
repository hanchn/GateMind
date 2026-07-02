import { PageHeader } from "@/components/shell/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="公共设置" />
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="默认请求频率"
          action={<HelpTooltip content="通用连接频率示例：1 分钟最多请求 60 次，用于控制单连接级别的总体负载。" />}
        >
          <div>
            <label className="block text-sm text-ink-muted">
              每分钟请求上限
              <input
                type="number"
                min="1"
                defaultValue="60"
                className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
              />
            </label>
          </div>
        </SectionCard>
        <SectionCard
          title="默认数据量请求设置"
          action={
            <HelpTooltip content="用于约束默认返回条数、分页上限和最大导出量，避免 AI 一次性请求过大数据集。" />
          }
        >
          <div className="grid gap-4">
            <label className="block text-sm text-ink-muted">
              默认返回条数
              <input
                type="number"
                min="1"
                defaultValue="50"
                className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
              />
            </label>
            <label className="block text-sm text-ink-muted">
              分页上限
              <input
                type="number"
                min="1"
                defaultValue="500"
                className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
              />
            </label>
            <label className="block text-sm text-ink-muted">
              最大导出量
              <input
                type="number"
                min="1"
                defaultValue="1000"
                className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
              />
            </label>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
