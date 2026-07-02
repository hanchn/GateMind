import { useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
import { createPersonalToken } from "@/services/tokenService";

function formatDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function TokenCreatePanel() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(() => formatDateInput(new Date()));
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return formatDateInput(date);
  });
  const [message, setMessage] = useState("");

  return (
    <SectionCard title="创建个人 Token" action={<HelpTooltip content="Token 不自动续期，到期后立即失效。" />}>
      <div className="space-y-4">
        <label className="block text-sm text-ink-muted">
          Token 名称
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：CLI 本地调试"
            className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          <span className="flex items-center gap-2">
            <span>Token 有效期</span>
            <HelpTooltip content="可直接选择起止日期，到期后立即失效，不自动续期。" />
          </span>
          <div className="mt-2 grid gap-3 md:grid-cols-2">
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
            />
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
            />
          </div>
        </label>
        <button
          className="w-full rounded-2xl border border-[#91caff] bg-[#e6f4ff] px-4 py-3 text-sm text-[#1677ff] transition hover:bg-[#d6ebff]"
          onClick={async () => {
            if (!startDate || !endDate || endDate < startDate) {
              setMessage("请先选择有效的起止日期");
              return;
            }
            const created = await createPersonalToken({
              name: name || "未命名 Token",
              scope: "工具查询、审计查看",
              expiresAt: `${startDate} 至 ${endDate}`,
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
