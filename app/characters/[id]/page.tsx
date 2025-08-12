"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { useNotes } from "@/lib/useFavorites";

export default function CharacterDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["character", params.id],
    queryFn: ({ signal }) => fetchCharacter(params.id, signal),
  });

  const { getNote, setNote } = useNotes();
  const note = getNote(Number(params.id));

  if (isLoading) return <div className="card p-6">Loading…</div>;
  if (isError)
    return (
      <div className="card p-6">
        <div className="font-medium">Failed to load.</div>
        <div className="text-sm text-[var(--muted)] mb-3">
          {String((error as Error)?.message ?? "")}
        </div>
        <button className="btn" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );

  const c = data!;

  return (
    <div className="grid gap-6 md:grid-cols-[360px,1fr]">
      <div className="md:sticky md:top-24 h-fit card overflow-hidden">
        <Image
          src={c.image}
          alt={c.name}
          width={800}
          height={800}
          className="w-full object-cover"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">{c.name}</h1>
          <FavoriteButton id={c.id} size="md" />
        </div>

        <div className="card grid grid-cols-2 gap-3 p-4 text-sm">
          <div>
            <span className="text-[var(--muted)]">Status:</span> {c.status}
          </div>
          <div>
            <span className="text-[var(--muted)]">Species:</span> {c.species}
          </div>
          <div>
            <span className="text-[var(--muted)]">Gender:</span> {c.gender}
          </div>
          <div>
            <span className="text-[var(--muted)]">Episodes:</span>{" "}
            {c.episode.length}
          </div>
          <div className="col-span-2">
            <span className="text-[var(--muted)]">Origin:</span> {c.origin.name}
          </div>
          <div className="col-span-2">
            <span className="text-[var(--muted)]">Location:</span>{" "}
            {c.location.name}
          </div>
        </div>

        <form
          className="card p-4 space-y-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="font-medium">Notes</div>
          <label className="block text-sm">
            <span className="sr-only">Add a note</span>
            <textarea
              className="input p-3"
              rows={4}
              placeholder="Add your personal note about this character…"
              value={note}
              onChange={(e) => setNote(c.id, e.target.value)}
            />
          </label>
          <div className="text-xs text-[var(--muted)]">
            Notes are saved locally in your browser.
          </div>
        </form>

        <Link href="/characters" className="btn w-fit">
          ← Back to list
        </Link>
      </div>
    </div>
  );
}
