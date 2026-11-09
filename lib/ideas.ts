export type Stage = "spark" | "kindle" | "ignite" | "flame";

export const STAGES: Record<Stage, { label: string; desc: string }> = {
  spark: { label: "Spark", desc: "Ý tưởng mới được đề xuất" },
  kindle: { label: "Kindle", desc: "Có người quan tâm, đang thảo luận" },
  ignite: { label: "Ignite", desc: "Được duyệt, đang nghiên cứu/xây dựng" },
  flame: { label: "Flame", desc: "Đã triển khai, có tác động thật" },
};

export type Idea = {
  id: string;
  title: string;
  description: string;
  field: string;
  stage: Stage;
  author: string;
  createdAt: string; // YYYY-MM-DD
  goals: string[];
  roadmap: { phase: string; detail: string; done: boolean }[];
  contact: { name: string; email?: string; link?: string };
  resources: { label: string; url: string; type: "repo" | "video" | "doc" | "data" | "other" }[];
};

export const isStage = (v: string): v is Stage => v in STAGES;
