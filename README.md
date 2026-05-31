# مسارات المستكشف — Website

Corporate website for **مسارات المستكشف للاتصالات وتقنية المعلومات** (MMIT) — a Saudi communications & IT company. RTL-first, Arabic.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens (colors/fonts) in [`src/app/globals.css`](src/app/globals.css)
- Fonts via `next/font`: **IBM Plex Sans Arabic** (headings) + **Tajawal** (body)
- Icons: **Material Symbols Outlined**
- Contact form: **Server Action** + **Resend** + **Zod** validation

## Pages

| Route | الصفحة |
|-------|--------|
| `/` | الرئيسية |
| `/services` | الخدمات |
| `/products` | منتجاتنا |
| `/portfolio` | أعمالنا |
| `/about` | من نحن |
| `/contact` | تواصل معنا |

Content & data live in [`src/lib/site.ts`](src/lib/site.ts). Original Stitch design exports are kept under [`_design/`](_design/) for reference.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Environment

Copy `.env.example` → `.env.local` and fill in:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key for contact-form email delivery. **If unset**, the form still works in dev — submissions are logged to the server console instead of emailed. |
| `CONTACT_TO_EMAIL` | Recipient for submissions (default `admin@mmit.sa`). |
| `CONTACT_FROM_EMAIL` | Verified Resend sender (default `onboarding@resend.dev`). |

## Contact form

The form ([`src/components/contact-form.tsx`](src/components/contact-form.tsx)) posts to the
`submitContact` Server Action ([`src/app/contact/actions.ts`](src/app/contact/actions.ts)),
which validates with Zod and sends via Resend.
