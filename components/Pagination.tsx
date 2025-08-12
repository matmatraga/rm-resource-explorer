"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";

export default function Pagination({ pages }: { pages: number }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = Number(sp.get("page") ?? "1");

  const goto = (p: number) => {
    const next = Math.max(1, Math.min(pages || 1, p));
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(next));
    const qs = params.toString();
    router.replace((qs ? `${pathname}?${qs}` : pathname) as Route, {
      scroll: false,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn"
        onClick={() => goto(page - 1)}
        disabled={page <= 1}
      >
        ← Prev
      </button>
      <span className="text-sm text-[var(--muted)]">
        Page {page} / {pages || 1}
      </span>
      <button
        className="btn"
        onClick={() => goto(page + 1)}
        disabled={!pages || page >= pages}
      >
        Next →
      </button>
    </div>
  );
}
