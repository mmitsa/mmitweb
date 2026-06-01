import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

/** Record an admin mutation in the audit log (best-effort, never throws). */
export async function logAudit(
  action: "create" | "update" | "delete",
  entity: string,
  label?: string
) {
  try {
    const session = await auth();
    await prisma.auditLog.create({
      data: {
        userEmail: session?.user?.email ?? "غير معروف",
        action,
        entity,
        label: label ?? null,
      },
    });
  } catch (err) {
    console.error("[audit] failed to record:", err);
  }
}
