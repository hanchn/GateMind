import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";

import { AppSidebar } from "@/components/shell/AppSidebar";
import { TopStatusBar } from "@/components/shell/TopStatusBar";
import { ApprovalsPage } from "@/pages/ApprovalsPage";
import { AuditPage } from "@/pages/AuditPage";
import { ConnectionRequestsPage } from "@/pages/ConnectionRequestsPage";
import { ConnectionsPage } from "@/pages/ConnectionsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { DomainsPage } from "@/pages/DomainsPage";
import { PoliciesPage } from "@/pages/PoliciesPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { TablesPage } from "@/pages/TablesPage";
import { TokensPage } from "@/pages/TokensPage";
import { ToolsPage } from "@/pages/ToolsPage";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-ink">
      <div className="mx-auto flex min-h-screen max-w-[1680px] px-4 py-4 lg:px-6">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col gap-6 lg:pl-6">
          <TopStatusBar />
          <main className="flex-1 overflow-hidden rounded-[28px] border border-[#e6ebf5] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 18,
          colorPrimary: "#1677ff",
          colorBgLayout: "#f5f7fb",
          colorBgContainer: "#ffffff",
          colorText: "#0f172a",
          colorTextSecondary: "#64748b",
          colorBorderSecondary: "#e5e7eb",
          fontFamily: '"Manrope", "Noto Sans SC", sans-serif',
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="/approvals" element={<ApprovalsPage />} />
              <Route path="/audit" element={<AuditPage />} />
              <Route path="/domains" element={<DomainsPage />} />
              <Route path="/connections" element={<ConnectionsPage />} />
              <Route path="/connection-requests" element={<ConnectionRequestsPage />} />
              <Route path="/tables" element={<TablesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/tokens" element={<TokensPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}
