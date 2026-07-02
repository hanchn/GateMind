import { create } from "zustand";

interface ShellState {
  search: string;
  setSearch: (search: string) => void;
}

export const useShellStore = create<ShellState>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
