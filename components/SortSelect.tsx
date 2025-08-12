"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";

export default function SortSelect() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSort = (val: string) => {
    const params = new URLSearchParams(sp.toString());
    if (val) params.set("sort", val);
    else params.delete("sort");
    const qs = params.toString();
    router.replace((qs ? `${pathname}?${qs}` : pathname) as Route, {
      scroll: false,
    });
  };

  return (
    <label className="text-sm">
      <div className="mb-1 text-[var(--muted)]">Sort</div>
      <select
        className="input"
        value={sp.get("sort") ?? ""}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Default</option>
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="episodes-asc">Episodes ↑</option>
        <option value="episodes-desc">Episodes ↓</option>
      </select>
    </label>
  );
}
