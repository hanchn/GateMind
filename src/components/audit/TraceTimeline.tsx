import { SectionCard } from "@/components/ui/SectionCard";
import type { AuditEvent } from "@/types";

interface TraceTimelineProps {
  event?: AuditEvent;
}

const timelineSteps = ["调用入口鉴权", "工具解析", "策略评估", "审批校验", "执行记录", "审计归档"];

export function TraceTimeline({ event }: TraceTimelineProps) {
  return (
    <SectionCard title="Trace 时间线" eyebrow="Replay Chain">
      {event ? (
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">{event.traceId}</p>
            <h3 className="mt-2 font-display text-2xl text-ink">{event.toolName}</h3>
            <p className="mt-2 text-sm leading-7 text-ink-muted">{event.summary}</p>
          </div>
          <div className="space-y-4">
            {timelineSteps.map((step, index) => (
              <div key={step} className="flex gap-4">
                <div className="flex w-10 flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-xs text-cyan-100">
                    {index + 1}
                  </span>
                  {index < timelineSteps.length - 1 && <span className="mt-2 h-full w-px bg-white/10" />}
                </div>
                <div className="pb-5">
                  <p className="text-sm font-semibold text-ink">{step}</p>
                  <p className="mt-1 text-sm text-ink-muted">已记录 {event.createdAt} 的上下文快照与决策结果。</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm leading-7 text-ink-muted">点击左侧审计记录后，这里会展开完整链路时间线。</p>
      )}
    </SectionCard>
  );
}
