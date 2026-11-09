import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IDEAS, STAGES, getIdea } from "@/lib/ideas";

export function generateStaticParams() {
  return IDEAS.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: PageProps<"/ideas/[id]">): Promise<Metadata> {
  const { id } = await params;
  const idea = getIdea(id);
  return { title: idea ? `${idea.title} · Spark VN` : "Không tìm thấy" };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-mono text-sm text-muted">## {title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function IdeaPage({ params }: PageProps<"/ideas/[id]">) {
  const { id } = await params;
  const idea = getIdea(id);
  if (!idea) notFound();

  const stageKeys = Object.keys(STAGES);
  const current = stageKeys.indexOf(idea.stage);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link href="/ideas" className="font-mono text-xs text-muted hover:text-foreground">
        ← /ideas
      </Link>

      <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
        <span>#{idea.id}</span>
        <span className="text-accent">[{STAGES[idea.stage].label}]</span>
        <span>{idea.field}</span>
        <span className="ml-auto">▲ {idea.supporters}</span>
      </div>
      <h1 className="mt-2 text-2xl font-bold">{idea.title}</h1>
      <p className="mt-2 text-muted">{idea.problem}</p>

      <Section title="mục tiêu ý tưởng">
        <ul className="space-y-2 text-sm">
          {idea.goals.map((g) => (
            <li key={g} className="flex gap-2">
              <span className="font-mono text-accent">-</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="lộ trình triển khai">
        <ol className="divide-y divide-line border border-line">
          {idea.roadmap.map((r) => (
            <li key={r.phase} className="flex gap-3 bg-panel p-3 text-sm">
              <span className={`font-mono ${r.done ? "text-accent" : "text-muted"}`}>
                [{r.done ? "x" : " "}]
              </span>
              <div>
                <div className="font-mono text-xs text-muted">{r.phase}</div>
                <div>{r.detail}</div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="trạng thái triển khai">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-4">
          {stageKeys.map((k, idx) => (
            <div key={k} className="bg-panel p-3">
              <div className={`font-mono text-sm ${idx <= current ? "text-accent" : "text-muted"}`}>
                {idx <= current ? "●" : "○"} {STAGES[k as keyof typeof STAGES].label}
              </div>
              <p className="mt-1 text-xs text-muted">{STAGES[k as keyof typeof STAGES].desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="liên hệ người nêu ý tưởng">
        <div className="border border-line bg-panel p-3 font-mono text-sm">
          <div>{idea.contact.name}</div>
          {idea.contact.email && (
            <a href={`mailto:${idea.contact.email}`} className="text-accent hover:underline">
              {idea.contact.email}
            </a>
          )}
          {idea.contact.link && (
            <div>
              <a href={idea.contact.link} className="text-accent hover:underline">
                {idea.contact.link}
              </a>
            </div>
          )}
          <div className="mt-1 text-xs text-muted">đề xuất ngày {idea.createdAt}</div>
        </div>
      </Section>

      <Section title="dữ liệu của ý tưởng">
        {idea.resources.length === 0 ? (
          <p className="font-mono text-sm text-muted">Chưa có.</p>
        ) : (
          <ul className="divide-y divide-line border border-line">
            {idea.resources.map((r) => (
              <li key={r.url + r.label} className="flex items-center gap-3 bg-panel p-3 text-sm">
                <span className="w-14 font-mono text-xs uppercase text-muted">{r.type}</span>
                <a href={r.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}
