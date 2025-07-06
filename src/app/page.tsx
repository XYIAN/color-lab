import { Skeleton } from "primereact/skeleton";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Color Lab</h1>
      <Skeleton width="100%" height="12rem" className="mb-6" />
      <Skeleton width="80%" height="6rem" />
    </main>
  );
}
