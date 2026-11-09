import type { Metadata } from "next";
import IdeaList from "@/components/IdeaList";

export const metadata: Metadata = { title: "Ý tưởng · Spark VN" };

export default function IdeasPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="font-mono text-xl font-semibold">/ideas</h1>
      <p className="mb-6 mt-1 text-sm text-muted">Danh sách vấn đề và ý tưởng công nghệ do cộng đồng đề xuất.</p>
      <IdeaList />
    </main>
  );
}
