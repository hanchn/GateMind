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
      <PageHeader
        eyebrow="Policy Engine"
        title="策略规则与审批模板"
        description="统一管理调用放行、确认、审批、阻断和脱敏等规则，让治理逻辑保持集中且可审计。"
      />
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <PolicyTable policies={policies} />
        <PolicyEditorPanel />
      </div>
    </div>
  );
}
