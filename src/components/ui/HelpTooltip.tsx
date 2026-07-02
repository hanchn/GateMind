import { CircleHelp } from "lucide-react";

interface HelpTooltipProps {
  content: string;
}

export function HelpTooltip({ content }: HelpTooltipProps) {
  return (
    <span className="group relative inline-flex items-center">
      <span className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-muted transition hover:bg-white/10 hover:text-ink">
        <CircleHelp className="h-3.5 w-3.5" />
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-80 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-xs leading-6 text-ink-muted shadow-2xl group-hover:block">
        {content}
      </span>
    </span>
  );
}
