import { useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";

const tableOptions = [
  "project_hub.milestone_snapshots",
  "project_hub.project_tasks",
  "gatemind_local.tool_definitions",
  "gatemind_local.policy_rules",
  "erp_mirror.settlement_orders",
  "erp_mirror.order_items",
];

const operationOptions = [
  { key: "create", label: "增" },
  { key: "read", label: "查" },
  { key: "update", label: "改" },
  { key: "delete", label: "删" },
];

function bumpVersion(version: string) {
  const normalized = version.replace(/^v/i, "");
  const [major = "1", minor = "0", patch = "0"] = normalized.split(".");

  return `v${major}.${minor}.${Number(patch) + 1}`;
}

export function ConnectionRequestForm() {
  const [name, setName] = useState("");
  const [scope, setScope] = useState("只读");
  const [tableKeyword, setTableKeyword] = useState("");
  const [selectedTable, setSelectedTable] = useState("project_hub.milestone_snapshots");
  const [operations, setOperations] = useState<string[]>(["read"]);
  const [message, setMessage] = useState("");
  const [version, setVersion] = useState("v1.0.0");
  const filteredTables = tableOptions.filter((item) => item.toLowerCase().includes(tableKeyword.toLowerCase()));

  return (
    <SectionCard title="功能发布" eyebrow="Capability Release">
      <div className="space-y-4">
        <label className="block text-sm text-ink-muted">
          功能名称
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：查询项目里程碑状态"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <label className="block text-sm text-ink-muted">
          执行范围
          <select
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          >
            <option>只读</option>
            <option>只读 + 元数据</option>
            <option>读写申请</option>
          </select>
        </label>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <label className="block text-sm text-ink-muted">
            搜索所有库下面的表
            <input
              value={tableKeyword}
              onChange={(event) => setTableKeyword(event.target.value)}
              placeholder="输入库名或表名，例如 project_hub / milestone"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
            />
          </label>
          <div className="mt-3 max-h-52 space-y-2 overflow-auto pr-1">
            {filteredTables.map((table) => (
              <label
                key={table}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink"
              >
                <input
                  type="radio"
                  name="selectedTable"
                  checked={selectedTable === table}
                  onChange={() => setSelectedTable(table)}
                  className="h-4 w-4 border-white/20 bg-transparent"
                />
                <span>{table}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-ink-muted">勾选该表允许的增删改查</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-4">
            {operationOptions.map((option) => {
              const checked = operations.includes(option.key);
              return (
                <label
                  key={option.key}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setOperations((prev) => [...prev, option.key]);
                        return;
                      }
                      setOperations((prev) => prev.filter((item) => item !== option.key));
                    }}
                    className="h-4 w-4 rounded border-white/20 bg-transparent"
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>
        <label className="block text-sm text-ink-muted">
          功能说明
          <textarea
            rows={4}
            placeholder="描述这个功能基于哪个连接、哪个库表，以及它服务哪个业务域。"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none"
          />
        </label>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-ink-muted">版本信息</p>
          <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">当前待发布版本</p>
              <p className="mt-2 font-display text-2xl text-ink">{version}</p>
            </div>
            <p className="max-w-xs text-right text-xs leading-6 text-ink-muted">
              点击发布时默认自动更新版本号，当前规则为补丁版本 `+1`。
            </p>
          </div>
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
              const nextVersion = bumpVersion(version);
              setVersion(nextVersion);
              setMessage(`已提交功能发布，版本自动更新为 ${nextVersion}，进入审批流程`);
            }}
          >
            发布功能
          </button>
        </div>
        <p className="text-xs leading-6 text-ink-muted">
          当前配置：`{selectedTable}`，允许动作：{operations.length > 0 ? operations.join(" / ") : "未勾选"}
        </p>
        {message && <p className="text-sm text-cyan-200">{message}</p>}
      </div>
    </SectionCard>
  );
}
