import { useEffect, useMemo, useState } from "react";

import { PageHeader } from "@/components/shell/PageHeader";
import { ToolDetailDrawer } from "@/components/tools/ToolDetailDrawer";
import { ToolFilters } from "@/components/tools/ToolFilters";
import { ToolTable } from "@/components/tools/ToolTable";
import { listTools } from "@/services/toolService";
import { useToolStore } from "@/store/useToolStore";
import type { ToolSummary } from "@/types";

export function ToolsPage() {
  const [tools, setTools] = useState<ToolSummary[]>([]);
  const [keyword, setKeyword] = useState("");
  const selectedToolId = useToolStore((state) => state.selectedToolId);
  const setSelectedToolId = useToolStore((state) => state.setSelectedToolId);

  useEffect(() => {
    listTools().then((items) => {
      setTools(items);
      setSelectedToolId(items[0]?.id ?? null);
    });
  }, [setSelectedToolId]);

  const filteredTools = useMemo(() => {
    const normalized = keyword.toLowerCase();

    return tools.filter((tool) =>
      [tool.name, tool.domain, tool.system].some((field) => field.toLowerCase().includes(normalized)),
    );
  }, [keyword, tools]);

  const selectedTool = filteredTools.find((tool) => tool.id === selectedToolId) ?? filteredTools[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Tool Registry"
        title="工具目录与暴露规则"
        description="按业务域、系统来源、风险等级和状态查看已注册工具，并在右侧抽屉检查治理元数据。"
      />

      <ToolFilters keyword={keyword} onKeywordChange={setKeyword} />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <ToolTable tools={filteredTools} onSelect={(tool) => setSelectedToolId(tool.id)} />
        <ToolDetailDrawer tool={selectedTool} />
      </div>
    </div>
  );
}
