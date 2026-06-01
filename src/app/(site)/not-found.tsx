import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="flex flex-col items-center text-center">
        <Icon name="travel_explore" className="mb-4 text-[72px] text-secondary" />
        <p className="font-head text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-head font-semibold text-primary">
          الصفحة غير موجودة
        </h1>
        <p className="mt-3 max-w-md text-on-surface-variant">
          عذرًا، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها. يمكنك العودة إلى
          الصفحة الرئيسية أو تصفّح خدماتنا.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="primary">
            <Icon name="home" className="text-[18px]" />
            العودة للرئيسية
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            تواصل معنا
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
