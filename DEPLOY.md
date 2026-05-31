# دليل النشر على سيرفر خاص — مسارات المستكشف

موقع Next.js (App Router) يُبنى كـ **خادم Node مستقل (standalone)** ويُشغّل خلف
وكيل عكسي (nginx). يدعم الميزات الديناميكية (نموذج التواصل / Server Actions).

> المتطلبات على السيرفر: **Node.js 20+ (يُفضّل 22/24)**، و**nginx** كوكيل عكسي،
> واختياريًا **PM2** أو **systemd** لإبقاء الخدمة تعمل.

---

## ١. متغيّرات البيئة

أنشئ ملف `.env` (أو اضبط متغيّرات النظام). كلها **اختيارية** — الموقع يعمل بدونها
(نموذج التواصل يسجّل في السجلّ بدل الإرسال، وتحديد المعدّل يصبح داخل الذاكرة):

```bash
RESEND_API_KEY=...            # إرسال رسائل نموذج التواصل (resend.com)
CONTACT_TO_EMAIL=admin@mmit.sa
CONTACT_FROM_EMAIL=...        # مُرسِل موثّق في Resend
UPSTASH_REDIS_REST_URL=...    # تحديد معدّل موزّع (اختياري)
UPSTASH_REDIS_REST_TOKEN=...
PORT=3000                     # منفذ الخادم (افتراضي 3000)
HOSTNAME=127.0.0.1            # ربط محلي خلف nginx
```

## ٢. البناء

```bash
npm ci
npm run build      # يُنتج .next/standalone (بفضل output: "standalone")
```

ناتج standalone لا يتضمّن `public/` ولا `.next/static/` تلقائيًا — انسخهما:

```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

## ٣. التشغيل (Node مباشرة)

```bash
cd .next/standalone
PORT=3000 HOSTNAME=127.0.0.1 node server.js
```

### مع PM2 (مستحسن)

```bash
npm i -g pm2
cd /var/www/mmitweb/.next/standalone
pm2 start server.js --name mmitweb --env production
pm2 save && pm2 startup     # تشغيل تلقائي عند الإقلاع
```

### أو عبر systemd

`/etc/systemd/system/mmitweb.service`:

```ini
[Unit]
Description=mmitweb (Next.js)
After=network.target

[Service]
WorkingDirectory=/var/www/mmitweb/.next/standalone
ExecStart=/usr/bin/node server.js
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=127.0.0.1
EnvironmentFile=/var/www/mmitweb/.env
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now mmitweb
```

## ٤. nginx (وكيل عكسي + SSL)

`/etc/nginx/sites-available/mmit.sa`:

```nginx
server {
    listen 80;
    server_name mmit.sa www.mmit.sa;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        "upgrade";
    }

    # كاش لأصول Next الثابتة
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/mmit.sa /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d mmit.sa -d www.mmit.sa    # شهادة SSL مجانية
```

> `X-Forwarded-For` مهم لعمل تحديد المعدّل في نموذج التواصل بشكل صحيح.

## ٥. Docker (بديل)

المشروع يحوي [`Dockerfile`](Dockerfile) جاهزًا:

```bash
docker build -t mmitweb .
docker run -d --name mmitweb -p 3000:3000 --env-file .env mmitweb
```

ثم وجّه nginx إلى `127.0.0.1:3000` كما في الخطوة ٤.

## ٦. التحديث

```bash
git pull
npm ci && npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
pm2 restart mmitweb       # أو: sudo systemctl restart mmitweb
```

## ملاحظات

- **ترويسات الأمان** (HSTS, nosniff, ...) مضبوطة في [`next.config.ts`](next.config.ts).
- **التحليلات**: مدمجة وجاهزة (ذاتية الاستضافة، تحترم الخصوصية) — تُفعَّل
  بضبط متغيّرات البيئة فقط، ولا تعمل قبل ذلك:
  - **Umami**: `NEXT_PUBLIC_UMAMI_SRC` + `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
  - **Plausible**: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (+ اختياريًا `NEXT_PUBLIC_PLAUSIBLE_SRC`)
- بعد ربط النطاق تأكّد أن `site.url` في [`src/lib/site.ts`](src/lib/site.ts) صحيح.
- أرسل `/sitemap.xml` إلى Google Search Console.
