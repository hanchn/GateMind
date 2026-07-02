import { useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";

export function ConnectionRequestForm() {
  const [name, setName] = useState("");
  const [scope, setScope] = useState("只读");

  return (
    <SectionCard title="创建功能" eyebrow="Create Capability">
      <div className="space-y-4">
        <label className="block text-sm text-ink-muted">
          功能名称
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：查询项目里程碑状态"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          执行范围
          <select
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          >
            <option>只读</option>
            <option>只读 + 元数据</option>
            <option>读写申请</option>
          </select>
        </label>
        <label className="block text-sm text-ink-muted">
          功能说明
          <textarea
            rows={4}
            placeholder="描述这个功能基于哪个连接、哪个库表，以及它服务哪个业务域。"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <button className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20">
          提交功能创建
        </button>
      </div>
    </SectionCard>
  );
}
