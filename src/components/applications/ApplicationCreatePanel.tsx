import { useState } from "react";
import { App, Button } from "antd";

import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
import { createApplication } from "@/services/applicationService";
import type { ApplicationCredential } from "@/types";

interface ApplicationCreatePanelProps {
  onCreated?: (application: ApplicationCredential) => void;
}

export function ApplicationCreatePanel({ onCreated }: ApplicationCreatePanelProps) {
  const { message } = App.useApp();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [integrationDoc, setIntegrationDoc] = useState("");
  const [domain, setDomain] = useState("治理域");
  const [owner, setOwner] = useState("yuanjing");
  const [createdApplication, setCreatedApplication] = useState<ApplicationCredential | null>(null);

  return (
    <SectionCard title="创建应用" action={<HelpTooltip content="创建后立即生成应用 ID 和应用秘钥，用于后续接入和发布。" />}>
      <div className="space-y-4">
        {createdApplication ? (
          <div className="rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">应用 ID</p>
                <p className="mt-2 break-all font-semibold text-ink">{createdApplication.appId}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">应用秘钥</p>
                <p className="mt-2 break-all font-semibold text-ink">{createdApplication.appSecret}</p>
              </div>
            </div>
          </div>
        ) : null}
        <label className="block text-sm text-ink-muted">
          应用名称
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：项目进度查询应用"
            className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          应用描述
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            placeholder="例如：用于统一查询项目进度和关键节点状态。"
            className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          接入文档
          <input
            value={integrationDoc}
            onChange={(event) => setIntegrationDoc(event.target.value)}
            placeholder="例如：项目里程碑助手接入文档"
            className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          所属业务域
          <input
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            placeholder="例如：治理域"
            className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          负责人
          <input
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
            placeholder="例如：yuanjing"
            className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <Button
          block
          onClick={async () => {
            if (!name.trim()) {
              message.warning("请先填写应用名称");
              return;
            }

            const created = await createApplication({
              name: name.trim(),
              description: description.trim() || `${name.trim()} 的默认应用描述`,
              integrationDoc: integrationDoc.trim() || `${name.trim()} 接入文档`,
              domain: domain.trim() || "治理域",
              owner: owner.trim() || "yuanjing",
            });

            setCreatedApplication(created);
            onCreated?.(created);
            message.success("已创建应用");
          }}
        >
          创建应用
        </Button>
      </div>
    </SectionCard>
  );
}
