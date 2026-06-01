export const INQUIRY_STATUSES = ["new", "in_progress", "closed"] as const;

export const STATUS_LABEL: Record<string, string> = {
  new: "جديد",
  in_progress: "قيد المعالجة",
  closed: "مغلق",
};

export const STATUS_COLOR: Record<string, string> = {
  new: "bg-secondary text-on-secondary",
  in_progress: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  closed: "bg-surface-container text-on-surface-variant",
};
