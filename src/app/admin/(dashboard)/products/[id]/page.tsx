import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "../actions";
import { productFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <AdminHeader title="تعديل منتج" description={product.title} />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={productFields} action={updateProduct.bind(null, id)} initial={product} cancelHref="/admin/products" submitLabel="حفظ التغييرات" />
      </div>
    </div>
  );
}
