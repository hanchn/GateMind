import { useEffect, useState } from "react";

import { PageHeader } from "@/components/shell/PageHeader";
import { TokenCreatePanel } from "@/components/tokens/TokenCreatePanel";
import { TokenTable } from "@/components/tokens/TokenTable";
import { listPersonalTokens } from "@/services/tokenService";
import type { PersonalToken } from "@/types";

export function TokensPage() {
  const [items, setItems] = useState<PersonalToken[]>([]);

  useEffect(() => {
    listPersonalTokens().then(setItems);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="个人 Token" description="为个人脚本或外部系统生成专属 Token，并自选有效期。" />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <TokenCreatePanel />
        <TokenTable items={items} />
      </div>
    </div>
  );
}
