import { create } from "zustand";

interface AuditState {
  selectedTraceId: string | null;
  setSelectedTraceId: (selectedTraceId: string | null) => void;
}

export const useAuditStore = create<AuditState>((set) => ({
  selectedTraceId: null,
  setSelectedTraceId: (selectedTraceId) => set({ selectedTraceId }),
}));
