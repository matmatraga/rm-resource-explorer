"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import clsx from "clsx";

export default function Filters() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const update = (key: string, val: string) => {
    const params = new URLSearchParams(sp.toString());
    if (val) params.set(key, val);
    else params.delete(key);
    params.delete("page");
    const qs = params.toString();
    router.replace((qs ? `${pathname}?${qs}` : pathname) as Route, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-wrap items-end gap-3 md:gap-4">
      <label className="text-sm min-w-[160px]">
        <div className="mb-1 text-[var(--muted)]">Status</div>
        <select
          className={clsx(
            "w-full rounded-xl border border-[var(--border)] px-3",
            "h-11 bg-[var(--card)] text-[var(--fg)] appearance-none"
          )}
          value={sp.get("status") ?? ""}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="">Any</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>

      <label className="text-sm min-w-[200px]">
        <div className="mb-1 text-[var(--muted)]">Species</div>
        <input
          className={clsx(
            "w-full rounded-xl border border-[var(--border)] px-3",
            "h-11 bg-[var(--card)] text-[var(--fg)] placeholder:text-[var(--muted)]"
          )}
          placeholder="e.g. Human"
          value={sp.get("species") ?? ""}
          onChange={(e) => update("species", e.target.value)}
        />
      </label>
    </div>
  );
}
