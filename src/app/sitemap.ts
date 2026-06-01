import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings();
  const base = settings?.url ?? site.url;
  const lastModified = new Date();

  const [services, products, pages] = await Promise.all([
    prisma.service.findMany({ select: { slug: true } }),
    prisma.product.findMany({ select: { slug: true } }),
    prisma.page.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes = [
    "",
    "/services",
    "/products",
    "/portfolio",
    "/partners",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified, priority: 0.6 })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified, priority: 0.6 })),
    ...pages.map((p) => ({ url: `${base}/${p.slug}`, lastModified: p.updatedAt, priority: 0.5 })),
  ];
}
