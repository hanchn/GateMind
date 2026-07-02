import { Typography } from "antd";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <Typography.Title level={2} className="!mb-0 !font-[Manrope] !text-[#0f172a]">
        {title}
      </Typography.Title>
      {description ? (
        <Typography.Paragraph className="!mt-3 !mb-0 max-w-3xl !text-sm !leading-7 !text-[#64748b]">
          {description}
        </Typography.Paragraph>
      ) : null}
    </header>
  );
}
