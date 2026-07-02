import { useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";

export function ConnectionRequestForm() {
  const [name, setName] = useState("");
  const [scope, setScope] = useState("只读");

  return (
    <SectionCard title="创建连接申请" eyebrow="Request Access">
      <div className="space-y-4">
        <label className="block text-sm text-ink-muted">
          连接名称
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：project-postgres-shadow"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          权限范围
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
          用途说明
          <textarea
            rows={4}
            placeholder="描述为什么需要接入该数据库连接，以及服务哪个业务域。"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <button className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20">
          提交连接申请
        </button>
      </div>
    </SectionCard>
  );
}
