import { Suspense } from "react";
import ClientPage from "./characters/page";
import SkeletonCard from "@/components/SkeletonCard";

function Fallback() {
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <ClientPage />
    </Suspense>
  );
}
