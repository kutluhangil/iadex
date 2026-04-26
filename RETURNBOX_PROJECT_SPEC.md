# ReturnBox — Shopify İade Yönetim Sistemi

## Proje Kimliği

| Alan | Değer |
|------|-------|
| **Proje Adı** | ReturnBox |
| **Tagline TR** | "Shopify mağazanız için akıllı iade yönetimi" |
| **Tagline EN** | "Smart return management for your Shopify store" |
| **Dil Desteği** | Türkçe + İngilizce (i18n — next-intl) |
| **Hedef Kitle** | Shopify mağaza sahipleri (TR + Global) |
| **Monetizasyon** | Lemon Squeezy (usage-based billing) |

---

## 1. TEKNOLOJİ STACK'İ

### Frontend
```
Framework       : Next.js 14+ (App Router)
Dil             : TypeScript
Stil            : Tailwind CSS + Framer Motion (animasyon)
UI Kit          : shadcn/ui (customized — dark theme)
i18n            : next-intl
State           : Zustand
Form            : React Hook Form + Zod
Tablo           : TanStack Table
Chart           : Recharts
İkon            : Lucide React
```

### Backend
```
API             : Next.js Route Handlers (API Routes, /app/api)
ORM             : Drizzle ORM
Veritabanı      : Supabase (PostgreSQL)
Auth            : Supabase Auth + Shopify OAuth
Job Queue       : BullMQ + Redis (Docker container)
Email           : Resend (transactional emails)
PDF             : @react-pdf/renderer (iade etiketleri)
```

### Altyapı / Deployment
```
Containerization : Docker + Docker Compose
Server           : Ubuntu Server (ev sunucusu)
Reverse Proxy    : Caddy (auto-SSL) veya Cloudflare Tunnel
CI/CD            : GitHub Actions → Docker build → deploy
Registry         : GitHub Container Registry (ghcr.io)
```

### 3. Parti Entegrasyonlar
```
Shopify          : Shopify Admin API (REST + GraphQL)
Ödeme            : Lemon Squeezy (abonelik + usage billing)
Kargo (TR)       : Yurtiçi Kargo API, Aras Kargo API, MNG Kargo API
Kargo (Global)   : EasyPost API (UPS, FedEx, DHL, USPS wrapper)
Email            : Resend
Analytics        : PostHog (self-hosted veya cloud)
```

---

## 2. PROJE YAPISI (MONOREPO)

```
returnbox/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint + test + type-check
│       └── deploy.yml                # Docker build → push → deploy
├── docker/
│   ├── Dockerfile                    # Multi-stage Next.js build
│   ├── Dockerfile.worker             # BullMQ worker container
│   └── docker-compose.yml            # Tüm servisler
├── prisma/                           # (alternatif — Drizzle kullanılacak)
├── drizzle/
│   ├── schema.ts                     # Veritabanı şeması
│   ├── migrations/                   # SQL migration dosyaları
│   └── seed.ts                       # Demo data
├── public/
│   ├── locales/
│   │   ├── tr.json                   # Türkçe çeviriler
│   │   └── en.json                   # İngilizce çeviriler
│   ├── fonts/
│   │   ├── Inter-Variable.woff2
│   │   └── JetBrainsMono.woff2
│   └── images/
│       ├── logo-dark.svg
│       ├── logo-light.svg
│       └── og-image.png
├── src/
│   ├── app/
│   │   ├── [locale]/                 # i18n route group
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   └── callback/page.tsx # Shopify OAuth callback
│   │   │   ├── (dashboard)/
│   │   │   │   ├── layout.tsx        # Dashboard shell (sidebar + header)
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── returns/
│   │   │   │   │   ├── page.tsx      # İade listesi
│   │   │   │   │   ├── [id]/page.tsx # İade detay
│   │   │   │   │   └── new/page.tsx  # Manuel iade oluştur
│   │   │   │   ├── orders/page.tsx   # Sipariş listesi (Shopify sync)
│   │   │   │   ├── customers/page.tsx
│   │   │   │   ├── labels/page.tsx   # İade etiketleri
│   │   │   │   ├── automations/
│   │   │   │   │   ├── page.tsx      # Otomasyon kuralları
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── analytics/page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   ├── page.tsx      # Genel ayarlar
│   │   │   │   │   ├── store/page.tsx
│   │   │   │   │   ├── billing/page.tsx
│   │   │   │   │   ├── team/page.tsx
│   │   │   │   │   ├── notifications/page.tsx
│   │   │   │   │   └── integrations/page.tsx
│   │   │   │   └── portal-preview/page.tsx # Müşteri portalı önizleme
│   │   │   └── portal/               # Müşteri iade portalı (public)
│   │   │       ├── layout.tsx
│   │   │       ├── [storeSlug]/
│   │   │       │   ├── page.tsx      # Sipariş no ile iade başlat
│   │   │       │   ├── [returnId]/
│   │   │       │   │   ├── page.tsx  # İade durumu takip
│   │   │       │   │   └── label/page.tsx # Etiket indir
│   │   │       │   └── track/page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── shopify/route.ts      # Shopify OAuth start
│   │   │   │   ├── shopify/callback/route.ts
│   │   │   │   └── session/route.ts
│   │   │   ├── webhooks/
│   │   │   │   ├── shopify/route.ts      # Shopify webhooks
│   │   │   │   └── lemonsqueezy/route.ts # Billing webhooks
│   │   │   ├── returns/
│   │   │   │   ├── route.ts              # CRUD
│   │   │   │   ├── [id]/route.ts
│   │   │   │   ├── [id]/approve/route.ts
│   │   │   │   ├── [id]/reject/route.ts
│   │   │   │   ├── [id]/label/route.ts   # Etiket oluştur
│   │   │   │   └── [id]/refund/route.ts  # Geri ödeme tetikle
│   │   │   ├── orders/
│   │   │   │   ├── route.ts              # Sipariş listele
│   │   │   │   └── sync/route.ts         # Shopify sync
│   │   │   ├── automations/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── analytics/
│   │   │   │   ├── overview/route.ts
│   │   │   │   ├── trends/route.ts
│   │   │   │   └── export/route.ts
│   │   │   ├── billing/
│   │   │   │   ├── checkout/route.ts
│   │   │   │   ├── portal/route.ts
│   │   │   │   └── usage/route.ts
│   │   │   ├── portal/                   # Public müşteri API
│   │   │   │   ├── initiate/route.ts
│   │   │   │   ├── track/route.ts
│   │   │   │   └── upload/route.ts       # Fotoğraf yükleme
│   │   │   ├── shipping/
│   │   │   │   ├── rates/route.ts
│   │   │   │   ├── label/route.ts
│   │   │   │   └── track/route.ts
│   │   │   └── cron/
│   │   │       ├── sync-orders/route.ts
│   │   │       ├── check-deadlines/route.ts
│   │   │       └── usage-report/route.ts
│   ├── components/
│   │   ├── ui/                       # shadcn/ui base (customized)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── separator.tsx
│   │   │   └── sheet.tsx
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   └── page-header.tsx
│   │   ├── returns/
│   │   │   ├── return-table.tsx
│   │   │   ├── return-detail-card.tsx
│   │   │   ├── return-timeline.tsx
│   │   │   ├── return-status-badge.tsx
│   │   │   ├── return-filters.tsx
│   │   │   ├── return-form.tsx
│   │   │   └── return-actions.tsx
│   │   ├── orders/
│   │   │   ├── order-table.tsx
│   │   │   └── order-detail.tsx
│   │   ├── analytics/
│   │   │   ├── stats-grid.tsx
│   │   │   ├── return-rate-chart.tsx
│   │   │   ├── reason-breakdown.tsx
│   │   │   ├── revenue-impact.tsx
│   │   │   └── date-range-picker.tsx
│   │   ├── automations/
│   │   │   ├── rule-builder.tsx
│   │   │   ├── rule-card.tsx
│   │   │   ├── condition-editor.tsx
│   │   │   └── action-editor.tsx
│   │   ├── portal/
│   │   │   ├── portal-lookup.tsx
│   │   │   ├── portal-return-form.tsx
│   │   │   ├── portal-tracker.tsx
│   │   │   └── portal-upload.tsx
│   │   ├── billing/
│   │   │   ├── plan-card.tsx
│   │   │   ├── usage-meter.tsx
│   │   │   └── invoice-list.tsx
│   │   └── shared/
│   │       ├── logo.tsx
│   │       ├── theme-toggle.tsx
│   │       ├── locale-switcher.tsx
│   │       ├── empty-state.tsx
│   │       ├── loading-spinner.tsx
│   │       ├── confirm-dialog.tsx
│   │       ├── data-table.tsx          # TanStack Table wrapper
│   │       ├── file-upload.tsx
│   │       └── search-input.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts              # Drizzle client
│   │   │   ├── schema/
│   │   │   │   ├── stores.ts
│   │   │   │   ├── returns.ts
│   │   │   │   ├── orders.ts
│   │   │   │   ├── customers.ts
│   │   │   │   ├── labels.ts
│   │   │   │   ├── automations.ts
│   │   │   │   ├── notifications.ts
│   │   │   │   ├── subscriptions.ts
│   │   │   │   └── usage.ts
│   │   │   └── queries/
│   │   │       ├── returns.ts
│   │   │       ├── orders.ts
│   │   │       ├── analytics.ts
│   │   │       └── billing.ts
│   │   ├── shopify/
│   │   │   ├── client.ts             # Shopify API client
│   │   │   ├── auth.ts               # OAuth flow
│   │   │   ├── webhooks.ts           # Webhook verification
│   │   │   ├── orders.ts             # Order sync
│   │   │   ├── products.ts           # Product data
│   │   │   ├── refunds.ts            # Refund creation
│   │   │   └── types.ts
│   │   ├── shipping/
│   │   │   ├── easypost.ts           # Global kargo
│   │   │   ├── yurtici.ts            # Yurtiçi Kargo API
│   │   │   ├── aras.ts               # Aras Kargo API
│   │   │   ├── mng.ts                # MNG Kargo API
│   │   │   ├── label-generator.ts    # PDF etiket oluşturma
│   │   │   └── tracker.ts            # Kargo takip
│   │   ├── billing/
│   │   │   ├── lemonsqueezy.ts       # LS API client
│   │   │   ├── plans.ts              # Plan tanımları
│   │   │   ├── usage-tracker.ts      # Kullanım sayacı
│   │   │   └── webhooks.ts           # Billing webhooks
│   │   ├── automation/
│   │   │   ├── engine.ts             # Kural motoru
│   │   │   ├── conditions.ts         # Koşul değerlendirici
│   │   │   ├── actions.ts            # Aksiyon çalıştırıcı
│   │   │   └── templates.ts          # Hazır otomasyon şablonları
│   │   ├── email/
│   │   │   ├── resend.ts             # Resend client
│   │   │   └── templates/
│   │   │       ├── return-approved.tsx
│   │   │       ├── return-rejected.tsx
│   │   │       ├── label-ready.tsx
│   │   │       ├── refund-processed.tsx
│   │   │       ├── return-reminder.tsx
│   │   │       └── status-update.tsx
│   │   ├── auth/
│   │   │   ├── supabase-client.ts
│   │   │   ├── supabase-server.ts
│   │   │   └── middleware.ts
│   │   ├── i18n/
│   │   │   ├── config.ts
│   │   │   ├── request.ts
│   │   │   └── navigation.ts
│   │   ├── utils/
│   │   │   ├── cn.ts                 # clsx + tailwind-merge
│   │   │   ├── format.ts             # Tarih, para formatları
│   │   │   ├── validators.ts         # Zod schemas
│   │   │   └── constants.ts
│   │   └── hooks/
│   │       ├── use-returns.ts
│   │       ├── use-orders.ts
│   │       ├── use-analytics.ts
│   │       ├── use-billing.ts
│   │       ├── use-debounce.ts
│   │       └── use-media-query.ts
│   ├── workers/
│   │   ├── index.ts                  # BullMQ worker entry
│   │   ├── jobs/
│   │   │   ├── sync-orders.ts        # Shopify sipariş sync
│   │   │   ├── send-email.ts         # Email gönderimi
│   │   │   ├── generate-label.ts     # Etiket oluşturma
│   │   │   ├── process-refund.ts     # Geri ödeme
│   │   │   ├── check-automation.ts   # Otomasyon kuralları
│   │   │   ├── track-shipment.ts     # Kargo takip güncelleme
│   │   │   └── usage-report.ts       # Aylık kullanım raporu
│   │   └── queues.ts                 # Queue tanımları
│   ├── middleware.ts                 # Auth + i18n middleware
│   └── types/
│       ├── return.ts
│       ├── order.ts
│       ├── store.ts
│       ├── automation.ts
│       ├── billing.ts
│       └── api.ts
├── .env.example
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── drizzle.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 3. VERİTABANI ŞEMASI (Supabase / PostgreSQL + Drizzle ORM)

### Tablo Listesi

```sql
-- =============================================
-- STORES — Mağaza bilgileri
-- =============================================
CREATE TABLE stores (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,           -- portal URL için
  shopify_domain  TEXT UNIQUE NOT NULL,           -- xxx.myshopify.com
  shopify_token   TEXT NOT NULL,                  -- encrypted
  owner_email     TEXT NOT NULL,
  owner_id        UUID REFERENCES auth.users(id),
  plan            TEXT DEFAULT 'trial',           -- trial | starter | growth | enterprise
  locale          TEXT DEFAULT 'tr',              -- tr | en
  currency        TEXT DEFAULT 'TRY',             -- TRY | USD | EUR
  timezone        TEXT DEFAULT 'Europe/Istanbul',
  return_policy   JSONB DEFAULT '{}',             -- iade politika ayarları
  portal_config   JSONB DEFAULT '{}',             -- portal özelleştirme
  branding        JSONB DEFAULT '{}',             -- logo, renkler
  is_active       BOOLEAN DEFAULT true,
  trial_ends_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- ORDERS — Shopify'dan sync edilen siparişler
-- =============================================
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id          UUID REFERENCES stores(id) ON DELETE CASCADE,
  shopify_order_id  BIGINT NOT NULL,
  shopify_order_number TEXT NOT NULL,             -- #1001
  customer_name     TEXT,
  customer_email    TEXT,
  customer_phone    TEXT,
  total_price       DECIMAL(10,2),
  currency          TEXT DEFAULT 'TRY',
  financial_status  TEXT,                         -- paid, refunded, partially_refunded
  fulfillment_status TEXT,                        -- fulfilled, partial, unfulfilled
  line_items        JSONB NOT NULL DEFAULT '[]',  -- ürün listesi
  shipping_address  JSONB,
  order_date        TIMESTAMPTZ,
  synced_at         TIMESTAMPTZ DEFAULT now(),
  created_at        TIMESTAMPTZ DEFAULT now()
);
CREATE UNIQUE INDEX idx_orders_store_shopify ON orders(store_id, shopify_order_id);

-- =============================================
-- RETURNS — İade kayıtları
-- =============================================
CREATE TABLE returns (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id        UUID REFERENCES stores(id) ON DELETE CASCADE,
  order_id        UUID REFERENCES orders(id),
  return_number   TEXT NOT NULL,                  -- RET-20240101-001
  status          TEXT DEFAULT 'pending',
    -- pending → approved → label_created → shipped → received → inspected → refunded/rejected
  reason          TEXT NOT NULL,
    -- defective, wrong_item, not_as_described, changed_mind, too_large, too_small, damaged, other
  reason_detail   TEXT,                           -- müşteri açıklaması
  items           JSONB NOT NULL DEFAULT '[]',    -- iade edilen ürünler
  photos          TEXT[] DEFAULT '{}',            -- fotoğraf URL'leri (Supabase Storage)
  resolution      TEXT,                           -- refund, exchange, store_credit
  refund_amount   DECIMAL(10,2),
  refund_status   TEXT,                           -- pending, processed, failed
  customer_name   TEXT,
  customer_email  TEXT,
  customer_phone  TEXT,
  assigned_to     UUID REFERENCES auth.users(id), -- atanan personel
  internal_notes  TEXT,
  label_id        UUID REFERENCES labels(id),
  auto_approved   BOOLEAN DEFAULT false,          -- otomasyon onayı
  approved_at     TIMESTAMPTZ,
  shipped_at      TIMESTAMPTZ,
  received_at     TIMESTAMPTZ,
  inspected_at    TIMESTAMPTZ,
  resolved_at     TIMESTAMPTZ,
  deadline_at     TIMESTAMPTZ,                    -- SLA deadline
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_returns_store ON returns(store_id);
CREATE INDEX idx_returns_status ON returns(status);
CREATE INDEX idx_returns_created ON returns(created_at DESC);

-- =============================================
-- RETURN_TIMELINE — İade zaman çizelgesi
-- =============================================
CREATE TABLE return_timeline (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_id   UUID REFERENCES returns(id) ON DELETE CASCADE,
  event       TEXT NOT NULL,        -- status_change, note_added, email_sent, label_created, ...
  from_status TEXT,
  to_status   TEXT,
  actor       TEXT,                 -- system, user email, automation name
  details     JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- LABELS — İade etiketleri
-- =============================================
CREATE TABLE labels (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id        UUID REFERENCES stores(id) ON DELETE CASCADE,
  return_id       UUID REFERENCES returns(id),
  carrier         TEXT NOT NULL,       -- yurtici, aras, mng, ups, fedex, dhl
  tracking_number TEXT,
  tracking_url    TEXT,
  label_url       TEXT,                -- PDF URL (Supabase Storage)
  cost            DECIMAL(10,2),
  currency        TEXT DEFAULT 'TRY',
  status          TEXT DEFAULT 'created', -- created, in_transit, delivered, expired
  last_tracked_at TIMESTAMPTZ,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- AUTOMATIONS — Otomasyon kuralları
-- =============================================
CREATE TABLE automations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id    UUID REFERENCES stores(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  is_active   BOOLEAN DEFAULT true,
  trigger     TEXT NOT NULL,
    -- return_created, return_status_changed, return_deadline_approaching, order_fulfilled
  conditions  JSONB NOT NULL DEFAULT '[]',
    -- [{field, operator, value}] → e.g. [{field:"reason", op:"eq", value:"defective"}]
  actions     JSONB NOT NULL DEFAULT '[]',
    -- [{type, config}] → e.g. [{type:"auto_approve"}, {type:"send_email", config:{template:"approved"}}]
  run_count   INT DEFAULT 0,
  last_run_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- NOTIFICATIONS — Bildirim geçmişi
-- =============================================
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id    UUID REFERENCES stores(id) ON DELETE CASCADE,
  return_id   UUID REFERENCES returns(id),
  type        TEXT NOT NULL,           -- email, sms, webhook
  recipient   TEXT NOT NULL,
  subject     TEXT,
  body        TEXT,
  status      TEXT DEFAULT 'pending',  -- pending, sent, failed
  sent_at     TIMESTAMPTZ,
  error       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- SUBSCRIPTIONS — Lemon Squeezy abonelik bilgileri
-- =============================================
CREATE TABLE subscriptions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id              UUID REFERENCES stores(id) ON DELETE CASCADE,
  ls_subscription_id    TEXT UNIQUE,
  ls_customer_id        TEXT,
  plan                  TEXT NOT NULL,     -- starter, growth, enterprise
  status                TEXT NOT NULL,     -- active, paused, cancelled, past_due
  billing_cycle         TEXT DEFAULT 'monthly', -- monthly, yearly
  current_period_start  TIMESTAMPTZ,
  current_period_end    TIMESTAMPTZ,
  cancel_at             TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- USAGE — Aylık kullanım sayacı
-- =============================================
CREATE TABLE usage (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id      UUID REFERENCES stores(id) ON DELETE CASCADE,
  period_start  DATE NOT NULL,
  period_end    DATE NOT NULL,
  returns_count INT DEFAULT 0,
  labels_count  INT DEFAULT 0,
  emails_count  INT DEFAULT 0,
  returns_limit INT NOT NULL,            -- plan limiti
  overage_count INT DEFAULT 0,           -- limit aşımı
  reported      BOOLEAN DEFAULT false,   -- LS'ye raporlandı mı
  created_at    TIMESTAMPTZ DEFAULT now()
);
CREATE UNIQUE INDEX idx_usage_store_period ON usage(store_id, period_start);

-- =============================================
-- ROW LEVEL SECURITY (Supabase RLS)
-- =============================================
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

-- Store owner can access their own data
CREATE POLICY "store_owner_access" ON stores
  FOR ALL USING (owner_id = auth.uid());

-- Cascade store access to child tables
CREATE POLICY "store_data_access" ON returns
  FOR ALL USING (
    store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid())
  );
-- (Repeat similar policies for orders, labels, automations, etc.)
```

### Supabase Storage Buckets

```
return-photos/     — Müşteri iade fotoğrafları (public read)
shipping-labels/   — Kargo etiketleri PDF (authenticated read)
store-assets/      — Mağaza logoları, portal görselleri
```

---

## 4. TASARIM SİSTEMİ

### Felsefe
> **Premium Minimalizm** — Az eleman, güçlü hiyerarşi, her detay kasıtlı.
> Siyah-gri tonlarında sofistike bir karanlık tema, beyaz ve accent renk ile nefes alan layout.

### Renk Paleti

```css
:root {
  /* ——— BACKGROUND ——— */
  --bg-primary:       #09090B;    /* Sayfa arka planı — neredeyse siyah */
  --bg-secondary:     #111113;    /* Card arka planı */
  --bg-tertiary:      #18181B;    /* Hover, nested card */
  --bg-elevated:      #1F1F23;    /* Modal, dropdown, tooltip */
  --bg-input:         #141416;    /* Form input arka planı */

  /* ——— BORDER ——— */
  --border-default:   #27272A;    /* Genel border */
  --border-subtle:    #1E1E21;    /* Hafif ayırıcı */
  --border-hover:     #3F3F46;    /* Hover durumu */
  --border-focus:     #52525B;    /* Focus ring */

  /* ——— TEXT ——— */
  --text-primary:     #FAFAFA;    /* Ana metin — neredeyse beyaz */
  --text-secondary:   #A1A1AA;    /* Yardımcı metin */
  --text-tertiary:    #71717A;    /* Placeholder, disabled */
  --text-muted:       #52525B;    /* En düşük kontrast */

  /* ——— ACCENT ——— */
  --accent-primary:   #E4E4E7;    /* CTA buton — sade beyazımsı */
  --accent-hover:     #D4D4D8;    /* CTA hover */
  --accent-text:      #09090B;    /* CTA üzerindeki yazı — siyah */

  /* ——— STATUS (Minimal — sadece ihtiyaç halinde) ——— */
  --status-success:   #22C55E;    /* Onaylandı, tamamlandı */
  --status-warning:   #EAB308;    /* Beklemede, dikkat */
  --status-error:     #EF4444;    /* Reddedildi, hata */
  --status-info:      #3B82F6;    /* Bilgi, işlemde */

  /* ——— SEMANTIC SURFACES ——— */
  --success-surface:  rgba(34, 197, 94, 0.08);
  --warning-surface:  rgba(234, 179, 8, 0.08);
  --error-surface:    rgba(239, 68, 68, 0.08);
  --info-surface:     rgba(59, 130, 246, 0.08);
}
```

### Tipografi

```css
/* Font Stack */
--font-sans:   'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono:   'JetBrains Mono', 'Fira Code', monospace;

/* Scale — Tight & Clean */
--text-xs:     0.75rem;     /* 12px — Badge, label */
--text-sm:     0.8125rem;   /* 13px — Secondary text, table */
--text-base:   0.875rem;    /* 14px — Body text (14px, NOT 16px) */
--text-lg:     1rem;        /* 16px — Section title */
--text-xl:     1.25rem;     /* 20px — Page title */
--text-2xl:    1.5rem;      /* 24px — Dashboard header */
--text-3xl:    2rem;        /* 32px — Landing hero */
--text-4xl:    2.5rem;      /* 40px — Landing mega */

/* Letter Spacing — Tighter at larger sizes */
--tracking-tight:    -0.02em;   /* Başlıklar */
--tracking-normal:   -0.01em;   /* Body */
--tracking-wide:     0.05em;    /* Labels, overlines — UPPERCASE */

/* Line Height */
--leading-tight:     1.3;
--leading-normal:    1.5;
--leading-relaxed:   1.7;

/* Font Weight */
--weight-normal:     400;
--weight-medium:     500;       /* Çoğu UI text */
--weight-semibold:   600;       /* Başlıklar */
--weight-bold:       700;       /* Hero, CTA */
```

### Spacing & Layout

```css
/* 4px grid system */
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;

/* Border Radius */
--radius-sm:   6px;     /* Input, badge */
--radius-md:   8px;     /* Card, button */
--radius-lg:   12px;    /* Modal, dropdown */
--radius-xl:   16px;    /* Section, hero card */
--radius-full: 9999px;  /* Avatar, pill */

/* Shadows — Minimal, layered */
--shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md:   0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-lg:   0 8px 24px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 20px rgba(255, 255, 255, 0.03);  /* Subtle card glow */
```

### Animasyon & Motion

```css
/* Easing */
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1);      /* Natural deceleration */
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);      /* Smooth both ways */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* Slight overshoot */

/* Durations */
--duration-fast:    150ms;   /* Hover, toggle */
--duration-normal:  250ms;   /* Expand, slide */
--duration-slow:    400ms;   /* Modal, page transition */
```

**Framer Motion Preset'leri:**

```tsx
// Sayfa geçişi
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
};

// Staggered list
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.04 } }
};
export const staggerItem = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 }
};

// Card hover
export const cardHover = {
  whileHover: {
    y: -2,
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    borderColor: "var(--border-hover)"
  },
  transition: { duration: 0.2 }
};

// Counter / Number animation
export const counterAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "spring", stiffness: 200, damping: 15 }
};

// Skeleton loading pulse
export const skeletonPulse = {
  animate: {
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 1.8, repeat: Infinity }
  }
};

// Sidebar item
export const sidebarItemHover = {
  whileHover: {
    x: 4,
    backgroundColor: "var(--bg-tertiary)",
    transition: { duration: 0.15 }
  }
};

// Status badge pop-in
export const badgePopIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 400, damping: 20 }
};

// Toast notification slide-in
export const toastSlide = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
};
```

### Bileşen Tasarım Prensipleri

**Butonlar:**
```
Primary:     bg-[#E4E4E7] text-[#09090B] — bold, tüm CTA'lar
Secondary:   bg-transparent border-[#27272A] text-[#FAFAFA] — ikincil aksiyonlar
Ghost:       bg-transparent text-[#A1A1AA] — minimal aksiyonlar
Danger:      bg-transparent border-red-500/30 text-red-400 — silme, iptal
Disabled:    opacity-40 cursor-not-allowed

Height:      h-8 (sm), h-9 (md), h-10 (lg)
Padding:     px-3 (sm), px-4 (md), px-5 (lg)
Font:        text-sm font-medium
Radius:      rounded-md (8px)
Transition:  150ms ease — background + border + shadow
Hover:       Subtle brightness shift, NO scale transform
```

**Card'lar:**
```
Background:  bg-[#111113]
Border:      border border-[#27272A]
Radius:      rounded-lg (12px)
Padding:     p-5 veya p-6
Shadow:      None (default) → shadow-md on hover (optional)
Hover:       border-[#3F3F46] + translateY(-2px) (Framer Motion)
```

**Input'lar:**
```
Background:  bg-[#141416]
Border:      border border-[#27272A]
Focus:       border-[#52525B] ring-1 ring-[#52525B]/30
Placeholder: text-[#52525B]
Text:        text-[#FAFAFA]
Height:      h-9
Padding:     px-3
Font:        text-sm
Radius:      rounded-md
```

**Tablo:**
```
Header:      bg-[#111113] text-[#71717A] text-xs uppercase tracking-wide font-medium
Row:         bg-transparent border-b border-[#1E1E21]
Row Hover:   bg-[#18181B]/50
Cell:        text-sm text-[#FAFAFA] py-3 px-4
Selected:    bg-[#18181B] border-l-2 border-l-[#E4E4E7]
```

**Badge / Status:**
```
Pending:     bg-yellow-500/10 text-yellow-400 border border-yellow-500/20
Approved:    bg-blue-500/10 text-blue-400 border border-blue-500/20
Shipped:     bg-purple-500/10 text-purple-400 border border-purple-500/20
Completed:   bg-green-500/10 text-green-400 border border-green-500/20
Rejected:    bg-red-500/10 text-red-400 border border-red-500/20

Style:       text-xs font-medium px-2 py-0.5 rounded-full
```

### Dashboard Layout

```
┌──────────────────────────────────────────────────┐
│  HEADER (h-14)                                   │
│  Logo | Breadcrumb            Search | Lang | User│
├───────────┬──────────────────────────────────────┤
│           │                                      │
│  SIDEBAR  │   MAIN CONTENT                       │
│  (w-60)   │   (flex-1, p-6)                      │
│           │                                      │
│  Nav      │   ┌─ Page Header ──────────────────┐ │
│  items    │   │ Title          Actions / Filter │ │
│           │   └────────────────────────────────┘ │
│  ──────   │                                      │
│           │   ┌─ Stats Grid (4 col) ───────────┐ │
│  Settings │   │ ■  ■  ■  ■                     │ │
│  Billing  │   └────────────────────────────────┘ │
│           │                                      │
│           │   ┌─ Data Table ───────────────────┐ │
│           │   │ ...                            │ │
│           │   └────────────────────────────────┘ │
│           │                                      │
└───────────┴──────────────────────────────────────┘

Mobile: Sidebar → Sheet (slide from left), hamburger menu in header
```

---

## 5. OTOMASYON SİSTEMİ

### Kural Motoru Yapısı

```typescript
interface AutomationRule {
  id: string;
  name: string;
  trigger: TriggerType;
  conditions: Condition[];    // AND logic (tümü sağlanmalı)
  actions: Action[];          // Sırayla çalıştırılır
}

type TriggerType =
  | 'return_created'              // İade oluşturulduğunda
  | 'return_status_changed'       // Durum değiştiğinde
  | 'return_deadline_approaching' // SLA yaklaşırken (24h kala)
  | 'return_received'             // Ürün depoya ulaştığında
  | 'order_fulfilled';            // Sipariş kargolandığında (proaktif)

interface Condition {
  field: string;       // reason, total_price, customer_email, order_count, product_tag, ...
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'not_contains' | 'in';
  value: any;
}

type Action =
  | { type: 'auto_approve' }
  | { type: 'auto_reject', config: { reason: string } }
  | { type: 'send_email', config: { template: string, customMessage?: string } }
  | { type: 'create_label', config: { carrier: string } }
  | { type: 'assign_to', config: { userId: string } }
  | { type: 'add_tag', config: { tag: string } }
  | { type: 'add_note', config: { note: string } }
  | { type: 'notify_slack', config: { webhookUrl: string, message: string } }
  | { type: 'change_status', config: { status: string } }
  | { type: 'delay', config: { minutes: number } }       // Sonraki aksiyonu beklet
  | { type: 'webhook', config: { url: string, method: string } };
```

### Hazır Otomasyon Şablonları

```yaml
1. Otomatik Onay (Düşük Riskli):
   trigger: return_created
   conditions:
     - field: total_price, op: lte, value: 200   # ₺200 altı
     - field: reason, op: in, value: [defective, wrong_item, damaged]
   actions:
     - auto_approve
     - send_email: { template: return-approved }
     - create_label: { carrier: yurtici }

2. VIP Müşteri Hızlı İade:
   trigger: return_created
   conditions:
     - field: customer_order_count, op: gte, value: 5   # 5+ sipariş
   actions:
     - auto_approve
     - send_email: { template: return-approved, customMessage: "VIP müşterimiz..." }
     - create_label: { carrier: aras }
     - add_tag: { tag: "vip-return" }

3. Yüksek Tutarlı İade Bildirimi:
   trigger: return_created
   conditions:
     - field: total_price, op: gte, value: 1000   # ₺1000+
   actions:
     - assign_to: { userId: "store-owner" }
     - add_note: { note: "⚠️ Yüksek tutarlı iade — manuel inceleme gerekli" }
     - send_email: { template: return-pending }

4. SLA Uyarı:
   trigger: return_deadline_approaching
   conditions:
     - field: status, op: in, value: [pending, approved]
   actions:
     - send_email: { template: return-reminder }
     - notify_slack: { message: "⏰ İade #{return_number} SLA'ya yaklaşıyor" }

5. Kargo Takip Güncelleme:
   trigger: return_status_changed
   conditions:
     - field: new_status, op: eq, value: shipped
   actions:
     - send_email: { template: status-update }
     - delay: { minutes: 1440 }   # 24 saat sonra
     - send_email: { template: return-reminder }   # Ulaştı mı kontrol

6. Otomatik Geri Ödeme:
   trigger: return_status_changed
   conditions:
     - field: new_status, op: eq, value: inspected
     - field: inspection_result, op: eq, value: approved
   actions:
     - change_status: { status: refunded }
     - send_email: { template: refund-processed }
```

---

## 6. FİYATLANDIRMA & BİLLING

### Plan Tablosu

| | **Starter** | **Growth** | **Enterprise** |
|---|---|---|---|
| **Fiyat (USD)** | $49/ay | $149/ay | $399/ay |
| **Fiyat (TRY)** | ₺1.499/ay | ₺4.499/ay | ₺11.999/ay |
| **Yıllık (USD)** | $39/ay (%20↓) | $119/ay (%20↓) | $319/ay (%20↓) |
| **Yıllık (TRY)** | ₺1.199/ay (%20↓) | ₺3.599/ay (%20↓) | ₺9.599/ay (%20↓) |
| İade/ay | 100 | 500 | Sınırsız |
| Etiket/ay | 100 | 500 | Sınırsız |
| Mağaza | 1 | 3 | 10 |
| Otomasyon | 3 kural | Sınırsız | Sınırsız |
| Kargo (TR) | Yurtiçi | Yurtiçi + Aras + MNG | Tümü |
| Kargo (Global) | — | EasyPost (UPS, FedEx) | Tümü + özel |
| E-posta şablonu | 3 varsayılan | Özelleştirilebilir | Tam özel HTML |
| Analitik | Temel | Gelişmiş | Gelişmiş + Export |
| Portal özelleştirme | Logo + renk | Full brand | Full brand + custom domain |
| Destek | Email | Öncelikli email | Dedicated + Slack |
| API erişimi | — | Read-only | Full CRUD |
| Webhook | — | 3 endpoint | Sınırsız |
| Ekip üyesi | 1 | 5 | Sınırsız |
| **Ek iade (overage)** | $0.50 / iade | $0.40 / iade | $0.25 / iade |
| **Ek iade (TRY)** | ₺15 / iade | ₺12 / iade | ₺7.50 / iade |

### 14 Gün Ücretsiz Deneme
- Tüm Growth özellikleri açık
- 20 iade limiti (demo amaçlı)
- Kredi kartı gerekmez
- Deneme sonunda Starter'a düşer veya plan seçer

### Lemon Squeezy Entegrasyonu

```
Checkout Flow:
1. Kullanıcı plan seçer → LS checkout sayfasına yönlenir
2. Ödeme tamamlanır → LS webhook gönderir
3. Webhook handler:
   - subscription_created → DB'de subscription oluştur
   - subscription_updated → Plan/durum güncelle
   - subscription_payment_success → Dönemi uzat
   - subscription_cancelled → Dönem sonuna kadar aktif tut

Usage-Based Billing:
1. Her iade oluşturulduğunda → usage tablosundaki counter +1
2. Ayın sonunda (cron job) → LS Usage API ile overage raporla
3. LS sonraki faturaya overage ekler

Gerekli LS Webhook Event'leri:
- subscription_created
- subscription_updated
- subscription_cancelled
- subscription_resumed
- subscription_payment_success
- subscription_payment_failed
- subscription_payment_recovered
```

---

## 7. SHOPIFY API ENTEGRASYONU

### OAuth Flow

```
1. Mağaza sahibi "Shopify'ı Bağla" butonuna tıklar
2. /api/auth/shopify → Shopify OAuth URL oluştur
   - scopes: read_orders, write_orders, read_products, read_customers, write_refunds
3. Mağaza sahibi Shopify'da yetkilendirir
4. /api/auth/shopify/callback → access_token al, stores tablosuna kaydet
5. İlk sipariş sync'i başlat (son 90 gün)
```

### Webhook Subscriptions (Kurulum sonrası otomatik)

```
orders/create        → Yeni sipariş geldiğinde → orders tablosuna ekle
orders/updated       → Sipariş güncellendiğinde → orders tablosunu güncelle
orders/fulfilled     → Sipariş kargolandığında → otomasyon tetikle
refunds/create       → Geri ödeme yapıldığında → return durumu güncelle
app/uninstalled      → Uygulama kaldırıldığında → store deaktive et
```

### Sipariş Sync Stratejisi

```
İlk kurulum:  Son 90 günün siparişlerini çek (paginated, 250/sayfa)
Sonrası:      Webhooks ile real-time sync
Cron (hourly): Delta sync — son 2 saatte güncellenen siparişleri kontrol et
               Webhook kaçırma ihtimaline karşı güvenlik ağı
```

---

## 8. MÜŞTERİ İADE PORTALI

### URL Yapısı
```
https://returnbox.app/portal/{storeSlug}              → İade başlat
https://returnbox.app/portal/{storeSlug}/{returnId}    → İade takip
https://returnbox.app/portal/{storeSlug}/{returnId}/label → Etiket indir
```

### Portal Akışı

```
Adım 1: Sipariş Bul
  → Müşteri sipariş numarası (#1001) + e-posta adresi girer
  → Sistem siparişi bulur, iade edilebilir ürünleri listeler

Adım 2: Ürün Seç & Sebep Belirt
  → Müşteri iade etmek istediği ürünleri seçer (checkbox)
  → Her ürün için iade sebebi seçer (dropdown)
  → İsteğe bağlı: detaylı açıklama yazar
  → İsteğe bağlı: ürün fotoğrafı yükler (max 5, max 5MB each)

Adım 3: Çözüm Tercihi
  → Geri ödeme / Ürün değişimi / Mağaza kredisi

Adım 4: Özet & Gönder
  → Seçimlerin özeti
  → "İade Talebimi Gönder" butonu
  → Onay e-postası gönderilir

Adım 5: Takip Sayfası
  → İade durumu (timeline/progress bar)
  → Kargo etiketi (varsa) — PDF indir
  → Takip numarası ve link
  → İletişim butonu
```

### Portal Özelleştirme (Store Settings)

```json
{
  "portal_config": {
    "logo_url": "...",
    "primary_color": "#000000",
    "accent_color": "#E4E4E7",
    "welcome_message_tr": "İade işleminizi kolayca başlatın",
    "welcome_message_en": "Start your return easily",
    "return_reasons": ["defective", "wrong_item", "changed_mind", "too_large", "too_small"],
    "require_photos": false,
    "require_photos_for": ["defective", "damaged"],
    "max_return_days": 14,
    "allow_exchange": true,
    "allow_store_credit": true,
    "custom_css": ""
  }
}
```

---

## 9. E-POSTA ŞABLONLARI

### Şablon Listesi

| Şablon | Tetikleyici | Açıklama |
|--------|-------------|----------|
| `return-received` | İade oluşturuldu | "Talebinizi aldık, inceliyoruz" |
| `return-approved` | İade onaylandı | "Talebiniz onaylandı, kargo etiketi ekte" |
| `return-rejected` | İade reddedildi | "Maalesef talebiniz uygun bulunmadı" |
| `label-ready` | Etiket oluşturuldu | "Kargo etiketiniz hazır, indirin" |
| `status-update` | Durum değişti | "İade durumunuz güncellendi" |
| `refund-processed` | Geri ödeme yapıldı | "Geri ödemeniz işleme alındı" |
| `return-reminder` | 48h yanıt yok | "İade talebiniz hakkında hatırlatma" |
| `deadline-warning` | SLA yaklaşıyor | (mağaza sahibine) "İade #{no} SLA süresi doluyor" |

### Email Tasarımı (React Email + Resend)
```
- Minimal, inline CSS (email uyumlu)
- Mağaza logosu header'da
- Koyu tema UYGULANMAZ (email client'lar desteklemez)
- Beyaz arka plan, siyah text, accent renk butonlar
- Mobil responsive (single column, max-width: 600px)
- Unsubscribe footer (Resend otomatik ekler)
```

---

## 10. ANALİTİK DASHBOARD

### Metrikler

```
Ana KPI'lar (Stats Grid — 4 kart):
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Toplam İade  │ İade Oranı   │ Ort. Çözüm   │ Geri Ödeme   │
│ Bu Ay: 47    │ %4.2         │ 3.2 gün      │ ₺12,450      │
│ ↑12% vs prev │ ↓0.3% vs    │ ↓0.5 gün vs  │ ↑8% vs prev  │
└──────────────┴──────────────┴──────────────┴──────────────┘

Charts:
1. İade Trendi          — Line chart (günlük/haftalık/aylık)
2. İade Sebep Dağılımı  — Donut chart
3. Ürün Bazlı İade      — Horizontal bar (en çok iade edilen 10 ürün)
4. Çözüm Tipi Dağılımı  — Stacked bar (refund vs exchange vs credit)
5. Ortalama Çözüm Süresi — Line chart (trend)
6. Müşteri İade Sıklığı  — Histogram

Filtreleme:
- Tarih aralığı (date range picker)
- Durum
- İade sebebi
- Ürün/koleksiyon
- Export: CSV, PDF rapor
```

---

## 11. DOCKER & DEPLOYMENT

### docker-compose.yml

```yaml
version: "3.9"

services:
  # ——— Next.js App ———
  app:
    build:
      context: .
      dockerfile: docker/Dockerfile
    container_name: returnbox-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - SHOPIFY_API_KEY=${SHOPIFY_API_KEY}
      - SHOPIFY_API_SECRET=${SHOPIFY_API_SECRET}
      - LEMONSQUEEZY_API_KEY=${LEMONSQUEEZY_API_KEY}
      - LEMONSQUEEZY_SIGNING_SECRET=${LEMONSQUEEZY_SIGNING_SECRET}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - EASYPOST_API_KEY=${EASYPOST_API_KEY}
      - REDIS_URL=redis://redis:6379
      - NEXT_PUBLIC_APP_URL=${APP_URL}
    depends_on:
      - redis
    networks:
      - returnbox-net

  # ——— BullMQ Worker ———
  worker:
    build:
      context: .
      dockerfile: docker/Dockerfile.worker
    container_name: returnbox-worker
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - REDIS_URL=redis://redis:6379
      - RESEND_API_KEY=${RESEND_API_KEY}
      - EASYPOST_API_KEY=${EASYPOST_API_KEY}
    depends_on:
      - redis
    networks:
      - returnbox-net

  # ——— Redis (Job Queue) ———
  redis:
    image: redis:7-alpine
    container_name: returnbox-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    networks:
      - returnbox-net

  # ——— Caddy (Reverse Proxy + Auto SSL) ———
  caddy:
    image: caddy:2-alpine
    container_name: returnbox-caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/Caddyfile:/etc/caddy/Caddyfile
      - caddy-data:/data
      - caddy-config:/config
    depends_on:
      - app
    networks:
      - returnbox-net

volumes:
  redis-data:
  caddy-data:
  caddy-config:

networks:
  returnbox-net:
    driver: bridge
```

### Dockerfile (Multi-stage)

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Caddyfile

```
returnbox.yourdomain.com {
    reverse_proxy app:3000
    encode gzip zstd

    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}
```

### Alternatif: Cloudflare Tunnel

```bash
# Eğer Caddy yerine Cloudflare Tunnel kullanılacaksa:
# docker-compose.yml'den caddy service'ini kaldır
# Aşağıdaki service'i ekle:

  tunnel:
    image: cloudflare/cloudflared:latest
    container_name: returnbox-tunnel
    restart: unless-stopped
    command: tunnel --no-autoupdate run --token ${CF_TUNNEL_TOKEN}
    networks:
      - returnbox-net
```

---

## 12. ENVIRONMENT VARIABLES

```env
# ——— App ———
NEXT_PUBLIC_APP_URL=https://returnbox.yourdomain.com
NODE_ENV=production

# ——— Supabase ———
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
DATABASE_URL=postgresql://postgres:xxx@db.xxxxx.supabase.co:5432/postgres

# ——— Shopify ———
SHOPIFY_API_KEY=xxxxxxxx
SHOPIFY_API_SECRET=shpss_xxxxxxxx
SHOPIFY_SCOPES=read_orders,write_orders,read_products,read_customers,write_refunds

# ——— Lemon Squeezy ———
LEMONSQUEEZY_API_KEY=xxxxxxxx
LEMONSQUEEZY_STORE_ID=xxxxx
LEMONSQUEEZY_SIGNING_SECRET=xxxxxxxx
LEMONSQUEEZY_STARTER_MONTHLY_VARIANT_ID=xxxxx
LEMONSQUEEZY_STARTER_YEARLY_VARIANT_ID=xxxxx
LEMONSQUEEZY_GROWTH_MONTHLY_VARIANT_ID=xxxxx
LEMONSQUEEZY_GROWTH_YEARLY_VARIANT_ID=xxxxx
LEMONSQUEEZY_ENTERPRISE_MONTHLY_VARIANT_ID=xxxxx
LEMONSQUEEZY_ENTERPRISE_YEARLY_VARIANT_ID=xxxxx

# ——— Resend (Email) ———
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL=returns@yourdomain.com
RESEND_FROM_NAME=ReturnBox

# ——— Shipping ———
EASYPOST_API_KEY=EZTKxxxxxxxx
YURTICI_API_USERNAME=xxxxx
YURTICI_API_PASSWORD=xxxxx
ARAS_API_KEY=xxxxx
MNG_API_KEY=xxxxx

# ——— Redis ———
REDIS_URL=redis://localhost:6379

# ——— PostHog (Analytics) ———
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# ——— Cloudflare Tunnel (opsiyonel) ———
CF_TUNNEL_TOKEN=xxxxxxxx
```

---

## 13. GELİŞTİRME ADIMLARI (CLAUDE CODE İÇİN)

### Faz 1: Temel Altyapı (Gün 1-3)
```
1. Next.js 14 projesi oluştur (App Router, TypeScript, Tailwind)
2. shadcn/ui kur ve dark theme konfigüre et (yukarıdaki renk paletini uygula)
3. next-intl kur, tr.json ve en.json oluştur
4. Drizzle ORM kur, Supabase bağlantısı yap
5. Veritabanı şemasını oluştur (migration)
6. Supabase Auth konfigüre et
7. Layout bileşenlerini yap (Sidebar, Header, DashboardShell)
8. Framer Motion animasyonlarını global ayarla
9. Docker setup (Dockerfile, docker-compose.yml)
```

### Faz 2: Shopify Entegrasyonu (Gün 4-6)
```
1. Shopify OAuth flow implement et
2. Shopify webhook handler yaz
3. Sipariş sync mekanizması oluştur
4. Sipariş listesi sayfası (orders/page.tsx)
5. Shopify refund API entegrasyonu
```

### Faz 3: İade Yönetimi (Gün 7-10)
```
1. İade CRUD API'leri
2. İade listesi sayfası (filtreleme, sıralama, arama)
3. İade detay sayfası (timeline, aksiyonlar)
4. İade oluşturma formu (manuel)
5. İade durum değişikliği flow'u
6. Return timeline bileşeni
```

### Faz 4: Müşteri Portalı (Gün 11-13)
```
1. Portal layout (mağaza branding'i ile)
2. Sipariş arama & iade başlatma
3. Ürün seçimi & sebep formu
4. Fotoğraf yükleme (Supabase Storage)
5. İade takip sayfası
6. Etiket indirme sayfası
```

### Faz 5: Kargo & Etiket (Gün 14-16)
```
1. EasyPost API entegrasyonu (global)
2. Yurtiçi/Aras/MNG API entegrasyonları (TR)
3. PDF etiket oluşturma
4. Kargo takip sistemi
5. Otomatik takip güncelleme (BullMQ job)
```

### Faz 6: Otomasyon (Gün 17-19)
```
1. Kural motoru (engine.ts)
2. Koşul değerlendirici
3. Aksiyon çalıştırıcı
4. Kural oluşturma UI (rule-builder)
5. Hazır şablonlar
6. BullMQ job'ları (check-automation)
```

### Faz 7: E-posta & Bildirim (Gün 20-21)
```
1. Resend client setup
2. React Email şablonları (6 şablon)
3. Email gönderim job'u
4. Bildirim geçmişi
```

### Faz 8: Billing (Gün 22-24)
```
1. Lemon Squeezy API client
2. Checkout flow
3. Webhook handler
4. Usage tracking
5. Billing dashboard (plan, kullanım, fatura)
6. Plan limitleri enforcement
```

### Faz 9: Analitik (Gün 25-26)
```
1. Analytics API endpoints
2. Stats grid bileşeni
3. Chart bileşenleri (Recharts)
4. Tarih aralığı filtresi
5. CSV/PDF export
```

### Faz 10: Polish & Deploy (Gün 27-30)
```
1. Loading states, error boundaries, empty states
2. Responsive tasarım (mobile test)
3. Animasyon fine-tuning
4. SEO meta tags (landing page)
5. GitHub Actions CI/CD pipeline
6. Docker production build & deploy
7. Cloudflare Tunnel veya Caddy SSL
8. Seed data & demo modu
```

---

## 14. ÖNEMLİ NOTLAR

### Güvenlik
- Shopify webhook'larını HMAC ile doğrula
- Lemon Squeezy webhook'larını signature ile doğrula
- Supabase RLS politikalarını her tablo için uygula
- API rate limiting (express-rate-limit veya upstash/ratelimit)
- Shopify access token'ları encrypt ederek sakla (AES-256)
- CORS sadece kendi domain'den
- CSRF token for mutations
- Input sanitization (DOMPurify for user content)

### Performans
- React Server Components (RSC) mümkün olan her yerde
- Streaming SSR for dashboard pages
- ISR (Incremental Static Regeneration) for landing & portal
- Image optimization (next/image + Supabase CDN)
- Database connection pooling (Supabase pgBouncer)
- Redis caching for frequently accessed data
- Lazy loading for charts and heavy components

### i18n Stratejisi
- URL: /tr/dashboard, /en/dashboard
- Default locale: 'tr'
- Fallback locale: 'en'
- Tarih formatı: tr → DD.MM.YYYY, en → MM/DD/YYYY
- Para formatı: tr → ₺1.499,00 , en → $49.00
- Tüm UI text next-intl üzerinden, hardcoded string YOK
- Email şablonları müşterinin locale'ine göre gönderilir

### Test
- Unit: Vitest
- E2E: Playwright
- API: Supertest
- Component: Testing Library

---

## 15. LANDING PAGE YAPISI

```
Sections (Tek sayfa — scroll):

1. HERO
   - Başlık: "Shopify İadelerinizi Otomatikleştirin" / "Automate Your Shopify Returns"
   - Alt başlık: 1-2 cümle value prop
   - CTA: "Ücretsiz Deneyin" → /register
   - Demo GIF/Video (dashboard preview)
   - Gradient mesh background (subtle, dark)

2. PROBLEM → SOLUTION
   - 3 pain point (ikon + başlık + açıklama)
   - "ReturnBox ile..." transition

3. FEATURES (3-4 öne çıkan)
   - İade Otomasyonu
   - Müşteri Self-Service Portalı
   - Kargo Etiketi Oluşturma
   - Detaylı Analitik
   - Her biri: İkon + Başlık + Kısa açıklama + Screenshot/mockup

4. NASIL ÇALIŞIR (3 adım)
   - Shopify'ı bağla → Kuralları ayarla → Otomatik yönet

5. FİYATLANDIRMA
   - 3 plan kartı (toggle: aylık/yıllık, TRY/USD)
   - Öne çıkan: Growth planı

6. TESTIMONIALS / TRUST
   - "X mağaza güveniyor" (ilk başta placeholder)

7. FAQ (Accordion)

8. CTA BANNER
   - "14 gün ücretsiz deneyin, kredi kartı gerekmez"

9. FOOTER
   - Logo, linkler, sosyal medya, dil seçici
```

---

## 16. KULLANILACAK PAKETLER

```json
{
  "dependencies": {
    "next": "^14.2",
    "react": "^18.3",
    "react-dom": "^18.3",
    "typescript": "^5.4",
    "@supabase/supabase-js": "^2.43",
    "@supabase/ssr": "^0.3",
    "drizzle-orm": "^0.31",
    "next-intl": "^3.15",
    "zustand": "^4.5",
    "react-hook-form": "^7.51",
    "@hookform/resolvers": "^3.6",
    "zod": "^3.23",
    "framer-motion": "^11.2",
    "@tanstack/react-table": "^8.17",
    "recharts": "^2.12",
    "lucide-react": "^0.390",
    "@radix-ui/react-dialog": "^1.1",
    "@radix-ui/react-dropdown-menu": "^2.1",
    "@radix-ui/react-tabs": "^1.1",
    "@radix-ui/react-tooltip": "^1.1",
    "@radix-ui/react-select": "^2.1",
    "tailwind-merge": "^2.3",
    "clsx": "^2.1",
    "class-variance-authority": "^0.7",
    "bullmq": "^5.7",
    "ioredis": "^5.4",
    "resend": "^3.4",
    "@react-email/components": "^0.0.19",
    "@shopify/shopify-api": "^11.0",
    "@lemonsqueezy/lemonsqueezy.js": "^3.2",
    "@easypost/api": "^7.0",
    "@react-pdf/renderer": "^3.4",
    "date-fns": "^3.6",
    "sonner": "^1.5",
    "cmdk": "^1.0",
    "next-themes": "^0.3"
  },
  "devDependencies": {
    "drizzle-kit": "^0.22",
    "tailwindcss": "^3.4",
    "postcss": "^8.4",
    "autoprefixer": "^10.4",
    "vitest": "^1.6",
    "@playwright/test": "^1.44",
    "eslint": "^8.57",
    "prettier": "^3.3"
  }
}
```

---

*Bu doküman Claude Code'a direkt verilebilir. Her faz bağımsız implement edilebilir. Sorularınız veya değişiklik talepleriniz için dokümanı güncelleyin.*
