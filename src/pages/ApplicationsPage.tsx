import { ApplicationCreatePanel } from "@/components/applications/ApplicationCreatePanel";
import { PageHeader } from "@/components/shell/PageHeader";

export function ApplicationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="创建应用" description="先创建应用并拿到应用 ID、应用秘钥，再继续做后续发布和授权。" />
      <ApplicationCreatePanel />
    </div>
  );
}
