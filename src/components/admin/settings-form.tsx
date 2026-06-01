"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icon";
import { ImageField } from "@/components/admin/image-field";
import {
  updateSettings,
  type SettingsState,
} from "@/app/admin/(dashboard)/settings/actions";

type Values = {
  name: string;
  tagline: string;
  url: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  address: string;
  logo: string;
  logoWhite: string;
  inquiryEmail: string;
  emailFrom: string;
  turnstileSiteKey: string;
  telegramChatId: string;
  hasApiKey: boolean;
  hasTurnstileSecret: boolean;
  hasTelegramToken: boolean;
};

const companyFields: { name: keyof Values; label: string; dir?: "ltr"; type?: string }[] = [
  { name: "name", label: "اسم الشركة" },
  { name: "tagline", label: "الوصف المختصر" },
  { name: "url", label: "رابط الموقع", dir: "ltr", type: "url" },
  { name: "email", label: "البريد الإلكتروني (المعروض)", dir: "ltr", type: "email" },
  { name: "phone", label: "رقم الهاتف (للروابط)", dir: "ltr" },
  { name: "phoneDisplay", label: "رقم الهاتف (للعرض)", dir: "ltr" },
  { name: "whatsapp", label: "رقم واتساب (دولي)", dir: "ltr" },
  { name: "address", label: "العنوان" },
];

const input =
  "w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-on-surface focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary";

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-5">
      <legend className="px-2 font-head text-lg font-semibold text-primary">{title}</legend>
      {hint && <p className="mb-4 text-sm text-on-surface-variant">{hint}</p>}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function SettingsForm({ values }: { values: Values }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(updateSettings, {});

  return (
    <form action={action} className="space-y-8">
      {state.ok && (
        <div className="flex items-center gap-2 rounded-lg border border-secondary/30 bg-secondary-fixed/40 px-4 py-3 text-sm text-on-secondary-fixed">
          <Icon name="check_circle" className="text-[20px]" />
          تم حفظ الإعدادات بنجاح.
        </div>
      )}
      {state.error && (
        <div className="flex items-center gap-2 rounded-lg border border-error/30 bg-error-container px-4 py-3 text-sm text-on-error-container">
          <Icon name="error" className="text-[20px]" />
          {state.error}
        </div>
      )}

      <Section title="بيانات الشركة">
        {companyFields.map((f) => (
          <div key={f.name} className={f.name === "address" ? "md:col-span-2" : ""}>
            <label htmlFor={f.name} className="mb-2 block font-head text-sm text-on-surface-variant">{f.label}</label>
            <input id={f.name} name={f.name} type={f.type ?? "text"} dir={f.dir} defaultValue={String(values[f.name] ?? "")} className={input} />
            {state.fieldErrors?.[f.name] && <p className="mt-1 text-sm text-error">{state.fieldErrors[f.name]}</p>}
          </div>
        ))}
      </Section>

      <Section title="الشعار" hint="ارفع شعارًا لتجاوز الشعار الافتراضي. النسخة البيضاء تُستخدم في الفوتر الداكن.">
        <div>
          <label className="mb-2 block font-head text-sm text-on-surface-variant">الشعار (خلفية فاتحة)</label>
          <ImageField name="logo" defaultValue={values.logo} />
        </div>
        <div>
          <label className="mb-2 block font-head text-sm text-on-surface-variant">الشعار (خلفية داكنة)</label>
          <ImageField name="logoWhite" defaultValue={values.logoWhite} />
        </div>
      </Section>

      <Section title="إعدادات استقبال الاستفسارات" hint="تُحفظ كل الرسائل في «الاستفسارات». لإرسال نسخة بالبريد، أدخل بيانات Resend.">
        <div>
          <label htmlFor="inquiryEmail" className="mb-2 block font-head text-sm text-on-surface-variant">بريد استقبال الاستفسارات</label>
          <input id="inquiryEmail" name="inquiryEmail" dir="ltr" defaultValue={values.inquiryEmail} placeholder={`${values.email} (يقبل أكثر من بريد بفاصلة)`} className={input} />
        </div>
        <div>
          <label htmlFor="emailFrom" className="mb-2 block font-head text-sm text-on-surface-variant">عنوان المُرسِل (Resend)</label>
          <input id="emailFrom" name="emailFrom" dir="ltr" defaultValue={values.emailFrom} placeholder="onboarding@resend.dev" className={input} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="resendApiKey" className="mb-2 block font-head text-sm text-on-surface-variant">
            مفتاح Resend API {values.hasApiKey && <span className="mr-2 text-xs text-secondary">(محفوظ ✓)</span>}
          </label>
          <input id="resendApiKey" name="resendApiKey" type="password" dir="ltr" autoComplete="off" placeholder={values.hasApiKey ? "•••• اتركه فارغًا للإبقاء على الحالي" : "re_..."} className={input} />
        </div>
      </Section>

      <Section title="الحماية من السبام (Cloudflare Turnstile)" hint="أنشئ موقعًا في Cloudflare Turnstile وأدخل المفتاحين. اتركهما فارغين لتعطيل الحماية.">
        <div>
          <label htmlFor="turnstileSiteKey" className="mb-2 block font-head text-sm text-on-surface-variant">Site Key (عام)</label>
          <input id="turnstileSiteKey" name="turnstileSiteKey" dir="ltr" defaultValue={values.turnstileSiteKey} placeholder="0x4AAAA..." className={input} />
        </div>
        <div>
          <label htmlFor="turnstileSecretKey" className="mb-2 block font-head text-sm text-on-surface-variant">
            Secret Key {values.hasTurnstileSecret && <span className="mr-2 text-xs text-secondary">(محفوظ ✓)</span>}
          </label>
          <input id="turnstileSecretKey" name="turnstileSecretKey" type="password" dir="ltr" autoComplete="off" placeholder={values.hasTurnstileSecret ? "•••• اتركه فارغًا للإبقاء عليه" : "0x4AAAA..."} className={input} />
        </div>
      </Section>

      <Section title="التنبيهات الفورية (Telegram)" hint="أنشئ بوت عبر @BotFather واحصل على chat id. سيصلك تنبيه فوري بكل استفسار جديد.">
        <div>
          <label htmlFor="telegramChatId" className="mb-2 block font-head text-sm text-on-surface-variant">Chat ID</label>
          <input id="telegramChatId" name="telegramChatId" dir="ltr" defaultValue={values.telegramChatId} placeholder="123456789" className={input} />
        </div>
        <div>
          <label htmlFor="telegramBotToken" className="mb-2 block font-head text-sm text-on-surface-variant">
            Bot Token {values.hasTelegramToken && <span className="mr-2 text-xs text-secondary">(محفوظ ✓)</span>}
          </label>
          <input id="telegramBotToken" name="telegramBotToken" type="password" dir="ltr" autoComplete="off" placeholder={values.hasTelegramToken ? "•••• اتركه فارغًا للإبقاء عليه" : "123456:ABC-..."} className={input} />
        </div>
      </Section>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-head text-sm font-medium text-on-secondary shadow-sm transition-colors hover:bg-secondary-container disabled:opacity-60"
      >
        {pending ? "جارٍ الحفظ..." : "حفظ التغييرات"}
        <Icon name={pending ? "progress_activity" : "save"} className={pending ? "animate-spin text-[18px]" : "text-[18px]"} />
      </button>
    </form>
  );
}
