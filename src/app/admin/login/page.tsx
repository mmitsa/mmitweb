"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = {};

const inputClasses =
  "w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-on-surface focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <div className="paths-surface flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo className="h-12 w-auto" />
          <h1 className="text-2xl font-head font-bold text-primary">لوحة التحكم</h1>
          <p className="text-sm text-on-surface-variant">سجّل دخولك لإدارة محتوى الموقع</p>
        </div>

        <form
          action={action}
          className="space-y-5 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 soft-shadow"
        >
          {state.error && (
            <div className="flex items-center gap-2 rounded-lg border border-error/30 bg-error-container px-4 py-3 text-sm text-on-error-container">
              <Icon name="error" className="text-[20px]" />
              {state.error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-2 block font-head text-sm text-on-surface-variant">
              البريد الإلكتروني
            </label>
            <input id="email" name="email" type="email" required dir="ltr" autoComplete="email" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block font-head text-sm text-on-surface-variant">
              كلمة المرور
            </label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className={inputClasses} />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-head text-sm font-medium text-on-secondary shadow-sm transition-colors hover:bg-secondary-container disabled:opacity-60"
          >
            {pending ? "جارٍ الدخول..." : "تسجيل الدخول"}
            <Icon name={pending ? "progress_activity" : "login"} className={pending ? "animate-spin text-[18px]" : "text-[18px]"} />
          </button>
        </form>
      </div>
    </div>
  );
}
