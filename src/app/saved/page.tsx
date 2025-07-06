import { Skeleton } from "primereact/skeleton";

export default function SavedPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Palettes & Gradients</h1>
      <Skeleton width="100%" height="8rem" className="mb-4" />
      <Skeleton width="100%" height="8rem" />
    </main>
  );
}
