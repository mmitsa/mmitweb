# مسارات المستكشف — Website & CMS

Corporate website **and** content-management system for **مسارات المستكشف
للاتصالات وتقنية المعلومات** (MMIT) — a Saudi communications & IT company.
RTL-first, Arabic, with a database-backed admin where every piece of content
is editable.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — design tokens in [`src/app/globals.css`](src/app/globals.css)
- Fonts: **IBM Plex Sans Arabic** (headings) + **Tajawal** (body) via `next/font`
- **PostgreSQL** + **Prisma 6** ([`prisma/schema.prisma`](prisma/schema.prisma))
- **Auth.js v5** (credentials + JWT, roles) — [`src/auth.ts`](src/auth.ts)
- **Resend** (email) · **Cloudflare Turnstile** (spam) · **Telegram** (alerts)
- **Vitest** (data-layer tests) · self-hostable (standalone output + Docker)

## Public pages

`/` · `/services` (+ `/services/[slug]`) · `/products` (+ `/products/[slug]`) ·
`/portfolio` · `/partners` · `/about` · `/contact` · `/faq` · `/privacy` ·
`/[slug]` (custom pages from the page builder).

The public site reads everything from the database, so admin edits appear
immediately. Design language: **“Luminous Grid”** — a signature animated
“paths” motif (مسارات) on a light, refined RTL layout.

## Admin / CMS — `/admin`

Login at `/admin/login`. Manages: **settings** (identity, contact, logos,
email, spam, notifications), **services, products, projects, partners, FAQ,
advantages, sectors, process steps, pages** (block builder), **inquiries**
(inbox with status/search/CSV export), **users** (roles), and an **audit log**.
See the full guide: [`docs/ADMIN.md`](docs/ADMIN.md).

Roles: `admin` (full access incl. settings, users, audit) and `editor`
(content only).

## Project structure

```
src/
├── app/
│   ├── (site)/        public site (own layout: navbar/footer/chrome)
│   ├── admin/         login + (dashboard) group (auth-guarded shell)
│   ├── api/           auth, admin upload, inquiries CSV export
│   ├── layout.tsx     root (html/fonts/metadata)  ·  sitemap/robots/manifest/og
├── components/        ui + admin (CrudForm, ImageField, PageEditor, …)
├── lib/               prisma, data (reads), auth helper, audit, blocks, site (seed source)
prisma/                schema, migrations, seed
scripts/backup.sh      pg_dump backup + rotation
```

## Development

```bash
# 1) Postgres running + DATABASE_URL/AUTH_SECRET in .env (see .env.example)
npm install
npm run db:migrate     # apply migrations (dev: `npx prisma migrate dev`)
npm run db:seed        # seed content + create the admin account (ADMIN_* env)
npm run dev            # http://localhost:3000  ·  admin at /admin
```

| Script | Purpose |
|--------|---------|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` | ESLint |
| `npm test` | Vitest (data-layer) |
| `npm run db:migrate` | `prisma migrate deploy` |
| `npm run db:seed` | seed DB + admin user |
| `./scripts/backup.sh` | DB backup (pg_dump + rotation) |

## Environment

See [`.env.example`](.env.example). Required: `DATABASE_URL`, `AUTH_SECRET`,
`ADMIN_*` (for the first seed). Optional and also configurable from the admin:
Resend, Turnstile, Telegram, Upstash rate-limiting, analytics (Umami/Plausible).

## Deployment

Self-hosted on a private server (Node standalone behind nginx, or Docker) —
full guide in [`DEPLOY.md`](DEPLOY.md). Security headers and `output: standalone`
are configured in [`next.config.ts`](next.config.ts).
