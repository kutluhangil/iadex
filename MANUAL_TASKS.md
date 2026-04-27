# iadex — Manuel Kurulum Adımları

Bu dosya, kod tarafının otomatik yapamayacağı, **senin elle yapman gereken** tüm kurulum adımlarını listeler. Sırasıyla takip et.

---

## 1. GitHub Repository

**Ne yapacaksın:** Projeyi GitHub'a yükle.

```bash
# Proje klasöründe:
git init
git add .
git commit -m "feat: initial iadex setup"
git branch -M main

# GitHub'da yeni bir repo oluştur: https://github.com/new
# Repo adı: iadex   (public veya private, tercihin)

git remote add origin https://github.com/KULLANICI_ADIN/iadex.git
git push -u origin main
```

---

## 2. Supabase — Veritabanı & Auth

**Ne yapacaksın:** Ücretsiz bir Supabase projesi oluştur ve key'leri al.

1. [supabase.com](https://supabase.com) adresine git → **Start your project**
2. Yeni proje oluştur:
   - **Proje adı:** `iadex`
   - **Database Password:** Güçlü bir şifre belirle ve bir yere kaydet
   - **Region:** `Central EU (Frankfurt)` seç (Türkiye için en yakın)
3. Proje oluşturulduktan sonra **Settings → API** sayfasına git
4. Şu değerleri `.env.local` dosyana kopyala:
   - `NEXT_PUBLIC_SUPABASE_URL` → **Project URL**
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → **anon / public**
   - `SUPABASE_SERVICE_ROLE_KEY` → **service_role** (gizli tut!)

> ⚠️ `service_role` key'ini asla client-side koda koyma, sadece sunucu tarafında kullan.

---

## 3. Shopify Partner Hesabı & Uygulama

**Ne yapacaksın:** Shopify'da geliştirici hesabı aç ve iadex uygulamasını oluştur.

1. [partners.shopify.com](https://partners.shopify.com) adresine git → Ücretsiz hesap aç
2. **Apps → Create app** tıkla
3. App adını `iadex` yap, URL olarak şimdilik Vercel URL'ini gir (sonra güncellenecek)
4. **App setup** sayfasında:
   - **Allowed redirection URLs:** `https://senin-vercel-url.vercel.app/api/shopify/callback`
5. **API credentials** sekmesinden al:
   - `SHOPIFY_CLIENT_ID` → **Client ID**
   - `SHOPIFY_CLIENT_SECRET` → **Client secret**
6. **Webhooks** sekmesinde webhook oluştururken gelen `secret`'ı `SHOPIFY_WEBHOOK_SECRET` olarak kaydet

> Shopify uygulamanı henüz yayınlamak zorunda değilsin. Geliştirme mağazayla test edebilirsin.

---

## 4. Resend — E-posta Servisi

**Ne yapacaksın:** Ücretsiz Resend hesabı aç, API key al.

1. [resend.com](https://resend.com) adresine git → **Get Started** (ücretsiz)
2. Hesap oluşturduktan sonra **API Keys → Create API Key**
3. Key'i kopyala → `.env.local` dosyasına `RESEND_API_KEY` olarak yapıştır
4. **Domains** sekmesine git → kendi domain'ini ekle (örn. `iadex.io`)
   - Domain yoksa şimdilik `onboarding@resend.dev` adresini kullanabilirsin (test için)
5. `RESEND_FROM_EMAIL` değişkenini ayarla: `noreply@iadex.io`

> Ücretsiz planda aylık 3.000 e-posta gönderebilirsin. Başlangıç için yeterli.

---

## 5. Lemon Squeezy — Billing & Ödeme

**Ne yapacaksın:** Abonelik sistemi için Lemon Squeezy hesabı kur.

1. [lemonsqueezy.com](https://lemonsqueezy.com) adresine git → Hesap aç
2. Mağaza oluştur:
   - **Store name:** `iadex`
   - **Currency:** `TRY` (Türk Lirası)
3. **Settings → API** → **Create API Key** tıkla → `LEMON_SQUEEZY_API_KEY` olarak kaydet
4. **Store ID'yi** bul (URL'de veya Settings'de görünür) → `LEMON_SQUEEZY_STORE_ID` olarak kaydet
5. **Webhooks** oluştur:
   - URL: `https://senin-vercel-url.vercel.app/api/billing/webhook`
   - Events: `subscription_created`, `subscription_updated`, `subscription_cancelled`
   - Secret'ı → `LEMON_SQUEEZY_WEBHOOK_SECRET` olarak kaydet
6. **Products** sekmesinde 3 ürün oluştur:
   - `Starter` — Aylık ₺1.499
   - `Growth` — Aylık ₺4.499
   - `Enterprise` — Aylık ₺11.999

> ⚠️ Gerçek para almak için Lemon Squeezy hesabını aktive etmen ve kimlik doğrulaması yapman gerekir.

---

## 6. Upstash Redis — BullMQ Kuyruğu

**Ne yapacaksın:** Otomasyon ve e-posta kuyruğu için serverless Redis kur.

1. [upstash.com](https://upstash.com) adresine git → Ücretsiz hesap aç
2. **Create Database** tıkla:
   - **Name:** `iadex-redis`
   - **Region:** `eu-west-1` (Frankfurt — Türkiye için en yakın)
   - **Type:** Regional (ücretsiz)
3. Veritabanı oluştuktan sonra **REST API** sekmesine tıkla
4. Şu değerleri `.env.local` dosyana kopyala:
   - `UPSTASH_REDIS_REST_URL` → **UPSTASH_REDIS_REST_URL**
   - `UPSTASH_REDIS_REST_TOKEN` → **UPSTASH_REDIS_REST_TOKEN**

> Ücretsiz planda günlük 10.000 komut var. Geliştirme için yeterli.

---

## 7. Gizli Key'leri Oluştur

**Ne yapacaksın:** Auth ve şifreleme için güvenli rastgele key'ler üret.

Terminal'de şu komutları çalıştır:

```bash
# NEXTAUTH_SECRET için (32+ karakter):
openssl rand -base64 32

# ENCRYPTION_KEY için (tam 32 karakter):
openssl rand -hex 16
```

Her ikisini de `.env.local` dosyana yapıştır.

---

## 8. Vercel'e Deploy

**Ne yapacaksın:** Projeyi Vercel'e bağla ve canlıya al.

1. [vercel.com](https://vercel.com) adresine git → **Add New Project**
2. GitHub hesabını bağla → `iadex` reposunu seç
3. **Framework Preset:** Next.js (otomatik algılar)
4. **Environment Variables** sekmesine tıkla ve `.env.local` dosyandaki tüm değişkenleri buraya tek tek ekle:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SHOPIFY_CLIENT_ID`
   - `SHOPIFY_CLIENT_SECRET`
   - `SHOPIFY_WEBHOOK_SECRET`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `LEMON_SQUEEZY_API_KEY`
   - `LEMON_SQUEEZY_STORE_ID`
   - `LEMON_SQUEEZY_WEBHOOK_SECRET`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → Vercel'in vereceği URL (örn. `https://iadex.vercel.app`)
   - `ENCRYPTION_KEY`
   - `NEXT_PUBLIC_APP_URL` → aynı Vercel URL'i
5. **Deploy** tıkla — build ~2 dakika sürer

---

## 9. Custom Domain Bağlama (İsteğe Bağlı)

**Ne yapacaksın:** `iadex.io` gibi kendi domain'ini Vercel'e bağla.

1. Domain'ini satın al (örn. [porkbun.com](https://porkbun.com) veya [namecheap.com](https://namecheap.com))
2. Vercel dashboard → Proje → **Settings → Domains**
3. Domain adını gir → Vercel sana DNS kayıtlarını gösterir
4. Domain sağlayıcında DNS'e şunları ekle:
   - `A` kaydı: `76.76.21.21` (Vercel IP)
   - veya `CNAME`: `cname.vercel-dns.com`
5. Propagasyon 5–30 dakika sürer

---

## 10. Supabase'de Güvenlik Kuralları (RLS)

**Ne yapacaksın:** Veritabanı tabloları oluşturulduktan sonra Row Level Security'yi aktive et.

Bu adım, Drizzle ORM migration'ları yazıldıktan sonra yapılacak. Şimdilik not olarak sakla:

- Her tabloda `store_id` sütunu olacak
- RLS politikası: `auth.uid() = stores.user_id AND stores.id = table.store_id`
- Supabase dashboard → **Authentication → Policies** üzerinden yönetilir

---

## Özet Kontrol Listesi

| Adım | Servis | Durum |
|------|--------|-------|
| 1 | GitHub repo oluşturma | ⬜ |
| 2 | Supabase proje + key'ler | ⬜ |
| 3 | Shopify Partner + uygulama | ⬜ |
| 4 | Resend hesabı + domain | ⬜ |
| 5 | Lemon Squeezy mağaza + ürünler | ⬜ |
| 6 | Upstash Redis database | ⬜ |
| 7 | Gizli key'ler oluşturma | ⬜ |
| 8 | Vercel deploy + env vars | ⬜ |
| 9 | Custom domain (isteğe bağlı) | ⬜ |
| 10 | Supabase RLS kuralları | ⬜ |

---

> Herhangi bir adımda takılırsan veya hata alırsan, ilgili servisin dokümantasyonuna bak ya da issue aç.
