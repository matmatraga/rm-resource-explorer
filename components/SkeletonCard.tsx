export default function SkeletonCard() {
  return (
    <div className="card p-3 animate-pulse">
      <div className="aspect-square w-full rounded-xl bg-black/10 dark:bg-white/10" />
      <div className="mt-3 h-5 w-2/3 rounded bg-black/10 dark:bg-white/10" />
      <div className="mt-2 h-4 w-1/2 rounded bg-black/10 dark:bg-white/10" />
    </div>
  );
}
