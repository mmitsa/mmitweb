import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { PageEditor } from "@/components/admin/page-editor";
import { prisma } from "@/lib/prisma";
import { parseBlocks } from "@/lib/blocks";
import { updatePage } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <div>
      <AdminHeader title="تعديل صفحة" description={page.title} />
      <PageEditor
        action={updatePage.bind(null, id)}
        initial={{
          title: page.title,
          slug: page.slug,
          description: page.description ?? "",
          published: page.published,
          blocks: parseBlocks(page.blocks),
        }}
        cancelHref="/admin/pages"
        submitLabel="حفظ التغييرات"
      />
    </div>
  );
}
