import type { MetadataRoute } from "next";
import { products, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/products",
    "/portfolio",
    "/partners",
    "/about",
    "/contact",
    "/privacy",
    ...products.map((p) => `/products/${p.slug}`),
  ];
  const lastModified = new Date("2026-05-31");

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
