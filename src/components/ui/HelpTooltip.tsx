import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface HelpTooltipProps {
  content: string;
}

export function HelpTooltip({ content }: HelpTooltipProps) {
  return (
    <Tooltip placement="bottom" title={<span className="text-xs leading-6">{content}</span>} overlayInnerStyle={{ maxWidth: 320 }}>
      <span className="inline-flex h-5 w-5 cursor-help items-center justify-center text-[#94a3b8] transition hover:text-[#1677ff]">
        <QuestionCircleOutlined />
      </span>
    </Tooltip>
  );
}
