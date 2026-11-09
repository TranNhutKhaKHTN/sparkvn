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
  problem: string;
  field: string;
  stage: Stage;
  author: string;
  createdAt: string; // YYYY-MM-DD
  supporters: number;
  goals: string[];
  roadmap: { phase: string; detail: string; done: boolean }[];
  contact: { name: string; email?: string; link?: string };
  resources: { label: string; url: string; type: "repo" | "video" | "doc" | "data" | "other" }[];
};

// Dữ liệu mẫu — thay bằng dữ liệu thật (DB/API) sau.
export const IDEAS: Idea[] = [
  {
    id: "001",
    title: "Cảnh báo ngập đường theo thời gian thực",
    problem:
      "Người dân không biết tuyến đường nào đang ngập để tránh, gây kẹt xe và hư hỏng phương tiện mỗi mùa mưa.",
    field: "Giao thông",
    stage: "spark",
    author: "ẩn danh",
    createdAt: "2026-11-01",
    supporters: 42,
    goals: [
      "Cho người dân biết tuyến đường nào đang ngập theo thời gian thực.",
      "Giảm kẹt xe và hư hỏng phương tiện trong mùa mưa.",
    ],
    roadmap: [
      { phase: "Giai đoạn 1", detail: "Khảo sát nguồn dữ liệu (cảm biến, camera, người dân báo cáo).", done: false },
      { phase: "Giai đoạn 2", detail: "Prototype bản đồ ngập cho một quận.", done: false },
      { phase: "Giai đoạn 3", detail: "Mở rộng toàn thành phố và gửi cảnh báo.", done: false },
    ],
    contact: { name: "Ẩn danh", email: "contact@example.com" },
    resources: [{ label: "Git repository (chưa có)", url: "https://github.com", type: "repo" }],
  },
  {
    id: "002",
    title: "Tra cứu thuốc và tương tác thuốc bằng tiếng Việt",
    problem:
      "Người lớn tuổi khó đọc hướng dẫn sử dụng thuốc, dễ dùng sai hoặc trùng hoạt chất.",
    field: "Y tế",
    stage: "kindle",
    author: "ẩn danh",
    createdAt: "2026-10-20",
    supporters: 31,
    goals: [
      "Tra cứu thuốc bằng tiếng Việt, dễ đọc cho người lớn tuổi.",
      "Cảnh báo tương tác thuốc và trùng hoạt chất.",
    ],
    roadmap: [
      { phase: "Giai đoạn 1", detail: "Thu thập cơ sở dữ liệu thuốc công khai.", done: true },
      { phase: "Giai đoạn 2", detail: "Prototype quét hộp thuốc bằng camera.", done: false },
      { phase: "Giai đoạn 3", detail: "Thử nghiệm với nhà thuốc và người dùng thật.", done: false },
    ],
    contact: { name: "Ẩn danh", email: "contact@example.com" },
    resources: [{ label: "Nguồn dữ liệu thuốc", url: "https://example.com", type: "data" }],
  },
  {
    id: "003",
    title: "Dự báo giá nông sản cho nông dân nhỏ lẻ",
    problem:
      "Nông dân thiếu thông tin giá thị trường nên bị ép giá và khó quyết định thời điểm thu hoạch.",
    field: "Nông nghiệp",
    stage: "ignite",
    author: "ẩn danh",
    createdAt: "2026-09-12",
    supporters: 58,
    goals: [
      "Cung cấp dự báo giá nông sản dễ hiểu cho nông dân nhỏ lẻ.",
      "Giúp chọn thời điểm thu hoạch và bán hợp lý, tránh bị ép giá.",
    ],
    roadmap: [
      { phase: "Giai đoạn 1", detail: "Thu thập dữ liệu giá nhiều năm.", done: true },
      { phase: "Giai đoạn 2", detail: "Xây mô hình dự báo cho 3 loại nông sản.", done: true },
      { phase: "Giai đoạn 3", detail: "Thử nghiệm với một hợp tác xã.", done: false },
    ],
    contact: { name: "Ẩn danh", email: "contact@example.com" },
    resources: [
      { label: "Git repository", url: "https://github.com", type: "repo" },
      { label: "Video giới thiệu", url: "https://youtube.com", type: "video" },
    ],
  },
  {
    id: "004",
    title: "Trợ lý học tập cho học sinh vùng sâu vùng xa",
    problem:
      "Thiếu giáo viên giỏi và tài liệu ở vùng khó khăn; học sinh không có ai giải đáp bài tập.",
    field: "Giáo dục",
    stage: "spark",
    author: "ẩn danh",
    createdAt: "2026-11-05",
    supporters: 19,
    goals: [
      "Giải đáp bài tập cho học sinh vùng khó khăn bằng AI.",
      "Hoạt động tốt với kết nối mạng yếu.",
    ],
    roadmap: [
      { phase: "Giai đoạn 1", detail: "Xác định môn và cấp học ưu tiên.", done: false },
      { phase: "Giai đoạn 2", detail: "Prototype chatbot hỏi đáp bài tập.", done: false },
    ],
    contact: { name: "Ẩn danh", email: "contact@example.com" },
    resources: [],
  },
];

export const getIdea = (id: string) => IDEAS.find((i) => i.id === id);
