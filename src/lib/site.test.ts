import { describe, it, expect } from "vitest";
import {
  products,
  services,
  navItems,
  projects,
  projectCategories,
  partners,
  getProduct,
  getService,
} from "@/lib/site";

function unique<T>(arr: T[]): boolean {
  return new Set(arr).size === arr.length;
}

describe("products", () => {
  it("have unique slugs", () => {
    expect(unique(products.map((p) => p.slug))).toBe(true);
  });
  it("each have a title, description, and features", () => {
    for (const p of products) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.features.length).toBeGreaterThan(0);
    }
  });
  it("getProduct resolves a known slug and rejects unknown", () => {
    expect(getProduct("hr")?.title).toBe("مسارات HR");
    expect(getProduct("does-not-exist")).toBeUndefined();
  });
});

describe("services", () => {
  it("have unique slugs", () => {
    expect(unique(services.map((s) => s.slug))).toBe(true);
  });
  it("each have overview and features", () => {
    for (const s of services) {
      expect(s.overview.length).toBeGreaterThan(0);
      expect(s.features.length).toBeGreaterThan(0);
      expect(["secondary", "primary"]).toContain(s.accent);
    }
  });
  it("getService resolves a known slug and rejects unknown", () => {
    expect(getService("cybersecurity")?.title).toContain("الأمن");
    expect(getService("nope")).toBeUndefined();
  });
});

describe("navigation", () => {
  it("has unique internal hrefs starting with '/'", () => {
    const hrefs = navItems.map((n) => n.href);
    expect(unique(hrefs)).toBe(true);
    for (const h of hrefs) expect(h.startsWith("/")).toBe(true);
  });
});

describe("projects", () => {
  it("use only declared categories and valid statuses", () => {
    for (const p of projects) {
      expect(projectCategories).toContain(p.category);
      expect(["قائم", "منتهي"]).toContain(p.status);
      expect(p.client.length).toBeGreaterThan(0);
    }
  });
});

describe("partners", () => {
  it("are derivable from project clients", () => {
    const clients = projects.map((p) => p.client);
    for (const partner of partners) {
      expect(clients.some((c) => c.includes(partner.name))).toBe(true);
    }
  });
});
