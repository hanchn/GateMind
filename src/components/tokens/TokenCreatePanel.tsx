import { useState } from "react";
import { Button } from "antd";

import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
import { createPersonalToken } from "@/services/tokenService";
import type { PersonalToken } from "@/types";

function formatDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

interface TokenCreatePanelProps {
  onCreated?: (token: PersonalToken) => void;
}

export function TokenCreatePanel({ onCreated }: TokenCreatePanelProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(() => formatDateInput(new Date()));
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return formatDateInput(date);
  });
  const [message, setMessage] = useState("");

  return (
    <SectionCard action={<HelpTooltip content="Token 不自动续期，到期后立即失效。" />}>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-ink">新建 Token</p>
          <p className="mt-1 text-sm text-ink-muted">创建后可在右侧历史列表查看完整值并复制。</p>
        </div>
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
        <Button
          block
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
            onCreated?.(created);
            setMessage(`已创建 ${created.maskedValue}`);
            setName("");
          }}
        >
          创建 Token
        </Button>
        {message && <p className="text-sm text-[#1677ff]">{message}</p>}
      </div>
    </SectionCard>
  );
}
