import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/section";
import { PageBlocks } from "@/components/page-blocks";
import { getPublishedPage } from "@/lib/data";
import { parseBlocks } from "@/lib/blocks";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description ?? undefined,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function CustomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPublishedPage(slug);
  if (!page) notFound();

  const blocks = parseBlocks(page.blocks);
  const hasHero = blocks.some((b) => b.type === "hero");

  return (
    <article className="pb-16">
      {!hasHero && <PageHero title={page.title} subtitle={page.description ?? undefined} />}
      <PageBlocks blocks={blocks} />
    </article>
  );
}
