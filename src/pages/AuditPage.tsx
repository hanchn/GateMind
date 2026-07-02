import { useEffect, useState } from "react";

import { AuditTable } from "@/components/audit/AuditTable";
import { TraceTimeline } from "@/components/audit/TraceTimeline";
import { PageHeader } from "@/components/shell/PageHeader";
import { listAuditEvents } from "@/services/auditService";
import { useAuditStore } from "@/store/useAuditStore";
import type { AuditEvent } from "@/types";

export function AuditPage() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const selectedTraceId = useAuditStore((state) => state.selectedTraceId);
  const setSelectedTraceId = useAuditStore((state) => state.setSelectedTraceId);

  useEffect(() => {
    listAuditEvents().then((items) => {
      setEvents(items);
      setSelectedTraceId(items[0]?.traceId ?? null);
    });
  }, [setSelectedTraceId]);

  const selectedEvent = events.find((event) => event.traceId === selectedTraceId) ?? events[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Audit Trail"
        title="调用审计与 Trace 回放"
        description="检索完整调用链路，快速确认请求来源、命中策略、审批节点与执行结果。"
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AuditTable events={events} onSelect={(event) => setSelectedTraceId(event.traceId)} />
        <TraceTimeline event={selectedEvent} />
      </div>
    </div>
  );
}
