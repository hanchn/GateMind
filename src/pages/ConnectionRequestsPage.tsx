import { ConnectionRequestForm } from "@/components/connections/ConnectionRequestForm";
import { PageHeader } from "@/components/shell/PageHeader";

export function ConnectionRequestsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="应用发布" description="统一提交发布申请并进入审批。" />
      <ConnectionRequestForm />
    </div>
  );
}
