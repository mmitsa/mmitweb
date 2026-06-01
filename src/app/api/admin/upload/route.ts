import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { auth } from "@/auth";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
// Raster types only — SVG is excluded to avoid stored XSS via embedded scripts.
const ALLOWED = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/avif", "avif"],
]);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "لم يتم اختيار ملف" }, { status: 400 });
  }
  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return NextResponse.json({ error: "صيغة غير مدعومة (JPG, PNG, WEBP, GIF, AVIF)" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "حجم الصورة يتجاوز 5 ميغابايت" }, { status: 400 });
  }

  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/uploads/${filename}` });
}
