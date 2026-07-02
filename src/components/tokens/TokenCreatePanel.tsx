import { useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";
import { createPersonalToken } from "@/services/tokenService";

export function TokenCreatePanel() {
  const [name, setName] = useState("");
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
          独立请求频率设置
          <input
            defaultValue="1 分钟最多请求 60 次"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          默认数据量请求设置
          <input
            defaultValue="默认 50 行，最大 500 行"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <button
          className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
          onClick={async () => {
            const created = await createPersonalToken({
              name: name || "未命名 Token",
              scope: "工具查询、审计查看",
              expiresAt: "2026-08-01",
              requestRateLimit: "1 分钟最多请求 60 次",
              dataWindow: "默认 50 行，最大 500 行",
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
