"use client";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initial = sp.get("q") ?? "";
  const [value, setValue] = useState(initial);
  const debounced = useDebouncedValue(value, 400);

  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    if (debounced) params.set("q", debounced);
    else params.delete("q");
    params.delete("page");
    const qs = params.toString();
    router.replace((qs ? `${pathname}?${qs}` : pathname) as Route, {
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  return (
    <label className="relative block">
      <span className="sr-only">Search by name</span>
      <input
        className="input pl-10 h-11"
        placeholder="Search by name…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2">
        🔎
      </span>
    </label>
  );
}
