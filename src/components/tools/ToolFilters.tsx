interface ToolFiltersProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
}

export function ToolFilters({ keyword, onKeywordChange }: ToolFiltersProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-panel/70 p-4">
      <label className="flex flex-col gap-2 text-sm text-ink-muted">
        关键字筛选
        <input
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          placeholder="工具名 / 业务域 / 系统"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none placeholder:text-ink-muted"
        />
      </label>
    </div>
  );
}
