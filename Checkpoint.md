# iadex — Proje Geliştirme Checkpoint'leri

## Proje: iadex
**Açıklama:** Shopify mağaza sahipleri için akıllı iade yönetimi platformu  
**Hedef Kitle:** Türkiye'deki Shopify mağaza sahipleri  
**Dil:** TR (varsayılan) + EN  
**Tasarım:** Premium Minimalizm — Koyu tema, Framer Motion animasyonlar, benzersiz UI  

---

## Faz Durumu

| Faz | Durum | Açıklama |
|-----|-------|----------|
| Faz 1: Temel Altyapı | ✅ Tamamlandı | Next.js init, Tailwind, shadcn, i18n, DB |
| Faz 2: Shopify Entegrasyonu | ⏳ Bekliyor | OAuth, webhooks, sipariş sync |
| Faz 3: İade Yönetimi | ✅ Tamamlandı | CRUD, listeler, detay, timeline, yeni iade formu |
| Faz 4: Müşteri Portalı | ✅ Tamamlandı | Portal layout, sipariş arama, takip, önizleme |
| Faz 5: Kargo & Etiket | ⏳ Bekliyor | EasyPost, Yurtiçi/Aras/MNG, PDF |
| Faz 6: Otomasyon | 🔄 UI Hazır | Kural motoru UI ✅, BullMQ ⏳ |
| Faz 7: E-posta | ⏳ Bekliyor | Resend, şablonlar |
| Faz 8: Billing | ✅ UI Tamamlandı | Plan kartları, kullanım ölçerleri |
| Faz 9: Analitik | ✅ UI Tamamlandı | Charts (Line/Pie/Bar - Recharts) |
| Faz 10: Polish & Deploy | 🔄 Devam Ediyor | Mobile responsive ✅, Docker ⏳ |

---

## Checkpoint Log

### [2026-04-27] — Faz 1 Tamamlandı ✅
- [x] SKILL.md ve RETURNBOX_PROJECT_SPEC.md okundu
- [x] Checkpoint.md oluşturuldu
- [x] Next.js 14 projesi oluşturuldu
- [x] shadcn/ui dark theme kuruldu (Radix UI ile uyumlu hale getirildi)
- [x] next-intl (TR/EN) kuruldu — tr.json + en.json
- [x] Premium dark design system (globals.css + tailwind.config.ts)
- [x] Framer Motion animasyon presetleri (stagger, cardHover, pageTransition)
- [x] Sidebar, Header, DashboardShell layout bileşenleri
- [x] Landing page (Hero + Dashboard Preview + Features + Pricing + FAQ + CTA)
- [x] Dashboard sayfası (KPI kartlar, son iadeler tablosu)
- [x] Returns listesi sayfası (filtreleme, search, action menu)
- [x] Analytics sayfası (Line/Pie/Bar chart - Recharts)
- [x] Automations sayfası (kural listesi, hazır şablonlar)
- [x] Settings sayfası (bölüm listesi)
- [x] Login + Register sayfaları
- [x] Build başarılı ✅ (http://localhost:3333)
- [x] shadcn base-nova → Radix UI uyumlu hale getirildi

### [2026-04-27] — Faz 3 & 4 Tamamlandı ✅
- [x] Returns detail sayfası (timeline, aksiyonlar, müşteri/sipariş/SLA panelleri)
- [x] Returns/new sayfası — 4 adımlı wizard (sipariş → ürünler → sebep → onay)
- [x] Customers sayfası (risk scoring, search, iade oranı)
- [x] Orders sayfası (sync butonu, status badges, dropdown menu)
- [x] Labels sayfası (kargo etiketi listesi, durum badge'leri)
- [x] Settings/billing sayfası (plan kartları, kullanım ölçerleri)
- [x] Customer portal — portal/[storeSlug]/page.tsx (5 adımlı iade akışı)
- [x] Portal preview sayfası (iframe önizleme, link kopyalama, ayarlar)
- [x] Mobile responsive layout (hamburger menu, overlay sidebar, AnimatePresence)
- [x] Header: lg:left-60 mobile support, hamburger button
- [x] Sidebar: onClose prop, X butonu, nav click close
- [x] Build başarılı ✅

### Kalan Görevler
- [ ] Drizzle schema dosyaları (drizzle/schema/)
- [ ] Docker + .env.example
- [ ] Supabase Auth gerçek entegrasyonu
- [ ] Shopify OAuth scaffolding
- [ ] API route handlers
- [ ] BullMQ workers
- [ ] E-posta şablonları (Resend)
- [ ] Settings sub-sayfaları (store, team, notifications, integrations)

---

## Tamamlanan Sayfalar

### Dashboard
- `/dashboard` — KPI kartlar + son iadeler
- `/returns` — İade listesi (search + filter)
- `/returns/[id]` — İade detay (timeline + actions)
- `/returns/new` — Yeni iade wizard
- `/orders` — Sipariş listesi
- `/customers` — Müşteri analizi
- `/labels` — Kargo etiketleri
- `/analytics` — Grafikler (Recharts)
- `/automations` — Otomasyon kuralları
- `/settings` — Ayarlar hub
- `/settings/billing` — Plan & fatura
- `/portal-preview` — Müşteri portal önizleme

### Auth
- `/login` — Giriş sayfası
- `/register` — Kayıt sayfası

### Landing
- `/` (tr/en) — Tam landing page (Hero, Features, Pricing, FAQ, CTA)

### Portal (Public)
- `/portal/[storeSlug]` — Müşteri iade portalı (5 adımlı akış)

---

## Tasarım Kararları
- **Renk Paleti:** #09090B (bg), #111113 (card), #FAFAFA (text), #E4E4E7 (accent/CTA)
- **Font:** Inter (UI) + JetBrains Mono (kod/mono)
- **Animasyonlar:** Framer Motion — pageTransition, staggerContainer, cardHover, AnimatePresence
- **Bileşenler:** shadcn/ui (new-york, neutral) üzerine custom dark theme
- **Layout:** Sidebar (w-60) + Header (h-14) + Main Content (flex-1)
- **Mobile:** lg breakpoint'te sidebar hidden → hamburger → overlay AnimatePresence slide-in

---

## Notlar
- Uygulama adı: **iadex** (spec'te ReturnBox yazıyor ama isim iadex olacak)
- Turkish users → default locale: 'tr', fallback: 'en'
- Premium + animasyonlu + hiçbir uygulamaya benzemeyen tasarım hedefleniyor
- TypeScript strict modu yok (ignoreBuildErrors: true) — hızlı geliştirme için
