import fs from "node:fs";
import path from "node:path";
import { isStage, type Idea } from "./ideas";

const DIR = path.join(process.cwd(), "content", "ideas");
const RESOURCE_TYPES = ["repo", "video", "doc", "data", "other"] as const;

const bullets = (text = "") =>
  text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2).trim());

function parse(slug: string, raw: string): Idea | null {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;

  const fm: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  if (!fm.title || !fm.description) return null;

  const sections: Record<string, string> = {};
  for (const part of m[2].split(/^##\s+/m).slice(1)) {
    const nl = part.indexOf("\n");
    sections[part.slice(0, nl).trim().toLowerCase()] = part.slice(nl + 1);
  }
  const sec = (name: string) => sections[name.toLowerCase()];

  const roadmap = bullets(sec("Lộ trình triển khai")).flatMap((b) => {
    const r = b.match(/^\[( |x)\]\s*(?:\*\*(.+?)\*\*\s*:?\s*)?(.*)$/i);
    return r ? [{ done: r[1].toLowerCase() === "x", phase: r[2] ?? "", detail: r[3] }] : [];
  });

  const contact: Idea["contact"] = { name: "Ẩn danh" };
  for (const b of bullets(sec("Liên hệ người nêu ý tưởng"))) {
    const i = b.indexOf(":");
    if (i < 0) continue;
    const key = b.slice(0, i).trim().toLowerCase();
    const val = b.slice(i + 1).trim();
    if (!val) continue;
    if (key === "tên") contact.name = val;
    else if (key === "email") contact.email = val;
    else if (key === "link") contact.link = val;
  }

  const resources = bullets(sec("Dữ liệu của ý tưởng")).flatMap((b) => {
    const r = b.match(/^\[(\w+)\]\s*(.+?):\s*(https?:\/\/\S+)$/);
    if (!r) return [];
    const type = RESOURCE_TYPES.find((t) => t === r[1].toLowerCase()) ?? "other";
    return [{ type, label: r[2], url: r[3] }];
  });

  return {
    id: slug,
    title: fm.title,
    description: fm.description,
    field: fm.field || "Khác",
    stage: isStage(fm.stage) ? fm.stage : "spark",
    author: contact.name,
    createdAt: fm.created || "",
    goals: bullets(sec("Mục tiêu ý tưởng")),
    roadmap,
    contact,
    resources,
  };
}

export function getAllIdeas(): Idea[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .flatMap((f) => {
      const idea = parse(f.replace(/\.md$/, ""), fs.readFileSync(path.join(DIR, f), "utf8"));
      return idea ? [idea] : [];
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const getIdea = (id: string) => getAllIdeas().find((i) => i.id === id);
