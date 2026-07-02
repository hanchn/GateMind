import { useEffect, useState } from "react";

import { DomainCardGrid } from "@/components/domains/DomainCardGrid";
import { ProviderStatusPanel } from "@/components/domains/ProviderStatusPanel";
import { PageHeader } from "@/components/shell/PageHeader";
import { listDomains } from "@/services/domainService";
import type { DomainSummary } from "@/types";

export function DomainsPage() {
  const [domains, setDomains] = useState<DomainSummary[]>([]);

  useEffect(() => {
    listDomains().then(setDomains);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Domain Map"
        title="业务域接入状态"
        description="集中查看各业务域的工具数量、负责人、Provider 健康度和当前接入状态。"
      />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <DomainCardGrid domains={domains} />
        <ProviderStatusPanel domains={domains} />
      </div>
    </div>
  );
}
