import type { ReactNode } from "react";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  title: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
  rowKey: (row: T) => string;
  scrollClassName?: string;
  stickyHeader?: boolean;
}

export function DataTable<T>({
  columns,
  rows,
  onRowClick,
  rowKey,
  scrollClassName,
  stickyHeader = true,
}: DataTableProps<T>) {
  const tableColumns: ColumnsType<T> = columns.map((column) => ({
    key: column.key,
    title: column.title,
    dataIndex: column.key,
    className: column.className,
    render: (_value, row) => column.render(row),
  }));

  return (
    <div className={cn("overflow-hidden rounded-[24px] border border-[#e6ebf5]", scrollClassName)}>
      <Table
        columns={tableColumns}
        dataSource={rows}
        pagination={false}
        rowKey={rowKey}
        scroll={{ x: "max-content", y: stickyHeader ? 620 : undefined }}
        onRow={(row) =>
          onRowClick
            ? {
                onClick: () => onRowClick(row),
                className: "cursor-pointer",
              }
            : {}
        }
      />
    </div>
  );
}
