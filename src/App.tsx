import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { AppSidebar } from "@/components/shell/AppSidebar";
import { TopStatusBar } from "@/components/shell/TopStatusBar";
import { ApprovalsPage } from "@/pages/ApprovalsPage";
import { AuditPage } from "@/pages/AuditPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { DomainsPage } from "@/pages/DomainsPage";
import { PoliciesPage } from "@/pages/PoliciesPage";
import { ToolsPage } from "@/pages/ToolsPage";

function AppLayout() {
  return (
    <div className="min-h-screen bg-app text-ink">
      <div className="mx-auto flex min-h-screen max-w-[1600px] px-4 py-4 lg:px-6">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col gap-6 lg:pl-6">
          <TopStatusBar />
          <main className="flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-black/10 p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/domains" element={<DomainsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
