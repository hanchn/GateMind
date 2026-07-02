import { create } from "zustand";

interface ToolState {
  selectedToolId: string | null;
  setSelectedToolId: (selectedToolId: string | null) => void;
}

export const useToolStore = create<ToolState>((set) => ({
  selectedToolId: null,
  setSelectedToolId: (selectedToolId) => set({ selectedToolId }),
}));
