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
  const [activeDatabase, setActiveDatabase] = useState("project_hub");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [version, setVersion] = useState("v1.0.0");
  const [reason, setReason] = useState("");
  const databases = useMemo(
    () =>
      Object.values(
        tableOptions.reduce<Record<string, { database: string; environment: string; total: number; selected: number }>>(
          (acc, item) => {
            if (!acc[item.database]) {
              acc[item.database] = {
                database: item.database,
                environment: item.environment,
                total: 0,
                selected: 0,
              };
            }
            acc[item.database].total += 1;
            if (selectedItems[item.key]?.length) {
              acc[item.database].selected += 1;
            }
            return acc;
          },
          {},
        ),
      ),
    [selectedItems],
  );
  const filteredTables = useMemo(
    () =>
      tableOptions.filter(
        (item) =>
          item.database === activeDatabase &&
          `${item.database}.${item.table}`.toLowerCase().includes(tableKeyword.toLowerCase()),
      ),
    [activeDatabase, tableKeyword],
  );
  const selectedTableItems = tableOptions.filter((item) => selectedItems[item.key]);

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
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-ink-muted">库表选择</p>
              <p className="mt-1 text-xs text-ink-muted">支持多库多表申请，历史已选会默认带出</p>
            </div>
            <button
              type="button"
              className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
              onClick={() => setPickerOpen(true)}
            >
              选择库表
            </button>
          </div>
          <div className="text-sm text-ink-muted">
            当前已选 {selectedTableItems.length} 张表，点击右上角 `选择库表` 进行维护。
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">已选列表</p>
            <p className="text-xs text-ink-muted">查看每张表的增删改查选中状态</p>
          </div>
          <div className="mt-3 max-h-[260px] space-y-2 overflow-auto pr-1">
            {selectedTableItems.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 px-4 py-3 text-sm text-ink-muted">
                还没有选中任何库表
              </p>
            ) : (
              selectedTableItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
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
                </div>
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
        <div className="flex items-center justify-between gap-4 px-1 py-1">
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
          已选库表：{selectedTableItems.length} 张 | 当前库：`{activeDatabase}` | 下一版本：{bumpVersion(version)}
        </div>
        {message && <p className="text-sm text-cyan-200">{message}</p>}
      </div>
      {pickerOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <div className="max-h-[80vh] w-full max-w-6xl rounded-[2rem] bg-[#0b1220] p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl text-ink">选择库表</h3>
                <p className="mt-2 text-sm text-ink-muted">选择库，右侧展示该库下的表，并在表上直接勾选增删改查。</p>
              </div>
              <button
                type="button"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-ink transition hover:bg-white/10"
                onClick={() => setPickerOpen(false)}
              >
                完成
              </button>
            </div>
            <div className="mt-6 grid gap-4 xl:grid-cols-[0.42fr_1fr]">
              <div className="min-h-0 p-1">
                <div className="max-h-[460px] space-y-2 overflow-auto pr-1">
                  {databases.map((database) => (
                    <button
                      key={database.database}
                      type="button"
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                        activeDatabase === database.database
                          ? "border-cyan-400/30 bg-cyan-500/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                      onClick={() => setActiveDatabase(database.database)}
                    >
                      <p className="font-semibold text-ink">{database.database}</p>
                      <p className="mt-1 text-xs text-ink-muted">
                        环境：{database.environment} | 表数：{database.total}
                      </p>
                      <p className="mt-2 text-xs text-cyan-200">已选表：{database.selected}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="min-h-0 p-1">
                <label className="block text-sm text-ink-muted">
                  搜索当前库下的表
                  <input
                    value={tableKeyword}
                    onChange={(event) => setTableKeyword(event.target.value)}
                    placeholder={`输入 ${activeDatabase} 下的表名`}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
                  />
                </label>
                <div className="mt-3 max-h-[396px] space-y-2 overflow-auto pr-1">
                  {filteredTables.map((table) => {
                    const currentOperations = selectedItems[table.key] ?? [];

                    return (
                      <div key={table.key} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-ink">{table.table}</p>
                            <p className="mt-1 text-xs text-ink-muted">
                              环境：{table.environment}
                              {historicalSelections[table.key] ? " | 历史已选" : ""}
                            </p>
                          </div>
                          {currentOperations.length > 0 && (
                            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-100">
                              已选中
                            </span>
                          )}
                        </div>
                        <div className="mt-3 grid gap-2 md:grid-cols-4">
                          {operationOptions.map((option) => {
                            const checked = currentOperations.includes(option.key);

                            return (
                              <label
                                key={option.key}
                                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-ink"
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(event) => {
                                    const nextChecked = event.target.checked;
                                    setSelectedItems((prev) => {
                                      const current = prev[table.key] ?? [];
                                      if (nextChecked) {
                                        return {
                                          ...prev,
                                          [table.key]: current.includes(option.key) ? current : [...current, option.key],
                                        };
                                      }

                                      const nextOperations = current.filter((item) => item !== option.key);
                                      if (nextOperations.length === 0) {
                                        const next = { ...prev };
                                        delete next[table.key];
                                        return next;
                                      }

                                      return {
                                        ...prev,
                                        [table.key]: nextOperations,
                                      };
                                    });
                                  }}
                                  className="h-4 w-4 rounded border-white/20 bg-transparent"
                                />
                                <span>{option.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}
