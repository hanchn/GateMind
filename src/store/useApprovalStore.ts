import { create } from "zustand";

interface ApprovalState {
  selectedApprovalId: string | null;
  setSelectedApprovalId: (selectedApprovalId: string | null) => void;
}

export const useApprovalStore = create<ApprovalState>((set) => ({
  selectedApprovalId: null,
  setSelectedApprovalId: (selectedApprovalId) => set({ selectedApprovalId }),
}));
