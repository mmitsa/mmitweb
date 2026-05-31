# دليل النشر على Vercel — مسارات المستكشف

موقع Next.js (App Router) جاهز للنشر على Vercel بدون إعداد إضافي — Vercel يكتشف
Next.js تلقائيًا.

## ١. ربط المشروع

```bash
# أداة Vercel (مرة واحدة)
npm i -g vercel

# من جذر المشروع
vercel link          # اربط بمشروع Vercel (أو أنشئ واحدًا)
```

أو عبر لوحة Vercel: **New Project → Import Git Repository** واختر المستودع.
الإعدادات تُكتشف تلقائيًا:

| الإعداد | القيمة |
|--------|--------|
| Framework Preset | Next.js |
| Build Command | `next build` (افتراضي) |
| Output | تلقائي |
| Node.js | 24.x (الافتراضي الحالي) |

## ٢. متغيّرات البيئة

اضبطها في **Project Settings → Environment Variables** (أو عبر CLI). كلها
**اختيارية** — الموقع يعمل بدونها (نموذج التواصل يسجّل في السجلّ بدل الإرسال،
وتحديد المعدّل يصبح داخل الذاكرة).

| المتغيّر | الغرض |
|---------|-------|
| `RESEND_API_KEY` | إرسال رسائل نموذج التواصل عبر [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | بريد استقبال الرسائل (الافتراضي `admin@mmit.sa`) |
| `CONTACT_FROM_EMAIL` | المُرسِل المُوثّق في Resend |
| `UPSTASH_REDIS_REST_URL` | تحديد معدّل موزّع (اختياري) — [Upstash](https://upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | رمز Upstash |

عبر CLI:

```bash
vercel env add RESEND_API_KEY production
vercel env add CONTACT_TO_EMAIL production
# ... كرّر لكل متغيّر، ولـ preview/development عند الحاجة
```

> Resend يتطلّب توثيق نطاق المُرسِل (`mmit.sa`) لإرسال من بريد رسمي.

## ٣. النشر

```bash
vercel            # نشر معاينة (Preview)
vercel --prod     # نشر للإنتاج
```

أو ادفع إلى الفرع المرتبط بالإنتاج في Git ليُنشر تلقائيًا.

## ٤. النطاق

في **Project Settings → Domains** أضف `mmit.sa` و`www.mmit.sa`، واتبع تعليمات
سجلّات DNS (A / CNAME). بعد ربط النطاق، حدّث `site.url` في
[`src/lib/site.ts`](src/lib/site.ts) إن لزم (مضبوط حاليًا على `https://mmit.sa`).

## ٥. ما بعد النشر

- تأكّد من ظهور `/sitemap.xml` و`/robots.txt`.
- أرسل الـ sitemap في **Google Search Console**.
- اختبر نموذج التواصل (يحتاج `RESEND_API_KEY` للإرسال الفعلي).
- راقب الزيارات عبر **Vercel Analytics** (مفعّل في الكود).

## ملاحظات

- **ترويسات الأمان** مضبوطة في [`next.config.ts`](next.config.ts)
  (HSTS، nosniff، X-Frame-Options، Referrer-Policy، Permissions-Policy).
- **الشعار**: استبدل ملفات `public/brand/` بالتصدير الرسمي للمطابقة 100%.
- **الصور**: عند توفّر صور حقيقية للهيرو/المشاريع، استخدم `next/image`.
