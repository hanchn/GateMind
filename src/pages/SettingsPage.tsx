import { PageHeader } from "@/components/shell/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Global Controls"
        title="公共设置"
        description="统一维护系统默认请求频率和默认数据量请求设置。"
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="默认请求频率">
          <div className="space-y-3">
            <label className="block text-sm text-ink-muted">
              默认频率限制
              <input
                defaultValue="1 分钟最多请求 60 次"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
              />
            </label>
            <p className="text-xs leading-6 text-ink-muted">
              作为系统公共默认值，未单独配置时按该频率限制执行。
            </p>
          </div>
        </SectionCard>
        <SectionCard title="默认数据量请求设置">
          <div className="space-y-3">
            <label className="block text-sm text-ink-muted">
              默认数据窗口
              <input
                defaultValue="默认 50 行，最大 500 行"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
              />
            </label>
            <p className="text-xs leading-6 text-ink-muted">
              统一约束默认返回条数、分页上限和最大导出量，避免一次请求过大。
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
