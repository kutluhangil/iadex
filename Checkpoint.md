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
| Faz 1: Temel Altyapı | 🔄 Devam Ediyor | Next.js init, Tailwind, shadcn, i18n, DB |
| Faz 2: Shopify Entegrasyonu | ⏳ Bekliyor | OAuth, webhooks, sipariş sync |
| Faz 3: İade Yönetimi | ⏳ Bekliyor | CRUD, listeler, detay, timeline |
| Faz 4: Müşteri Portalı | ⏳ Bekliyor | Portal layout, sipariş arama, takip |
| Faz 5: Kargo & Etiket | ⏳ Bekliyor | EasyPost, Yurtiçi/Aras/MNG, PDF |
| Faz 6: Otomasyon | ⏳ Bekliyor | Kural motoru, BullMQ |
| Faz 7: E-posta | ⏳ Bekliyor | Resend, şablonlar |
| Faz 8: Billing | ⏳ Bekliyor | Lemon Squeezy |
| Faz 9: Analitik | ⏳ Bekliyor | Charts, export |
| Faz 10: Polish & Deploy | ⏳ Bekliyor | Docker, CI/CD, responsive |

---

## Checkpoint Log

### [2026-04-27] — Faz 1 Başladı
- [x] SKILL.md ve RETURNBOX_PROJECT_SPEC.md okundu
- [x] Checkpoint.md oluşturuldu
- [x] Next.js 14+ projesi oluşturulacak
- [ ] shadcn/ui dark theme kurulumu
- [ ] next-intl (TR/EN) kurulumu
- [ ] Drizzle ORM + Supabase bağlantısı
- [ ] Sidebar, Header, DashboardShell layout
- [ ] Framer Motion animasyon presetleri
- [ ] Landing page (Hero, Features, Pricing)

---

## Tasarım Kararları
- **Renk Paleti:** #09090B (bg), #111113 (card), #FAFAFA (text), #E4E4E7 (accent/CTA)
- **Font:** Inter (UI) + JetBrains Mono (kod/mono)
- **Animasyonlar:** Framer Motion — pageTransition, staggerContainer, cardHover
- **Bileşenler:** shadcn/ui (new-york, neutral) üzerine custom dark theme
- **Layout:** Sidebar (w-60) + Header (h-14) + Main Content (flex-1)

---

## Notlar
- Uygulama adı: **iadex** (spec'te ReturnBox yazıyor ama isim iadex olacak)
- Turkish users → default locale: 'tr', fallback: 'en'
- Premium + animasyonlu + hiçbir uygulamaya benzemeyen tasarım hedefleniyor
