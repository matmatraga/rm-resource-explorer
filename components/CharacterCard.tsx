import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { Character } from "@/lib/types";

const statusColor: Record<string, string> = {
  Alive: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  Dead: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
  unknown: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
};

export default function CharacterCard({ c }: { c: Character }) {
  return (
    <Link
      href={`/characters/${c.id}`}
      className="card block overflow-hidden transition hover:shadow-md hover:-translate-y-[2px]"
    >
      <div className="relative">
        <Image
          src={c.image}
          alt={c.name}
          width={400}
          height={400}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute right-2 top-2">
          <FavoriteButton id={c.id} />
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="font-medium truncate">{c.name}</div>
          <span className={`chip ${statusColor[c.status] ?? ""}`}>
            {c.status}
          </span>
        </div>
        <div className="mt-1 text-sm text-[var(--muted)] truncate">
          {c.species} • {c.gender}
        </div>
      </div>
    </Link>
  );
}
