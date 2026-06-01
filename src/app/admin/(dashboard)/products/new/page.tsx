import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { createProduct } from "../actions";
import { productFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const count = await prisma.product.count();
  return (
    <div>
      <AdminHeader title="إضافة منتج" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={productFields} action={createProduct} initial={{ order: count }} cancelHref="/admin/products" submitLabel="إضافة" />
      </div>
    </div>
  );
}
