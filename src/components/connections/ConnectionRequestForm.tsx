import { useMemo, useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";

const tableOptions = [
  { key: "project_hub.milestone_snapshots", database: "project_hub", table: "milestone_snapshots", environment: "预发布" },
  { key: "project_hub.project_tasks", database: "project_hub", table: "project_tasks", environment: "预发布" },
  { key: "gatemind_local.tool_definitions", database: "gatemind_local", table: "tool_definitions", environment: "测试" },
  { key: "gatemind_local.policy_rules", database: "gatemind_local", table: "policy_rules", environment: "测试" },
  { key: "erp_mirror.settlement_orders", database: "erp_mirror", table: "settlement_orders", environment: "生产" },
  { key: "erp_mirror.order_items", database: "erp_mirror", table: "order_items", environment: "生产" },
] as const;

const operationOptions = [
  { key: "create", label: "增" },
  { key: "read", label: "查" },
  { key: "update", label: "改" },
  { key: "delete", label: "删" },
];

const historicalSelections: Record<string, string[]> = {
  "project_hub.milestone_snapshots": ["read", "update"],
  "gatemind_local.tool_definitions": ["read"],
};

function bumpVersion(version: string) {
  const normalized = version.replace(/^v/i, "");
  const [major = "1", minor = "0", patch = "0"] = normalized.split(".");

  return `v${major}.${minor}.${Number(patch) + 1}`;
}

export function ConnectionRequestForm() {
  const [name, setName] = useState("");
  const [tableKeyword, setTableKeyword] = useState("");
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(historicalSelections);
  const [activeTableKey, setActiveTableKey] = useState("project_hub.milestone_snapshots");
  const [message, setMessage] = useState("");
  const [version, setVersion] = useState("v1.0.0");
  const [reason, setReason] = useState("");
  const filteredTables = useMemo(
    () =>
      tableOptions.filter((item) =>
        `${item.database}.${item.table}`.toLowerCase().includes(tableKeyword.toLowerCase()),
      ),
    [tableKeyword],
  );
  const selectedTableItems = tableOptions.filter((item) => selectedItems[item.key]);
  const activeOperations = selectedItems[activeTableKey] ?? [];

  return (
    <SectionCard title="发布申请">
      <div className="space-y-4">
        <label className="block text-sm text-ink-muted">
          应用 / 功能名称
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：查询项目里程碑状态"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">选择库表</p>
            <p className="text-xs text-ink-muted">支持多库多表申请，历史已选会默认带出</p>
          </div>
          <label className="mt-3 block text-sm text-ink-muted">
            搜索库表
            <input
              value={tableKeyword}
              onChange={(event) => setTableKeyword(event.target.value)}
              placeholder="输入库名或表名，例如 project_hub / milestone"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
            />
          </label>
          <div className="mt-3 max-h-56 space-y-2 overflow-auto pr-1">
            {filteredTables.map((table) => (
              <button
                key={table}
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-ink"
                onClick={() => setActiveTableKey(table.key)}
              >
                <input
                  type="checkbox"
                  checked={Boolean(selectedItems[table.key])}
                  onChange={(event) => {
                    const checked = event.target.checked;
                    setSelectedItems((prev) => {
                      if (checked) {
                        return {
                          ...prev,
                          [table.key]: prev[table.key] ?? historicalSelections[table.key] ?? ["read"],
                        };
                      }

                      const next = { ...prev };
                      delete next[table.key];
                      return next;
                    });
                    setActiveTableKey(table.key);
                  }}
                  className="h-4 w-4 border-white/20 bg-transparent"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{table.database}.{table.table}</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    环境：{table.environment}
                    {historicalSelections[table.key] ? " | 历史已选" : ""}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">设置当前表的增删改查</p>
            <p className="text-xs text-ink-muted">
              当前编辑：{activeTableKey}
            </p>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-4">
            {operationOptions.map((option) => {
              const checked = activeOperations.includes(option.key);
              return (
                <label
                  key={option.key}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      if (!selectedItems[activeTableKey]) {
                        setMessage("请先在上面勾选至少一张表");
                        return;
                      }
                      if (event.target.checked) {
                        setSelectedItems((prev) => ({
                          ...prev,
                          [activeTableKey]: [...(prev[activeTableKey] ?? []), option.key],
                        }));
                        return;
                      }
                      setSelectedItems((prev) => ({
                        ...prev,
                        [activeTableKey]: (prev[activeTableKey] ?? []).filter((item) => item !== option.key),
                      }));
                    }}
                    className="h-4 w-4 rounded border-white/20 bg-transparent"
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">已选列表</p>
            <p className="text-xs text-ink-muted">查看每张表的增删改查选中状态</p>
          </div>
          <div className="mt-3 space-y-2">
            {selectedTableItems.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 px-4 py-3 text-sm text-ink-muted">
                还没有选中任何库表
              </p>
            ) : (
              selectedTableItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left"
                  onClick={() => setActiveTableKey(item.key)}
                >
                  <div>
                    <p className="font-semibold text-ink">{item.database}.{item.table}</p>
                    <p className="mt-1 text-xs text-ink-muted">环境：{item.environment}</p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2 text-xs">
                    {operationOptions.map((option) => {
                      const enabled = (selectedItems[item.key] ?? []).includes(option.key);
                      return (
                        <span
                          key={option.key}
                          className={`rounded-full px-2.5 py-1 ${
                            enabled
                              ? "border border-cyan-400/30 bg-cyan-500/10 text-cyan-100"
                              : "border border-white/10 bg-white/5 text-ink-muted"
                          }`}
                        >
                          {option.label}
                        </span>
                      );
                    })}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
        <label className="block text-sm text-ink-muted">
          申请原因
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={3}
            placeholder="必填，说明为什么要创建这个应用 / 发布这个功能。"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">待发布版本</p>
            <p className="mt-2 font-display text-2xl text-ink">{version}</p>
          </div>
          <p className="max-w-xs text-right text-xs leading-6 text-ink-muted">
            发布时默认自动更新版本号，规则为补丁版本 `+1`。
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <button
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink transition hover:bg-white/10"
            onClick={() => setMessage("已保存为草稿功能")}
          >
            保存草稿
          </button>
          <button
            className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
            onClick={() => {
              if (!reason.trim()) {
                setMessage("请先填写申请原因");
                return;
              }
              if (selectedTableItems.length === 0) {
                setMessage("请至少选择一张表再提交");
                return;
              }
              const nextVersion = bumpVersion(version);
              setVersion(nextVersion);
              setMessage(`已提交发布申请，版本自动更新为 ${nextVersion}，进入审批流程`);
            }}
          >
            提交发布
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-6 text-ink-muted">
          已选表数：{selectedTableItems.length} | 当前编辑：`{activeTableKey}` | 下一版本：{bumpVersion(version)}
        </div>
        {message && <p className="text-sm text-cyan-200">{message}</p>}
      </div>
    </SectionCard>
  );
}
