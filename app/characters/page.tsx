"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { fetchCharacters } from "@/lib/api";
import CharacterCard from "@/components/CharacterCard";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import SortSelect from "@/components/SortSelect";
import Pagination from "@/components/Pagination";
import SkeletonCard from "@/components/SkeletonCard";
import { useFavorites } from "@/lib/useFavorites";

export default function CharactersPage() {
  const sp = useSearchParams();
  const q = useMemo(
    () => ({
      page: Number(sp.get("page") ?? "1"),
      name: sp.get("q") ?? undefined,
      status: (sp.get("status") ?? "") as any,
      species: sp.get("species") ?? undefined,
      sort: (sp.get("sort") ?? "") as any,
    }),
    [sp]
  );

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["characters", q],
    queryFn: ({ signal }) => fetchCharacters(q, signal),
    placeholderData: (prev) => prev,
  });

  const { ids } = useFavorites();
  const showFavsOnly = sp.get("favorites") === "1";

  const list = useMemo(() => {
    let arr = data?.results ?? [];
    if (showFavsOnly) arr = arr.filter((c) => ids.includes(c.id));
    return arr;
  }, [data, showFavsOnly, ids]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Characters</h1>
        <span className="text-xs text-[var(--muted)]">
          {data?.info.count?.toLocaleString() ?? ""} total
        </span>
      </div>

      {/* Toolbar */}
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto] items-end">
        <SearchBar />
        <Filters />
        <div className="flex items-end gap-3">
          <SortSelect />
          <label className="text-sm inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={showFavsOnly}
              onChange={(e) => {
                const params = new URLSearchParams(sp.toString());
                if (e.target.checked) params.set("favorites", "1");
                else params.delete("favorites");
                params.delete("page");
                history.replaceState(null, "", `?${params.toString()}`);
                window.dispatchEvent(new Event("popstate"));
              }}
            />
            <span className="chip">Favorites only</span>
          </label>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="card p-6">
          <div className="font-medium">Something went wrong.</div>
          <div className="text-sm text-[var(--muted)] mb-3">
            {String((error as Error)?.message ?? "")}
          </div>
          <button className="btn" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && data && data.results.length === 0 && (
        <div className="card p-8 text-center">
          <div className="text-4xl mb-2">🛰️</div>
          <div className="font-medium">No results found</div>
          <div className="text-sm text-[var(--muted)]">
            Try changing your search or filters.
          </div>
        </div>
      )}

      {/* List */}
      {!isLoading && !isError && list.length > 0 && (
        <>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
            {list.map((c) => (
              <CharacterCard c={c} key={c.id} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Pagination pages={data!.info.pages} />
            <div className="text-sm text-[var(--muted)]">
              Showing {list.length} on this page
            </div>
          </div>
        </>
      )}
    </div>
  );
}
