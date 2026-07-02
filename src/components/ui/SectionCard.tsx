import type { PropsWithChildren, ReactNode } from "react";

import { Card, Typography } from "antd";

import { cn } from "@/lib/utils";

interface SectionCardProps extends PropsWithChildren {
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionCard({ title, action, className, children }: SectionCardProps) {
  return (
    <Card
      className={cn(
        "border border-[#e6ebf5] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.05)]",
        className,
      )}
      styles={{ body: { padding: 24 } }}
    >
      {(title || action) && (
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && (
              <Typography.Title level={4} className="!mb-0 !font-[Manrope] !text-[#0f172a]">
                {title}
              </Typography.Title>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </Card>
  );
}
