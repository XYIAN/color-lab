import { Skeleton } from "primereact/skeleton";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">About Color Lab</h1>
      <Skeleton width="80%" height="2rem" className="mb-2" />
      <Skeleton width="60%" height="2rem" className="mb-2" />
      <Skeleton width="40%" height="2rem" />
    </main>
  );
}
