import { prisma } from "@/lib/prisma";

export const getSettings = () => prisma.settings.findUnique({ where: { id: 1 } });

export const getServices = () =>
  prisma.service.findMany({ orderBy: { order: "asc" } });
export const getService = (slug: string) =>
  prisma.service.findUnique({ where: { slug } });

export const getProducts = () =>
  prisma.product.findMany({ orderBy: { order: "asc" } });
export const getProduct = (slug: string) =>
  prisma.product.findUnique({ where: { slug } });

export const getProjects = () =>
  prisma.project.findMany({ orderBy: { order: "asc" } });

export const getPartners = () =>
  prisma.partner.findMany({ orderBy: { order: "asc" } });

export const getFaqs = () => prisma.faq.findMany({ orderBy: { order: "asc" } });

export const getAdvantages = () =>
  prisma.advantage.findMany({ orderBy: { order: "asc" } });
export const getSectors = () =>
  prisma.sector.findMany({ orderBy: { order: "asc" } });
export const getProcessSteps = () =>
  prisma.processStep.findMany({ orderBy: { order: "asc" } });

export const getPages = () =>
  prisma.page.findMany({ orderBy: { updatedAt: "desc" } });
export const getPublishedPage = (slug: string) =>
  prisma.page.findFirst({ where: { slug, published: true } });

export const getInquiries = () =>
  prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
export const getUnreadInquiryCount = () =>
  prisma.inquiry.count({ where: { read: false } });
