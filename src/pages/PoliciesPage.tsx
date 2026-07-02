import { useEffect, useState } from "react";

import { PolicyEditorPanel } from "@/components/policies/PolicyEditorPanel";
import { PolicyTable } from "@/components/policies/PolicyTable";
import { PageHeader } from "@/components/shell/PageHeader";
import { listPolicies } from "@/services/policyService";
import type { PolicySummary } from "@/types";

export function PoliciesPage() {
  const [policies, setPolicies] = useState<PolicySummary[]>([]);

  useEffect(() => {
    listPolicies().then(setPolicies);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="策略规则与审批模板" description="集中管理治理规则与审批模板。" />
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <PolicyTable policies={policies} />
        <PolicyEditorPanel />
      </div>
    </div>
  );
}
