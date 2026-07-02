import { BellDot, Search, Sparkles } from "lucide-react";

import { useShellStore } from "@/store/useShellStore";

export function TopStatusBar() {
  const search = useShellStore((state) => state.search);
  const setSearch = useShellStore((state) => state.setSearch);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-panel/70 px-5 py-4 shadow-panel backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-ink-muted">Production Governance</p>
        <div className="mt-2 flex items-center gap-2 text-ink">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          <span className="text-sm">当前环境：Local SQLite / Mock Gateway</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink-muted">
          <Search className="h-4 w-4" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="搜索工具、策略、Trace"
            className="w-full bg-transparent text-ink outline-none placeholder:text-ink-muted md:w-64"
          />
        </label>
        <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink transition hover:bg-white/10">
          <BellDot className="h-4 w-4 text-orange-300" />
          12 条风控提醒
        </button>
      </div>
    </div>
  );
}
