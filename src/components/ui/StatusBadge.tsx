import { Tag } from "antd";

interface StatusBadgeProps {
  status: string;
}

const statusToneMap: Record<string, string> = {
  active: "success",
  draft: "gold",
  disabled: "default",
  pending: "orange",
  approved: "processing",
  rejected: "error",
  executed: "purple",
  healthy: "success",
  warning: "gold",
  degraded: "error",
  connected: "success",
  failed: "error",
  managed: "processing",
  restricted: "orange",
  expiring: "gold",
  revoked: "default",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Tag color={statusToneMap[status] ?? "default"} className="mr-0 rounded-full px-3 py-1 text-xs capitalize">
      {status}
    </Tag>
  );
}
