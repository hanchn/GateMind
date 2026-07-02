import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Input, Space, Typography } from "antd";

import { useShellStore } from "@/store/useShellStore";

export function TopStatusBar() {
  const search = useShellStore((state) => state.search);
  const setSearch = useShellStore((state) => state.setSearch);

  return (
    <Card
      className="border border-[#e6ebf5] shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
      styles={{ body: { padding: 20 } }}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Typography.Text className="!text-xs !font-semibold !uppercase !tracking-[0.28em] !text-[#94a3b8]">
            Production Governance
          </Typography.Text>
          <Typography.Paragraph className="!mt-2 !mb-0 !text-sm !text-[#334155]">
            当前环境：Local SQLite / Mock Gateway
          </Typography.Paragraph>
        </div>

        <Space size={12} wrap>
          <Input
            allowClear
            prefix={<SearchOutlined className="text-[#94a3b8]" />}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="搜索工具、策略、Trace"
            className="w-full md:w-72"
          />
          <Badge count={12} size="small">
            <Button icon={<BellOutlined />}>风控提醒</Button>
          </Badge>
        </Space>
      </div>
    </Card>
  );
}
