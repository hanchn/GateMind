import { CopyOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { App, Button, Input, Modal, Space, Tooltip } from "antd";

import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { PersonalToken } from "@/types";

interface TokenTableProps {
  items: PersonalToken[];
}

export function TokenTable({ items }: TokenTableProps) {
  const { message } = App.useApp();
  const [previewToken, setPreviewToken] = useState<PersonalToken | null>(null);

  async function handleCopy(token: PersonalToken) {
    await navigator.clipboard.writeText(token.value);
    message.success("已复制完整 Token");
  }

  return (
    <>
      <DataTable
        rowKey={(item) => item.id}
        rows={items}
        columns={[
          {
            key: "name",
            title: "Token 名称",
            render: (item) => (
              <div>
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="mt-1 text-xs text-[#64748b]">{item.maskedValue}</p>
              </div>
            ),
          },
          { key: "scope", title: "作用范围", render: (item) => item.scope },
          { key: "expiresAt", title: "过期时间", render: (item) => item.expiresAt },
          { key: "status", title: "状态", render: (item) => <StatusBadge status={item.status} /> },
          {
            key: "actions",
            title: "操作",
            render: (item) => (
              <Space size={4}>
                <Tooltip title="查看完整 Token">
                  <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={(event) => {
                      event.stopPropagation();
                      setPreviewToken(item);
                    }}
                  />
                </Tooltip>
                <Tooltip title="复制完整 Token">
                  <Button
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={async (event) => {
                      event.stopPropagation();
                      await handleCopy(item);
                    }}
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
      />
      <Modal
        title={previewToken ? `${previewToken.name} - 完整 Token` : "完整 Token"}
        open={Boolean(previewToken)}
        onCancel={() => setPreviewToken(null)}
        footer={[
          <Button key="close" onClick={() => setPreviewToken(null)}>
            关闭
          </Button>,
          <Button
            key="copy"
            type="primary"
            onClick={async () => {
              if (!previewToken) {
                return;
              }
              await handleCopy(previewToken);
            }}
          >
            复制
          </Button>,
        ]}
      >
        <p className="mb-3 text-sm text-ink-muted">Token 默认包含时间戳和当前用户标识。</p>
        <Input.TextArea value={previewToken?.value} autoSize={{ minRows: 3, maxRows: 6 }} readOnly />
      </Modal>
    </>
  );
}
