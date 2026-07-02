import { useEffect, useState } from "react";

import { ApplicationTable } from "@/components/applications/ApplicationTable";
import { PageHeader } from "@/components/shell/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { listApplications } from "@/services/applicationService";
import type { ApplicationCredential } from "@/types";

export function ApplicationListPage() {
  const [items, setItems] = useState<ApplicationCredential[]>([]);

  useEffect(() => {
    listApplications().then(setItems);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="应用管理" description="集中查看已创建应用，并支持查看详情和更新基础信息。" />
      <SectionCard title="应用管理">
        <ApplicationTable items={items} />
      </SectionCard>
    </div>
  );
}
