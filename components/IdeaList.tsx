"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { STAGES, type Idea, type Stage } from "@/lib/ideas";

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

export default function IdeaList({ ideas }: { ideas: Idea[] }) {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");

  const results = useMemo(() => {
    const nq = norm(q.trim());
    return ideas.filter((i) => {
      if (stage !== "all" && i.stage !== stage) return false;
      if (!nq) return true;
      return norm(`${i.title} ${i.description} ${i.field}`).includes(nq);
    });
  }, [ideas, q, stage]);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm ý tưởng, vấn đề, lĩnh vực..."
        className="w-full border border-line bg-panel px-3 py-2 font-mono text-sm outline-none focus:border-accent"
      />
      <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
        {(["all", ...Object.keys(STAGES)] as (Stage | "all")[]).map((s) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            className={`border px-2 py-1 ${
              stage === s ? "border-accent text-accent" : "border-line text-muted hover:text-foreground"
            }`}
          >
            {s === "all" ? "Tất cả" : STAGES[s].label}
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono text-xs text-muted">{results.length} kết quả</p>

      <ul className="mt-2 divide-y divide-line border border-line">
        {results.map((i) => (
          <li key={i.id} className="bg-panel p-4">
            <div className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="text-accent">[{STAGES[i.stage].label}]</span>
              <span>{i.field}</span>
            </div>
            <h3 className="mt-1 font-semibold">
              <Link href={`/ideas/${i.id}`} className="hover:text-accent">
                {i.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted">{i.description}</p>
            <p className="mt-2 font-mono text-xs text-muted">
              {i.author} · {i.createdAt}
            </p>
          </li>
        ))}
        {results.length === 0 && (
          <li className="bg-panel p-6 text-center font-mono text-sm text-muted">
            {ideas.length === 0 ? (
              <>
                Chưa có ý tưởng nào. Hãy là người đầu tiên, xem{" "}
                <Link href="/guide" className="text-accent hover:underline">Hướng dẫn</Link>.
              </>
            ) : (
              "Không tìm thấy."
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
