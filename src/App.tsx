import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";

import { AppSidebar } from "@/components/shell/AppSidebar";
import { TopStatusBar } from "@/components/shell/TopStatusBar";
import { ApplicationListPage } from "@/pages/ApplicationListPage";
import { ApplicationEditPage } from "@/pages/ApplicationEditPage";
import { ApplicationsPage } from "@/pages/ApplicationsPage";
import { ApprovalsPage } from "@/pages/ApprovalsPage";
import { AuditPage } from "@/pages/AuditPage";
import { ConnectionRequestsPage } from "@/pages/ConnectionRequestsPage";
import { ConnectionsPage } from "@/pages/ConnectionsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { DomainsPage } from "@/pages/DomainsPage";
import { PoliciesPage } from "@/pages/PoliciesPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { TableChildrenPage } from "@/pages/TableChildrenPage";
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
          <main className="flex-1 overflow-hidden border border-[#e6ebf5] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] lg:p-8">
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
          borderRadius: 0,
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
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/application-list" element={<ApplicationListPage />} />
              <Route path="/application-list/:applicationId/edit" element={<ApplicationEditPage />} />
              <Route path="/connection-requests" element={<ConnectionRequestsPage />} />
              <Route path="/tables" element={<TablesPage />} />
              <Route path="/tables/children" element={<TableChildrenPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/tokens" element={<TokensPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}
