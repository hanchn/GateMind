import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "@/components/shell/PageHeader";
import { HelpTooltip } from "@/components/ui/HelpTooltip";
import { SectionCard } from "@/components/ui/SectionCard";
import { DataTable } from "@/components/ui/DataTable";
import { getApplicationById, updateApplication } from "@/services/applicationService";
import type { ApplicationCredential } from "@/types";

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

export function ApplicationEditPage() {
  const navigate = useNavigate();
  const { applicationId = "" } = useParams();
  const [application, setApplication] = useState<ApplicationCredential | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [integrationDoc, setIntegrationDoc] = useState("");
  const [domain, setDomain] = useState("");
  const [owner, setOwner] = useState("");
  const [tableKeyword, setTableKeyword] = useState("");
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const [activeDatabaseKey, setActiveDatabaseKey] = useState("project_hub-预发布");
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    getApplicationById(applicationId).then((result) => {
      setApplication(result);
      setLoading(false);
      if (!result) {
        return;
      }

      setName(result.name);
      setDescription(result.description);
      setIntegrationDoc(result.integrationDoc);
      setDomain(result.domain);
      setOwner(result.owner);
      setSelectedItems(result.tablePermissions);
      const firstDatabaseKey = Object.values(
        tableOptions.reduce<Record<string, string>>((acc, item) => {
          const databaseKey = `${item.database}-${item.environment}`;
          if (!acc[databaseKey]) {
            acc[databaseKey] = databaseKey;
          }
          return acc;
        }, {}),
      )[0];
      setActiveDatabaseKey(firstDatabaseKey ?? "project_hub-预发布");
    });
  }, [applicationId]);

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
            if ((selectedItems[item.key] ?? []).length > 0) {
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

  const selectedTableItems = useMemo(
    () => tableOptions.filter((item) => (selectedItems[item.key] ?? []).length > 0),
    [selectedItems],
  );
  const selectedTableGroups = useMemo(
    () =>
      Object.values(
        selectedTableItems.reduce<
          Record<
            string,
            {
              key: string;
              database: string;
              environment: string;
              items: typeof selectedTableItems;
            }
          >
        >((acc, item) => {
          const databaseKey = `${item.database}-${item.environment}`;
          if (!acc[databaseKey]) {
            acc[databaseKey] = {
              key: databaseKey,
              database: item.database,
              environment: item.environment,
              items: [],
            };
          }
          acc[databaseKey].items.push(item);
          return acc;
        }, {}),
      ),
    [selectedTableItems],
  );

  const activeDatabase = databases.find((database) => database.key === activeDatabaseKey);

  if (loading) {
    return <div className="text-sm text-ink-muted">加载中...</div>;
  }

  if (!application) {
    return (
      <div className="space-y-6">
        <PageHeader title="应用编辑" description="未找到对应应用。" />
        <Button onClick={() => navigate("/application-list")}>返回应用管理</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="应用编辑" description={`编辑 ${application.name} 的基础信息和表权限。`} />
      <SectionCard title="基础信息">
        <div className="grid gap-4 xl:grid-cols-2">
          <label className="block text-sm text-ink-muted">
            应用名称
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
            />
          </label>
          <label className="block text-sm text-ink-muted">
            业务域
            <input
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
            />
          </label>
          <label className="block text-sm text-ink-muted">
            接入文档
            <input
              value={integrationDoc}
              onChange={(event) => setIntegrationDoc(event.target.value)}
              className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
            />
          </label>
          <label className="block text-sm text-ink-muted">
            负责人
            <input
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
            />
          </label>
          <label className="block text-sm text-ink-muted xl:col-span-2">
            应用描述
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
            />
          </label>
        </div>
        <div className="mt-4 border border-[#e6ebf5] bg-[#f8fafc] p-4 text-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">应用 ID</p>
          <p className="mt-2 break-all font-semibold text-ink">{application.appId}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.24em] text-ink-muted">应用秘钥</p>
          <p className="mt-2 break-all font-semibold text-ink">{application.appSecret}</p>
        </div>
      </SectionCard>

      <SectionCard title="表权限">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-ink-muted">库列表</p>
            <HelpTooltip content="点击选择，进入当前库的表列表后勾选增删改查权限。" />
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
                    选择表
                  </Button>
                ),
              },
            ]}
          />
          <div className="text-sm text-ink-muted">当前已选 {selectedTableItems.length} 张表。</div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-sm text-ink-muted">已选权限</p>
              <HelpTooltip content="查看每张表当前勾选的增删改查权限。" />
            </div>
            <div className="max-h-[280px] space-y-2 overflow-auto pr-1">
              {selectedTableGroups.length === 0 ? (
                <p className="border border-dashed border-[#d9e1ec] px-4 py-3 text-sm text-ink-muted">暂无已选库表</p>
              ) : (
                selectedTableGroups.map((group) => (
                  <div key={group.key} className="border border-[#e6ebf5]">
                    <div className="border-b border-[#e6ebf5] bg-white px-4 py-3">
                      <p className="font-semibold text-ink">{group.database}</p>
                      <p className="mt-1 text-xs text-ink-muted">{group.environment}</p>
                    </div>
                    <div className="space-y-2 bg-[#f8fafc] px-4 py-3">
                      {group.items.map((item) => (
                        <div key={item.key} className="flex items-center justify-between gap-4 border border-[#e6ebf5] bg-white px-4 py-3">
                          <div>
                            <p className="font-semibold text-ink">{item.table}</p>
                            <p className="mt-1 text-xs text-ink-muted">环境：{item.environment}</p>
                          </div>
                          <div className="flex flex-wrap justify-end gap-2 text-xs">
                            {operationOptions.map((option) => {
                              const enabled = (selectedItems[item.key] ?? []).includes(option.key);
                              return (
                                <span
                                  key={option.key}
                                  className={enabled ? "border border-[#91caff] bg-[#e6f4ff] px-2 py-1 text-[#1677ff]" : "border border-[#d9e1ec] bg-white px-2 py-1 text-[#64748b]"}
                                >
                                  {option.label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="flex items-center justify-end gap-3">
        <Button onClick={() => navigate("/application-list")}>返回</Button>
        <Button
          type="primary"
          onClick={async () => {
            const updated = await updateApplication(application.id, {
              name,
              description,
              integrationDoc,
              domain,
              owner,
              tablePermissions: selectedItems,
            });
            if (!updated) {
              setMessage("保存失败");
              return;
            }
            setApplication(updated);
            setMessage("已保存应用编辑");
          }}
        >
          保存编辑
        </Button>
      </div>
      {message ? <p className="text-sm text-[#1677ff]">{message}</p> : null}

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
            className="mt-2 w-full border border-[#d9e1ec] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none"
          />
        </label>
        <div className="mt-4 max-h-[520px] space-y-2 overflow-auto pr-1">
          {filteredTables.map((table) => {
            const currentOperations = selectedItems[table.key] ?? [];

            return (
              <div key={table.key} className="border border-[#e6ebf5] bg-[#f8fafc] px-4 py-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{table.table}</p>
                    <p className="mt-1 text-xs text-ink-muted">环境：{table.environment}</p>
                  </div>
                  {currentOperations.length > 0 ? (
                    <span className="border border-[#91caff] bg-[#e6f4ff] px-2 py-1 text-xs text-[#1677ff]">已选中</span>
                  ) : null}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {operationOptions.map((option) => {
                    const checked = currentOperations.includes(option.key);
                    return (
                      <label
                        key={option.key}
                        className={checked ? "inline-flex cursor-pointer items-center justify-center border border-[#91caff] bg-[#e6f4ff] px-3 py-1 text-xs font-medium text-[#1677ff]" : "inline-flex cursor-pointer items-center justify-center border border-[#d9e1ec] bg-white px-3 py-1 text-xs font-medium text-[#64748b]"}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => {
                            setSelectedItems((previous) => {
                              const nextOperations = previous[table.key] ?? [];
                              const updatedOperations = nextOperations.includes(option.key)
                                ? nextOperations.filter((item) => item !== option.key)
                                : [...nextOperations, option.key];

                              if (updatedOperations.length === 0) {
                                const { [table.key]: _removed, ...rest } = previous;
                                return rest;
                              }

                              return {
                                ...previous,
                                [table.key]: updatedOperations,
                              };
                            });
                          }}
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
