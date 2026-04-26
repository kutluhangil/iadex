'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[#09090B] flex">
      {/* Left Panel — Form */}
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-6 py-12 justify-center">
        {/* Back link */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-1.5 text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors mb-10 w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          iadex
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
            <div className="space-y-1.5">
              <Label className="text-sm text-[#A1A1AA]">{t('email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525B]" />
                <Input
                  type="email"
                  placeholder="ornek@sirket.com"
                  className="pl-10 h-10 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] focus-visible:border-[#52525B] focus-visible:ring-[#52525B]/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-[#A1A1AA]">{t('password')}</Label>
                <button className="text-xs text-[#71717A] hover:text-[#FAFAFA] transition-colors">
                  {t('forgotPassword')}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525B]" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-10 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] focus-visible:border-[#52525B] focus-visible:ring-[#52525B]/20"
                />
              </div>
            </div>

            <Link href={`/${locale}/dashboard`}>
              <Button className="w-full h-10 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-semibold mt-2">
                {t('submit')}
              </Button>
            </Link>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#27272A]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#09090B] px-3 text-xs text-[#52525B]">{t('orContinue')}</span>
            </div>
          </div>

          {/* Shopify OAuth */}
          <Button
            variant="outline"
            className="w-full h-10 border-[#27272A] bg-transparent text-[#FAFAFA] hover:bg-[#18181B] hover:border-[#3F3F46] gap-2.5"
          >
            <svg viewBox="0 0 109 124" className="h-4 w-4" fill="currentColor">
              <path d="M74.7 14.8s-.1-.8-.8-1.3c-.6-.4-1.3-.4-1.3-.4l-6.3-1.2c0 0-4.2-12.8-4.6-14-.4-1.2-1.6-1.9-1.6-1.9L74.7 14.8z" />
              <path d="M60.3 0c-1.7.7-3.5 2.2-3.5 2.2s-.4.3-1.1.7C54.9 1.2 53.3 0 50.1 0c-6.4 0-9.5 8-10.4 12.1-3.3 1-5.6 1.7-5.8 1.8-1.8.6-1.8.6-2 2.3L27 96.5l43.6 7.5 13.2-3.3s0 0 0 0l-19.7-97.5c-.4-2-1.1-3.3-3.8-3.2z" />
            </svg>
            Shopify ile devam et
          </Button>

          <p className="text-center text-sm text-[#71717A] mt-6">
            {t('noAccount')}{' '}
            <Link
              href={`/${locale}/register`}
              className="text-[#FAFAFA] hover:underline underline-offset-4"
            >
              {t('register')}
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel — Visual */}
      <div className="hidden lg:flex flex-1 bg-[#0E0E10] border-l border-[#1E1E21] items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(228,228,231,0.03) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative z-10 p-12 text-center max-w-sm">
          <Logo size="lg" className="justify-center mb-8" />
          <p className="text-[#71717A] text-sm leading-relaxed">
            "iadex sayesinde iade sürecimizi tamamen otomatize ettik. Müşteri memnuniyetimiz %40 arttı."
          </p>
          <p className="text-xs text-[#52525B] mt-4">— Ali Yıldız, FashionStore</p>
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <LocaleSwitcher variant="full" className="mb-8" />
        </div>
      </div>
    </div>
  );
}
