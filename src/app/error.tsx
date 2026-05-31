"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="flex flex-col items-center text-center">
        <Icon name="error" className="mb-4 text-[64px] text-error" />
        <h1 className="text-2xl font-head font-semibold text-primary">
          حدث خطأ غير متوقع
        </h1>
        <p className="mt-3 max-w-md text-on-surface-variant">
          نعتذر، حدث خلل أثناء تحميل هذه الصفحة. يمكنك المحاولة مرة أخرى أو العودة
          للصفحة الرئيسية.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded bg-secondary px-6 py-3 font-head text-sm font-medium text-on-secondary shadow-sm transition-colors hover:bg-secondary-container"
          >
            <Icon name="refresh" className="text-[18px]" />
            إعادة المحاولة
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded border border-primary px-6 py-3 font-head text-sm font-medium text-primary transition-colors hover:bg-surface-container-low"
          >
            العودة للرئيسية
          </Link>
        </div>
      </Container>
    </section>
  );
}
