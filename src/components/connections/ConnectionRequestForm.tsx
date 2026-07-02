import { useMemo, useState } from "react";
import { Button, Modal } from "antd";

import { SectionCard } from "@/components/ui/SectionCard";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
import { DataTable } from "@/components/ui/DataTable";

const tableOptions = [
  { key: "project_hub.milestone_snapshots", database: "project_hub", table: "milestone_snapshots", environment: "预发布" },
  { key: "project_hub.project_tasks", database: "project_hub", table: "project_tasks", environment: "预发布" },
  { key: "gatemind_local.tool_definitions", database: "gatemind_local", table: "tool_definitions", environment: "测试" },
  { key: "gatemind_local.policy_rules", database: "gatemind_local", table: "policy_rules", environment: "测试" },
  { key: "erp_mirror.settlement_orders", database: "erp_mirror", table: "settlement_orders", environment: "生产" },
  { key: "erp_mirror.order_items", database: "erp_mirror", table: "order_items", environment: "生产" },
] as const;

const operationOptions = [
  { key: "read", label: "查" },
  { key: "create", label: "增" },
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
  const [activeDatabaseKey, setActiveDatabaseKey] = useState("project_hub-预发布");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [version, setVersion] = useState("v1.0.0");
  const [reason, setReason] = useState("");
  const databases = useMemo(
    () =>
      Object.values(
        tableOptions.reduce<Record<string, { key: string; database: string; environment: string; total: number; selected: number }>>(
          (acc, item) => {
            const databaseKey = `${item.database}-${item.environment}`;
            if (!acc[databaseKey]) {
              acc[databaseKey] = {
                key: databaseKey,
                database: item.database,
                environment: item.environment,
                total: 0,
                selected: 0,
              };
            }
            acc[databaseKey].total += 1;
            if (selectedItems[item.key]?.length) {
              acc[databaseKey].selected += 1;
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
          `${item.database}-${item.environment}` === activeDatabaseKey &&
          `${item.database}.${item.table}`.toLowerCase().includes(tableKeyword.toLowerCase()),
      ),
    [activeDatabaseKey, tableKeyword],
  );
  const selectedTableItems = tableOptions.filter((item) => selectedItems[item.key]);
  const activeDatabase = databases.find((database) => database.key === activeDatabaseKey);

  return (
    <SectionCard>
      <div className="space-y-4">
        <label className="block text-sm text-ink-muted">
          应用 / 功能名称
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：查询项目里程碑状态"
            className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-ink-muted">库列表</p>
            <HelpTooltip content="点击库列表中的选择，进入表列表弹窗，再勾选增删改查。" />
          </div>
          <DataTable
            rowKey={(database) => database.key}
            rows={databases}
            columns={[
              {
                key: "database",
                title: "库名",
                render: (database) => (
                  <div>
                    <p className="font-semibold text-ink">{database.database}</p>
                    <p className="mt-1 text-xs text-ink-muted">{database.environment}</p>
                  </div>
                ),
              },
              { key: "total", title: "表数", render: (database) => database.total },
              { key: "selected", title: "已选", render: (database) => database.selected },
              {
                key: "actions",
                title: "操作",
                render: (database) => (
                  <Button
                    onClick={() => {
                      setActiveDatabaseKey(database.key);
                      setPickerOpen(true);
                    }}
                  >
                    选择
                  </Button>
                ),
              },
            ]}
          />
          <div className="text-sm text-ink-muted">当前已选 {selectedTableItems.length} 张表。</div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-ink-muted">已选列表</p>
            <HelpTooltip content="查看每张表的增删改查状态。" />
          </div>
          <div className="mt-3 max-h-[260px] space-y-2 overflow-auto pr-1">
            {selectedTableItems.length === 0 ? (
              <p className="border border-dashed border-white/10 px-4 py-3 text-sm text-ink-muted">
                暂无已选库表
              </p>
            ) : (
              selectedTableItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 border border-[#e6ebf5] bg-[#f8fafc] px-4 py-3"
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
                              ? "bg-[#e6f4ff] text-[#1677ff]"
                              : "bg-[#f1f5f9] text-[#64748b]"
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
            className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <div className="flex items-center justify-between gap-4 px-1 py-1">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink-muted">
              <p>待发布版本</p>
              <HelpTooltip content="提交后补丁版本自动加 1。" />
            </div>
            <p className="mt-2 font-display text-2xl text-ink">{version}</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Button onClick={() => setMessage("已保存为草稿功能")}>
            保存草稿
          </Button>
          <Button
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
          </Button>
        </div>
        <div className="text-xs text-ink-muted">
          已选 {selectedTableItems.length} 张表，下一版本 {bumpVersion(version)}
        </div>
        {message && <p className="text-sm text-[#1677ff]">{message}</p>}
      </div>
      <Modal
        title={activeDatabase ? `${activeDatabase.database} / ${activeDatabase.environment} 表列表` : "表列表"}
        open={pickerOpen}
        onCancel={() => setPickerOpen(false)}
        width={980}
        footer={[
          <Button key="close" onClick={() => setPickerOpen(false)}>
            完成
          </Button>,
        ]}
      >
        <label className="block text-sm text-ink-muted">
          搜索当前库下的表
          <input
            value={tableKeyword}
            onChange={(event) => setTableKeyword(event.target.value)}
            placeholder={`输入 ${activeDatabase?.database ?? ""} 下的表名`}
            className="mt-2 w-full rounded-2xl border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <div className="mt-4 max-h-[520px] space-y-2 overflow-auto pr-1">
          {filteredTables.map((table) => {
            const currentOperations = selectedItems[table.key] ?? [];

            return (
              <div key={table.key} className="rounded-2xl border border-[#e6ebf5] bg-[#f8fafc] px-4 py-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{table.table}</p>
                    <p className="mt-1 text-xs text-ink-muted">
                      环境：{table.environment}
                      {historicalSelections[table.key] ? " | 历史已选" : ""}
                    </p>
                  </div>
                  {currentOperations.length > 0 && (
                    <span className="rounded-full border border-[#91caff] bg-[#e6f4ff] px-2.5 py-1 text-xs text-[#1677ff]">
                      已选中
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {operationOptions.map((option) => {
                    const checked = currentOperations.includes(option.key);

                    return (
                      <label
                        key={option.key}
                        className={`inline-flex cursor-pointer items-center justify-center rounded-full border px-3 py-1 text-xs font-medium transition ${
                          checked
                            ? "border-[#91caff] bg-[#e6f4ff] text-[#1677ff]"
                            : "border-[#d9e1ec] bg-white text-[#64748b] hover:border-[#91caff] hover:text-[#1677ff]"
                        }`}
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
                          className="sr-only"
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
      </Modal>
    </SectionCard>
  );
}
