import { useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ApplicationCredential } from "@/types";

interface ApplicationTableProps {
  items: ApplicationCredential[];
}

export function ApplicationTable({ items }: ApplicationTableProps) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<ApplicationCredential | null>(null);
  const [docItem, setDocItem] = useState<ApplicationCredential | null>(null);

  return (
    <>
      <div className="grid max-h-[620px] gap-4 overflow-auto pr-1 xl:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[#e6ebf5] bg-[#f8fafc] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-ink">{item.name}</p>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{item.description}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">更新时间</p>
                <p className="mt-2 text-ink">{item.updatedAt}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Button
                onClick={() => {
                  setDocItem(item);
                }}
              >
                接入文档
              </Button>
              <Button
                onClick={() => {
                  setActiveItem(item);
                }}
              >
                查看
              </Button>
              <Button
                onClick={() => {
                  navigate(`/application-list/${item.id}/edit`);
                }}
              >
                编辑
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title={docItem ? `${docItem.name} 接入信息` : "接入信息"}
        open={Boolean(docItem)}
        onCancel={() => setDocItem(null)}
        footer={[
          <Button key="close" onClick={() => setDocItem(null)}>
            关闭
          </Button>,
        ]}
      >
        {docItem ? (
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">接入文档</p>
              <p className="mt-2 font-semibold text-ink">{docItem.integrationDoc}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">接入说明</p>
              <p className="mt-2 leading-7 text-ink">
                使用应用 ID 和应用秘钥完成接入认证，接入前请先阅读对应文档说明，并按文档完成鉴权与回调配置。
              </p>
            </div>
            <div className="border border-[#e6ebf5] bg-[#f8fafc] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">应用 ID</p>
              <p className="mt-2 break-all font-semibold text-ink">{docItem.appId}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.24em] text-ink-muted">应用秘钥</p>
              <p className="mt-2 break-all font-semibold text-ink">{docItem.appSecret}</p>
            </div>
          </div>
        ) : null}
      </Modal>
      <Modal
        title={activeItem ? `${activeItem.name} 应用详情` : "应用详情"}
        open={Boolean(activeItem)}
        onCancel={() => setActiveItem(null)}
        footer={[
          <Button key="close" onClick={() => setActiveItem(null)}>
            关闭
          </Button>,
        ]}
      >
        {activeItem ? (
          <div className="space-y-4">
            <div className="space-y-1 text-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">应用名称</p>
              <p className="text-ink">{activeItem.name}</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">应用描述</p>
              <p className="text-ink">{activeItem.description}</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">接入文档</p>
              <p className="text-ink">{activeItem.integrationDoc}</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">业务域</p>
              <p className="text-ink">{activeItem.domain}</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">负责人</p>
              <p className="text-ink">{activeItem.owner}</p>
            </div>
            <div className="border border-[#e6ebf5] bg-[#f8fafc] p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">应用 ID</p>
              <p className="mt-2 break-all font-semibold text-ink">{activeItem.appId}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.24em] text-ink-muted">应用秘钥</p>
              <p className="mt-2 break-all font-semibold text-ink">{activeItem.appSecret}</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
