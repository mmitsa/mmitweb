"use client";

import { Icon } from "@/components/icon";

export function DeleteButton({
  action,
  message = "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
}: {
  action: () => void | Promise<void>;
  message?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        aria-label="حذف"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error-container hover:text-on-error-container"
      >
        <Icon name="delete" className="text-[20px]" />
      </button>
    </form>
  );
}
