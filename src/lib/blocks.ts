export type Block =
  | { type: "hero"; eyebrow?: string; title: string; subtitle?: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "image"; src: string; alt?: string }
  | { type: "cta"; title: string; text?: string; buttonLabel: string; buttonHref: string };

export type BlockType = Block["type"];

type FieldKind = "text" | "textarea" | "lines" | "image";
type FieldDef = { name: string; label: string; kind: FieldKind };

export const BLOCK_DEFS: Record<BlockType, { label: string; icon: string; fields: FieldDef[] }> = {
  hero: {
    label: "غلاف (Hero)",
    icon: "wallpaper",
    fields: [
      { name: "eyebrow", label: "تمهيد (اختياري)", kind: "text" },
      { name: "title", label: "العنوان", kind: "text" },
      { name: "subtitle", label: "الوصف", kind: "textarea" },
    ],
  },
  heading: {
    label: "عنوان قسم",
    icon: "title",
    fields: [{ name: "text", label: "النص", kind: "text" }],
  },
  paragraph: {
    label: "فقرة نصية",
    icon: "notes",
    fields: [{ name: "text", label: "النص", kind: "textarea" }],
  },
  list: {
    label: "قائمة",
    icon: "checklist",
    fields: [
      { name: "title", label: "العنوان (اختياري)", kind: "text" },
      { name: "items", label: "العناصر (سطر لكل عنصر)", kind: "lines" },
    ],
  },
  image: {
    label: "صورة",
    icon: "image",
    fields: [
      { name: "src", label: "الصورة", kind: "image" },
      { name: "alt", label: "وصف بديل (اختياري)", kind: "text" },
    ],
  },
  cta: {
    label: "دعوة لإجراء",
    icon: "ads_click",
    fields: [
      { name: "title", label: "العنوان", kind: "text" },
      { name: "text", label: "الوصف", kind: "textarea" },
      { name: "buttonLabel", label: "نص الزر", kind: "text" },
      { name: "buttonHref", label: "رابط الزر", kind: "text" },
    ],
  },
};

export const BLOCK_ORDER: BlockType[] = ["hero", "heading", "paragraph", "list", "image", "cta"];

export function emptyBlock(type: BlockType): Block {
  switch (type) {
    case "hero": return { type, eyebrow: "", title: "", subtitle: "" };
    case "heading": return { type, text: "" };
    case "paragraph": return { type, text: "" };
    case "list": return { type, title: "", items: [] };
    case "image": return { type, src: "", alt: "" };
    case "cta": return { type, title: "", text: "", buttonLabel: "", buttonHref: "" };
  }
}

/** Coerce unknown JSON into a safe Block[] (drops invalid entries). */
export function parseBlocks(value: unknown): Block[] {
  if (!Array.isArray(value)) return [];
  const out: Block[] = [];
  for (const b of value) {
    if (!b || typeof b !== "object") continue;
    const type = (b as { type?: string }).type as BlockType | undefined;
    if (!type || !(type in BLOCK_DEFS)) continue;
    const rec = b as Record<string, unknown>;
    const str = (k: string) => (typeof rec[k] === "string" ? (rec[k] as string) : "");
    if (type === "list") {
      const items = Array.isArray(rec.items) ? rec.items.filter((x): x is string => typeof x === "string") : [];
      out.push({ type, title: str("title"), items });
    } else if (type === "hero") {
      out.push({ type, eyebrow: str("eyebrow"), title: str("title"), subtitle: str("subtitle") });
    } else if (type === "cta") {
      out.push({ type, title: str("title"), text: str("text"), buttonLabel: str("buttonLabel"), buttonHref: str("buttonHref") });
    } else if (type === "image") {
      out.push({ type, src: str("src"), alt: str("alt") });
    } else {
      out.push({ type, text: str("text") } as Block);
    }
  }
  return out;
}
