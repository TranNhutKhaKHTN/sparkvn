import type { Metadata } from "next";

export const metadata: Metadata = { title: "Hướng dẫn · Spark VN" };

const FIELDS = [
  ["Tiêu đề", "Ngắn gọn, nói rõ giải quyết việc gì cho ai."],
  ["Mô tả ngắn", "1-2 câu nêu vấn đề thật: ai bị ảnh hưởng và ảnh hưởng thế nào."],
  ["Mục tiêu ý tưởng", "2-4 mục tiêu cụ thể, càng đo lường được càng tốt."],
  ["Lộ trình triển khai", "Ít nhất 2 giai đoạn, mỗi giai đoạn có việc cần làm."],
  ["Trạng thái triển khai", "spark, kindle, ignite hoặc flame. Ý tưởng mới là spark."],
  ["Liên hệ người nêu ý tưởng", "Tên (có thể ẩn danh), email hoặc link."],
  ["Dữ liệu của ý tưởng", "Git repository, video giới thiệu, tài liệu... (không bắt buộc)."],
];

const SAMPLE = `---
title: Cảnh báo ngập đường theo thời gian thực
description: Người dân không biết tuyến đường nào đang ngập để tránh.
field: Giao thông
stage: spark
created: 2026-11-01
---

## Mục tiêu ý tưởng

- Cho người dân biết tuyến đường đang ngập theo thời gian thực.
- Giảm kẹt xe trong mùa mưa.

## Lộ trình triển khai

- [ ] **Giai đoạn 1**: Khảo sát nguồn dữ liệu.
- [ ] **Giai đoạn 2**: Prototype bản đồ ngập cho một quận.

## Liên hệ người nêu ý tưởng

- Tên: Ẩn danh
- Email: ban@example.com

## Dữ liệu của ý tưởng

Chưa có.`;

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 bg-panel p-4">
      <span className="font-mono text-accent">0{n}</span>
      <div className="min-w-0 text-sm">
        <div className="font-semibold">{title}</div>
        <div className="mt-1 text-muted">{children}</div>
      </div>
    </li>
  );
}

const code = "bg-background px-1 font-mono text-foreground";

export default function GuidePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="font-mono text-xl font-semibold">Hướng dẫn</h1>
      <p className="mt-1 text-sm text-muted">
        Dùng skill <span className={code}>spark-idea</span> trong Claude Code để viết mô tả ý tưởng đúng template.
        Skill sẽ hỏi bạn từng bước, bạn không cần biết lập trình.
      </p>

      <h2 className="mt-10 font-mono text-sm text-muted">## các bước</h2>
      <ol className="mt-3 divide-y divide-line border border-line">
        <Step n={1} title="Tải skill">
          <a href="/skills/spark-idea/SKILL.md" download className="text-accent hover:underline">
            Tải SKILL.md
          </a>
          , rồi đặt vào thư mục <span className={code}>~/.claude/skills/spark-idea/SKILL.md</span> (dùng cho mọi dự án),
          hoặc <span className={code}>.claude/skills/spark-idea/SKILL.md</span> trong thư mục dự án của bạn.
        </Step>
        <Step n={2} title="Mở Claude Code và gọi skill">
          Gõ <span className={code}>/spark-idea</span>, có thể kèm ý tưởng ngắn, ví dụ{" "}
          <span className={code}>/spark-idea cảnh báo ngập đường</span>.
        </Step>
        <Step n={3} title="Trả lời các câu hỏi">
          Skill hỏi từng nhóm nhỏ theo template bên dưới. Không ai đánh giá ý tưởng của bạn là điên hay không khả thi.
          Mục nào chưa biết thì cứ nói chưa có.
        </Step>
        <Step n={4} title="Xác nhận và nhận file">
          Skill tóm tắt để bạn kiểm tra, rồi tạo file <span className={code}>ten-y-tuong.md</span> theo đúng template.
        </Step>
        <Step n={5} title="Tạo Pull Request và chờ duyệt">
          Skill hỏi xác nhận, rồi tự tạo nhánh <span className={code}>idea/ten-y-tuong</span>, thêm file vào{" "}
          <span className={code}>content/ideas/</span> và mở Pull Request vào repo Spark VN. Ý tưởng chỉ hiện trên
          trang sau khi người duyệt merge. Cần cài sẵn và đăng nhập <span className={code}>gh</span> (GitHub CLI).
        </Step>
      </ol>

      <h2 className="mt-10 font-mono text-sm text-muted">## dành cho agent</h2>
      <div className="mt-3 border border-line bg-panel p-4 text-sm">
        <p className="text-muted">
          Khi agent (hoặc bạn) có một ý tưởng mới, hãy làm theo quy trình sau thay vì tự viết tay:
        </p>
        <ol className="mt-3 list-inside list-decimal space-y-1">
          <li>Cài skill <span className={code}>spark-idea</span> (bước 1 ở trên) và gọi <span className={code}>/spark-idea</span>.</li>
          <li>Sinh mô tả đúng template, chỉ dùng thông tin người dùng cung cấp, không tự bịa.</li>
          <li>Hỏi người dùng xác nhận nội dung trước khi đưa lên repo công khai.</li>
          <li>
            Mỗi ý tưởng một nhánh <span className={code}>idea/&lt;slug&gt;</span>, chỉ thêm đúng một file{" "}
            <span className={code}>content/ideas/&lt;slug&gt;.md</span>.
          </li>
          <li>Tạo PR vào <span className={code}>main</span>, rồi <b>chờ duyệt</b>. Không tự merge.</li>
          <li>Nếu có yêu cầu chỉnh sửa, cập nhật trên cùng nhánh và push tiếp.</li>
        </ol>
        <p className="mt-3 text-xs text-muted">Câu lệnh mẫu giao cho agent:</p>
        <pre className="mt-1 overflow-x-auto bg-background p-3 font-mono text-xs">
          {"Dùng skill spark-idea để viết mô tả cho ý tưởng: <ý tưởng của bạn>, rồi tạo PR vào TranNhutKhaKHTN/sparkvn và chờ duyệt."}
        </pre>
      </div>

      <h2 className="mt-10 font-mono text-sm text-muted">## template mô tả ý tưởng</h2>
      <ul className="mt-3 divide-y divide-line border border-line">
        {FIELDS.map(([name, desc]) => (
          <li key={name} className="flex flex-col gap-1 bg-panel p-3 text-sm sm:flex-row sm:gap-4">
            <span className="font-mono text-accent sm:w-56 sm:shrink-0">{name}</span>
            <span className="text-muted">{desc}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-mono text-sm text-muted">## ví dụ file đầu ra (content/ideas/canh-bao-ngap-duong.md)</h2>
      <pre className="mt-3 overflow-x-auto border border-line bg-panel p-4 font-mono text-xs leading-relaxed">
        {SAMPLE}
      </pre>
    </main>
  );
}
