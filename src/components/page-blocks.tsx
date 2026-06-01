import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { PageHero, SectionHeading } from "@/components/section";
import type { Block } from "@/lib/blocks";

export function PageBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "hero":
            return <PageHero key={i} title={block.title} subtitle={block.subtitle} eyebrow={block.eyebrow || undefined} />;

          case "heading":
            return (
              <section key={i} className="pt-12">
                <Container>
                  <SectionHeading title={block.text} />
                </Container>
              </section>
            );

          case "paragraph":
            return (
              <section key={i} className="py-4">
                <Container>
                  <p className="max-w-3xl whitespace-pre-line text-lg leading-loose text-on-surface-variant">
                    {block.text}
                  </p>
                </Container>
              </section>
            );

          case "list":
            return (
              <section key={i} className="py-4">
                <Container>
                  {block.title && (
                    <h3 className="mb-4 text-xl font-head font-semibold text-primary">{block.title}</h3>
                  )}
                  <ul className="grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-4 soft-shadow">
                        <Icon name="check_circle" filled className="mt-0.5 flex-shrink-0 text-secondary" />
                        <span className="text-on-surface-variant">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Container>
              </section>
            );

          case "image":
            return block.src ? (
              <section key={i} className="py-6">
                <Container>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.src}
                    alt={block.alt || ""}
                    className="mx-auto max-h-[560px] w-full rounded-2xl border border-outline-variant/20 object-cover soft-shadow"
                  />
                </Container>
              </section>
            ) : null;

          case "cta":
            return (
              <section key={i} className="my-10">
                <Container>
                  <div className="relative overflow-hidden rounded-2xl bg-secondary px-8 py-12 text-center text-on-secondary">
                    <div className="bg-diagonal pointer-events-none absolute inset-0 opacity-60" />
                    <div className="relative z-10">
                      <h2 className="text-2xl font-head font-bold text-on-secondary md:text-3xl">{block.title}</h2>
                      {block.text && <p className="mx-auto mt-3 max-w-2xl text-on-secondary/90">{block.text}</p>}
                      {block.buttonLabel && (
                        <div className="mt-6 flex justify-center">
                          <ButtonLink href={block.buttonHref || "/contact"} variant="dark" className="bg-on-secondary text-secondary hover:bg-white">
                            {block.buttonLabel}
                            <Icon name="arrow_back" className="text-[18px]" />
                          </ButtonLink>
                        </div>
                      )}
                    </div>
                  </div>
                </Container>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
