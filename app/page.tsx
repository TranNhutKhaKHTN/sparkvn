import Link from "next/link";
import { STAGES } from "@/lib/ideas";
import { getAllIdeas } from "@/lib/load-ideas";

const CARDS = [
  {
    title: "tại sao",
    items: [
      "AI giúp ai cũng build được app, nhưng đa số chỉ là dự án cá nhân, ít giá trị cho xã hội.",
      "Thiếu nguồn dữ liệu tập trung về các vấn đề thật đang tồn đọng.",
      "Không cần chờ nhà nước: người dân chủ động đề xuất và cùng giải quyết.",
    ],
  },
  {
    title: "lợi ích",
    items: [
      "Nơi nghiên cứu, thảo luận cùng người chung mục tiêu.",
      "Chỗ để chứng minh bản thân.",
      "Có thể có lợi ích sau này nếu dự án thành công.",
    ],
  },
  {
    title: "tầm nhìn",
    items: [
      "Mạnh dạn nêu ý tưởng, không ai chê là điên hay không khả thi.",
      "Nguồn dữ liệu vấn đề cho sinh viên và người đổi mới cùng giải quyết.",
      "Nền móng đổi mới tư duy: chủ động cống hiến, không chờ nhà nước.",
    ],
  },
];

export default function Home() {
  const ideas = getAllIdeas();
  const count = (s: string) => ideas.filter((i) => i.stage === s).length;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12">
      <p className="font-mono text-sm text-accent">$ spark --help</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
        Một ý tưởng nhỏ có thể châm ngòi cho thay đổi lớn.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Spark VN là nơi mọi người đóng góp ý tưởng dùng công nghệ để giải quyết các vấn đề thật của Việt Nam.
        Không ai chê ý tưởng điên hay không khả thi. Chỉ cần bạn trình bày rõ.
      </p>
      <Link
        href="/ideas"
        className="mt-6 inline-block border border-accent px-4 py-2 font-mono text-sm text-accent hover:bg-accent hover:text-background"
      >
        Xem ý tưởng →
      </Link>

      <section className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.title} className="bg-panel p-4">
            <h2 className="font-mono text-sm text-accent">## {c.title}</h2>
            <ul className="mt-3 space-y-2 text-xs text-muted">
              {c.items.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="font-mono text-accent">-</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-sm text-muted">## vòng đời ý tưởng</h2>
        <div className="mt-3 grid gap-px border border-line bg-line sm:grid-cols-4">
          {Object.entries(STAGES).map(([k, s], idx) => (
            <div key={k} className="bg-panel p-4">
              <div className="font-mono text-xs text-muted">0{idx + 1}</div>
              <div className="mt-1 font-mono font-semibold text-accent">{s.label}</div>
              <p className="mt-1 text-xs text-muted">{s.desc}</p>
              <div className="mt-3 font-mono text-2xl">{count(k)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-mono text-sm text-muted">## ai có thể tham gia</h2>
        <p className="mt-3 text-sm">
          Bất kỳ ai, không phân biệt tuổi tác, giới tính, tôn giáo, sắc tộc. Người biết code lẫn người không biết code.
        </p>
      </section>
    </main>
  );
}
