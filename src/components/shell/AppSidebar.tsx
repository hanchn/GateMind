import { Shield, Boxes, SlidersHorizontal, ClipboardCheck, ScrollText, Orbit, PlugZap, FileInput, TableProperties, KeyRound } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "控制台", icon: Shield },
  { to: "/tools", label: "工具目录", icon: Boxes },
  { to: "/policies", label: "策略规则", icon: SlidersHorizontal },
  { to: "/approvals", label: "变更审批", icon: ClipboardCheck },
  { to: "/audit", label: "审计日志", icon: ScrollText },
  { to: "/domains", label: "业务域", icon: Orbit },
  { to: "/connections", label: "数据连接", icon: PlugZap },
  { to: "/connection-requests", label: "连接申请", icon: FileInput },
  { to: "/tables", label: "库表治理", icon: TableProperties },
  { to: "/tokens", label: "个人 Token", icon: KeyRound },
];

export function AppSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-black/20 px-5 py-6 lg:block">
      <div className="rounded-3xl border border-white/10 bg-panel px-5 py-6 shadow-panel">
        <p className="text-xs uppercase tracking-[0.36em] text-cyan-200/70">GateMind</p>
        <h1 className="mt-3 font-display text-3xl text-ink">企业 AI 治理指挥舱</h1>
        <p className="mt-3 text-sm leading-6 text-ink-muted">
          统一管理工具目录、风险策略、审批链路与审计追踪。
        </p>
      </div>

      <nav className="mt-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition duration-200",
                  isActive
                    ? "border-cyan-400/30 bg-cyan-500/10 text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                    : "border-white/5 bg-white/[0.03] text-ink-muted hover:border-white/10 hover:bg-white/[0.06] hover:text-ink",
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
