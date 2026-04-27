<div align="center">

<br />

<img src="https://img.shields.io/badge/iadex-v0.1-000000?style=for-the-badge&logoColor=white" alt="version" />
<img src="https://img.shields.io/badge/Built_with-TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
<img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextjs" />
<img src="https://img.shields.io/badge/TailwindCSS-v3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind" />
<img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="supabase" />
<img src="https://img.shields.io/badge/Framer_Motion-Animated-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="framer" />

<br /><br />

```text
 ██╗ █████╗ ██████╗ ███████╗██╗  ██╗
 ██║██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
 ██║███████║██║  ██║█████╗   ╚███╔╝ 
 ██║██╔══██║██║  ██║██╔══╝   ██╔██╗ 
 ██║██║  ██║██████╔╝███████╗██╔╝ ██╗
 ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
```

### **Akıllı İade Yönetimi. Sıfır Karmaşa.** — Shopify mağazanız için premium iade deneyimi.

[Live App](https://iadex.io) · [Bug Bildir](https://github.com/kutluhangil/iadex/issues) · [Özellik İste](https://github.com/kutluhangil/iadex/issues)

</div>

---

## ✦ iadex Nedir?

**iadex**, Türkiye'deki Shopify mağaza sahipleri için tasarlanmış akıllı bir iade yönetimi platformudur.

Karmaşık manuel süreçlerle uğraşmayı bırakın. Müşterileriniz özelleştirilmiş portal üzerinden iade taleplerini saniyeler içinde oluşturur; siz tek bir panelden inceler, onaylar ve kargo etiketini anında üretirsiniz. Otomasyon kuralları ile çoğu iade artık kendiliğinden çözülür. Premium **"Dark Luxury"** tasarımıyla, hiçbir rakibe benzemeyen bir deneyim sunar.

---

<details>
<summary><strong>🇬🇧 English Description</strong></summary>

<br />

**iadex** is an intelligent return management platform designed for Shopify store owners in Turkey.

Stop dealing with complex manual processes. Your customers create return requests in seconds through a customized portal; you review, approve, and generate shipping labels instantly from a single dashboard. Automation rules handle most returns automatically. With a premium **"Dark Luxury"** design unlike any competitor, iadex delivers an experience your customers will remember.

</details>

---

## ⚡ Özellikler

| Özellik | Açıklama |
|---------|----------|
| 🛍️ **Müşteri Portalı** | Müşteriler sipariş numarasıyla giriş yapıp 5 adımda iade talebi oluşturur. |
| ⚡ **Otomasyon Kuralları** | Sebep, tutar ve müşteri geçmişine göre iadeleri otomatik onayla ya da reddet. |
| 📦 **Kargo Etiketi** | Yurtiçi, Aras ve MNG entegrasyonuyla tek tıkla etiket oluşturma. |
| 📊 **Analitik Paneli** | İade oranı, ortalama çözüm süresi ve maliyet analizleri — grafiksel. |
| 👥 **Müşteri Risk Skoru** | İade geçmişine göre otomatik risk sınıflandırması (Düşük / Orta / Yüksek). |
| 📧 **Otomatik E-postalar** | Resend ile her aşamada müşteriye özelleştirilebilir bildirim e-postaları. |
| 💳 **Abonelik Yönetimi** | Starter / Growth / Enterprise planları, Lemon Squeezy ile faturalandırma. |
| 🌐 **TR + EN Dil Desteği** | next-intl ile tam URL tabanlı çoklu dil desteği. |

---

## 🖼️ Screenshots

> *(Yakında — iadex arayüzünün yüksek kaliteli ekran görüntüleri)*

---

## 🛠️ Tech Stack

```
Frontend        →  Next.js 14 (App Router) · TypeScript · Tailwind CSS v3 · Framer Motion
UI Components   →  shadcn/ui (Radix UI) · Lucide React · Recharts
Auth & Database →  Supabase (PostgreSQL + Auth + Storage) · Drizzle ORM
E-posta         →  Resend
Kargo           →  EasyPost · Yurtiçi / Aras / MNG API
Billing         →  Lemon Squeezy
Queue           →  BullMQ · Redis (Upstash)
i18n            →  next-intl (TR varsayılan, EN)
Deployment      →  Vercel (Edge Network · fra1)
```

---

## 🏗️ Mimari

```
┌─────────────────────────────────────────────────────────────────┐
│                         IADEX PLATFORM                          │
│                                                                 │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │   Dashboard     │  │ Müşteri Portalı  │  │  Landing Page  │ │
│  │ (Mağaza Sahibi) │  │ /portal/[slug]   │  │  (Pazarlama)   │ │
│  └────────┬────────┘  └────────┬─────────┘  └───────┬────────┘ │
└───────────┼────────────────────┼────────────────────┼──────────┘
            │                   │                     │
            └───────────────────┴──────────┬──────────┘
                                           │ Next.js API Routes
              ┌────────────────────────────┼────────────────────┐
              │                            │                    │
   ┌──────────────────┐        ┌───────────────────┐  ┌────────────────┐
   │    Supabase      │        │      BullMQ        │  │  Shopify API   │
   │ (PostgreSQL +    │        │  (Otomasyon +      │  │  (Webhooks +   │
   │  Auth + Storage) │        │   E-posta Queue)   │  │   Sipariş Sync)│
   └──────────────────┘        └───────────────────┘  └────────────────┘
```

---

## 📐 Proje Yapısı

```text
iadex/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/              # Login & Register sayfaları
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (dashboard)/         # Korumalı dashboard rotaları
│   │   │   │   ├── dashboard/       # Ana panel (KPI + son iadeler)
│   │   │   │   ├── returns/         # İade listesi + detay + yeni iade wizard
│   │   │   │   ├── orders/          # Shopify sipariş listesi
│   │   │   │   ├── customers/       # Müşteri risk analizi
│   │   │   │   ├── labels/          # Kargo etiketleri
│   │   │   │   ├── analytics/       # Grafik & istatistikler (Recharts)
│   │   │   │   ├── automations/     # Otomasyon kural yönetimi
│   │   │   │   ├── portal-preview/  # Müşteri portal önizleme + ayarlar
│   │   │   │   └── settings/        # Ayarlar hub + billing
│   │   │   ├── portal/[storeSlug]/  # Public müşteri iade portalı
│   │   │   └── page.tsx             # Landing page
│   │   └── layout.tsx               # Root layout
│   ├── components/
│   │   ├── layout/                  # Sidebar, Header, DashboardShell
│   │   ├── shared/                  # Logo, LocaleSwitcher, ReturnStatusBadge
│   │   └── ui/                      # shadcn/ui bileşenleri (Radix UI tabanlı)
│   └── lib/
│       ├── i18n/                    # next-intl config & request handler
│       └── utils/                   # cn(), Framer Motion animation presets
├── public/
│   └── locales/                     # tr.json + en.json çeviri dosyaları
├── .env.example                     # Tüm environment variable şablonları
├── vercel.json                      # Vercel deployment konfigürasyonu
├── next.config.mjs                  # Next.js + next-intl config
├── tailwind.config.ts               # Dark design system token'ları
└── MANUAL_TASKS.md                  # Manuel kurulum adımları (sana özel)
```

---

## 🚀 Başlarken

### Gereksinimler

- Node.js `>= 18`
- npm `>= 9`
- Supabase hesabı
- Shopify Partner hesabı

### Yerel Geliştirme

```bash
# Repoyu klonla
git clone https://github.com/kutluhangil/iadex.git
cd iadex

# Bağımlılıkları yükle
npm install

# Environment variables'ları ayarla
cp .env.example .env.local
# .env.local dosyasını doldurun (bkz. MANUAL_TASKS.md)

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

### Scriptler

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Production sunucusunu başlat |
| `npm run lint` | ESLint kontrolü |

### Environment Variables

| Değişken | Açıklama | Zorunlu |
|----------|----------|:-------:|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje URL'i | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase servis rolü key (gizli) | ✅ |
| `SHOPIFY_CLIENT_ID` | Shopify uygulama client ID | ✅ |
| `SHOPIFY_CLIENT_SECRET` | Shopify uygulama client secret | ✅ |
| `SHOPIFY_WEBHOOK_SECRET` | Shopify webhook doğrulama anahtarı | ✅ |
| `RESEND_API_KEY` | Resend e-posta API key | ✅ |
| `LEMON_SQUEEZY_API_KEY` | Lemon Squeezy ödeme API key | ✅ |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL (BullMQ kuyruğu) | ✅ |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token | ✅ |
| `NEXTAUTH_SECRET` | Oturum şifreleme sırrı (min 32 karakter) | ✅ |
| `ENCRYPTION_KEY` | Shopify token şifreleme anahtarı | ✅ |

---

## 🔒 Güvenlik & Veri Gizliliği

| Katman | Uygulama |
|--------|----------|
| **Shopify Token'ları** | AES-256 ile şifrelenmiş olarak Supabase'de saklanır |
| **Row Level Security** | Supabase RLS ile her mağaza yalnızca kendi verisine erişir |
| **Webhook Doğrulama** | Tüm Shopify webhook'ları HMAC-SHA256 ile doğrulanır |
| **API Güvenliği** | Tüm route'lar oturum + mağaza sahipliği kontrolüyle korunur |

---

## 🗺️ Yol Haritası

- [x] Faz 1 — Temel altyapı (Next.js, Tailwind, shadcn, i18n, design system)
- [x] Faz 2 — Dashboard UI (KPI, returns, orders, analytics, automations)
- [x] Faz 3 — İade yönetimi (liste, detay, yeni iade 4-adım wizard)
- [x] Faz 4 — Müşteri portalı (5-adım iade akışı, portal-preview)
- [x] Faz 5 — Mobile responsive (hamburger menu, AnimatePresence overlay)
- [ ] Faz 6 — Supabase Auth & veritabanı entegrasyonu
- [ ] Faz 7 — Shopify OAuth & webhook pipeline
- [ ] Faz 8 — Kargo entegrasyonu (Yurtiçi / Aras / MNG)
- [ ] Faz 9 — E-posta şablonları (Resend)
- [ ] Faz 10 — BullMQ otomasyon motoru
- [ ] Faz 11 — Lemon Squeezy billing entegrasyonu
- [ ] Faz 12 — Production deploy & custom domain

---

## 🤝 Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Bir issue açmaktan veya pull request göndermekten çekinmeyin.

1. Repoyu fork'la
2. Feature branch'i oluştur (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerini commit'le (`git commit -m 'feat: harika özellik ekle'`)
4. Branch'e push'la (`git push origin feature/harika-ozellik`)
5. Pull Request aç

---

## 📄 Lisans

MIT Lisansı kapsamında dağıtılır. Detaylar için `LICENSE` dosyasına bakın.

---

<div align="center">

Hassasiyetle inşa edildi — [kutluhangil](https://github.com/kutluhangil)

<br />

**[iadex.io](https://iadex.io)**

<br />

*Faydalı bulduysan ⭐ vermeyi unutma*

</div>
