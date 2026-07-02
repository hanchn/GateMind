import { useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";
import { createPersonalToken } from "@/services/tokenService";

export function TokenCreatePanel() {
  const [name, setName] = useState("");
  const [ttl, setTtl] = useState("30 天");
  const [message, setMessage] = useState("");

  return (
    <SectionCard title="创建个人 Token" eyebrow="Personal Access Token">
      <div className="space-y-4">
        <label className="block text-sm text-ink-muted">
          Token 名称
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：CLI 本地调试"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          Token 有效期
          <select
            value={ttl}
            onChange={(event) => setTtl(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          >
            <option>1 天</option>
            <option>7 天</option>
            <option>30 天</option>
            <option>90 天</option>
            <option>180 天</option>
            <option>1 年</option>
          </select>
        </label>
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-6 text-ink-muted">
          Token 不自动续期，达到有效期后立即失效。
        </p>
        <button
          className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
          onClick={async () => {
            const created = await createPersonalToken({
              name: name || "未命名 Token",
              scope: "工具查询、审计查看",
              expiresAt: ttl,
            });
            setMessage(`已创建 ${created.maskedValue}`);
          }}
        >
          创建 Token
        </button>
        {message && <p className="text-sm text-cyan-200">{message}</p>}
      </div>
    </SectionCard>
  );
}
