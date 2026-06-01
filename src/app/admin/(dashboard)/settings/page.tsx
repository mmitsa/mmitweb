import { getSettings } from "@/lib/data";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const s = await getSettings();
  if (!s) {
    return (
      <p className="text-on-surface-variant">
        لا توجد إعدادات بعد — شغّل <code>npm run db:seed</code>.
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-head font-bold text-primary">إعدادات الموقع</h1>
      <p className="mt-1 text-on-surface-variant">
        بيانات الهوية والتواصل الظاهرة في الموقع.
      </p>
      <div className="mt-8 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <SettingsForm
          values={{
            name: s.name,
            tagline: s.tagline,
            url: s.url,
            email: s.email,
            phone: s.phone,
            phoneDisplay: s.phoneDisplay,
            whatsapp: s.whatsapp,
            address: s.address,
            logo: s.logo ?? "",
            logoWhite: s.logoWhite ?? "",
            inquiryEmail: s.inquiryEmail ?? "",
            emailFrom: s.emailFrom ?? "",
            turnstileSiteKey: s.turnstileSiteKey ?? "",
            telegramChatId: s.telegramChatId ?? "",
            hasApiKey: Boolean(s.resendApiKey),
            hasTurnstileSecret: Boolean(s.turnstileSecretKey),
            hasTelegramToken: Boolean(s.telegramBotToken),
          }}
        />
      </div>
    </div>
  );
}
