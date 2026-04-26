'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User, Check } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const highlights = [
  '14 gün ücretsiz, kredi kartı gerekmez',
  'Shopify entegrasyonu 2 dakikada',
  'Growth planı özellikleri dahil',
  'İstediğin zaman iptal',
];

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[#09090B] flex">
      {/* Left Panel — Visual */}
      <div className="hidden lg:flex w-80 xl:w-96 bg-[#0E0E10] border-r border-[#1E1E21] flex-col p-10 justify-between relative overflow-hidden">
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10">
          <Logo size="sm" className="mb-12" />
          <h2 className="text-xl font-bold text-[#FAFAFA] tracking-tight mb-2">
            14 gün ücretsiz deneyin
          </h2>
          <p className="text-sm text-[#71717A] mb-8">
            Growth planının tüm özellikleri dahil. Kredi kartı gerekmez.
          </p>
          <ul className="space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-green-400" />
                </div>
                <span className="text-sm text-[#A1A1AA]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-xs text-[#52525B]">
          Türkiye&apos;nin önde gelen Shopify mağazaları tarafından kullanılıyor
        </p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-6 py-12 justify-center">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-1.5 text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors mb-10 w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          iadex&apos;e Dön
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight mb-1">
              {t('title')}
            </h1>
            <p className="text-sm text-[#71717A]">{t('subtitle')}</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm text-[#A1A1AA]">{t('name')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525B]" />
                  <Input
                    placeholder="Ad Soyad"
                    className="pl-10 h-10 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] focus-visible:border-[#52525B]"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-[#A1A1AA]">Mağaza Adı</Label>
                <Input
                  placeholder="Mağazam"
                  className="h-10 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] focus-visible:border-[#52525B]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm text-[#A1A1AA]">{t('email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525B]" />
                <Input
                  type="email"
                  placeholder="ornek@sirket.com"
                  className="pl-10 h-10 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] focus-visible:border-[#52525B]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm text-[#A1A1AA]">{t('password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525B]" />
                <Input
                  type="password"
                  placeholder="En az 8 karakter"
                  className="pl-10 h-10 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] focus-visible:border-[#52525B]"
                />
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Checkbox
                id="terms"
                className="mt-0.5 border-[#27272A] data-[state=checked]:bg-[#E4E4E7] data-[state=checked]:border-[#E4E4E7]"
              />
              <Label htmlFor="terms" className="text-sm text-[#71717A] cursor-pointer leading-relaxed">
                {t('terms')} — {' '}
                <span className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                  Kullanım Koşulları
                </span>{' '}
                ve{' '}
                <span className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                  Gizlilik Politikası
                </span>
              </Label>
            </div>

            <Link href={`/${locale}/dashboard`}>
              <Button className="w-full h-10 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-semibold mt-2">
                {t('submit')}
              </Button>
            </Link>
          </form>

          <p className="text-center text-sm text-[#71717A] mt-6">
            {t('hasAccount')}{' '}
            <Link
              href={`/${locale}/login`}
              className="text-[#FAFAFA] hover:underline underline-offset-4"
            >
              {t('login')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
