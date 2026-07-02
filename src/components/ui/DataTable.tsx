import type { ReactNode } from "react";

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
}

export function DataTable<T>({ columns, rows, onRowClick, rowKey }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/5">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted",
                  column.className,
                )}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-surface/60">
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className={cn(
                "transition duration-200",
                onRowClick ? "cursor-pointer hover:bg-white/5" : "",
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className={cn("px-4 py-4 text-sm text-ink", column.className)}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
