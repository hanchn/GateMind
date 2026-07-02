import { Shield, Boxes, SlidersHorizontal, ClipboardCheck, ScrollText, Orbit, PlugZap, FileInput, TableProperties, KeyRound, Settings } from "lucide-react";
import { Card, Menu, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/", label: "控制台", icon: Shield },
  { to: "/tools", label: "工具目录", icon: Boxes },
  { to: "/policies", label: "策略规则", icon: SlidersHorizontal },
  { to: "/approvals", label: "变更审批", icon: ClipboardCheck },
  { to: "/audit", label: "审计日志", icon: ScrollText },
  { to: "/domains", label: "业务域", icon: Orbit },
  { to: "/connections", label: "数据连接", icon: PlugZap },
  { to: "/connection-requests", label: "应用发布", icon: FileInput },
  { to: "/tables", label: "库表治理", icon: TableProperties },
  { to: "/settings", label: "公共设置", icon: Settings },
  { to: "/tokens", label: "个人 Token", icon: KeyRound },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden w-72 shrink-0 py-4 lg:block">
      <Card className="rounded-[28px] border border-[#e6ebf5] shadow-[0_16px_40px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 20 } }}>
        <Typography.Text className="!text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[#1677ff]">GateMind</Typography.Text>
        <Typography.Title level={3} className="!mt-3 !mb-2 !font-[Manrope] !text-[#0f172a]">
          企业 AI 治理指挥舱
        </Typography.Title>

        <Menu
          className="mt-6 border-0"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={navItems.map((item) => {
            const Icon = item.icon;
            return {
              key: item.to,
              icon: <Icon className="h-4 w-4" />,
              label: item.label,
            };
          })}
        />
      </Card>
    </aside>
  );
}
