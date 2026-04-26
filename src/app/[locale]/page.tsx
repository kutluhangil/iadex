'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef } from 'react';
import {
  ArrowRight,
  Zap,
  Target,
  Truck,
  BarChart3,
  ChevronDown,
  Check,
  Play,
  Star,
  Shield,
  Globe,
} from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { staggerContainer, staggerItem, cardHover } from '@/lib/utils/animations';
import { cn } from '@/lib/utils';

const featureIcons = { Zap, Target, Truck, BarChart3 };

function FloatingOrb({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('absolute rounded-full blur-3xl opacity-20 pointer-events-none', className)}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function GlowLine() {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#E4E4E7]/30 to-transparent"
      style={{ width: '60%' }}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

function PricingCard({
  plan,
  highlighted,
  locale,
  billing,
  currency,
}: {
  plan: any;
  highlighted?: boolean;
  locale: string;
  billing: 'monthly' | 'yearly';
  currency: 'try' | 'usd';
}) {
  const price = currency === 'try'
    ? billing === 'monthly' ? plan.price_try_monthly : plan.price_try_yearly
    : billing === 'monthly' ? plan.price_usd_monthly : plan.price_usd_yearly;

  const symbol = currency === 'try' ? '₺' : '$';

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        'relative rounded-2xl p-6 border transition-all duration-300',
        highlighted
          ? 'bg-[#111113] border-[#E4E4E7]/20 shadow-[0_0_40px_rgba(228,228,231,0.06)]'
          : 'bg-[#0E0E10] border-[#27272A] hover:border-[#3F3F46]'
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#E4E4E7] text-[#09090B] text-xs font-bold px-3 py-1 rounded-full">
            En Popüler
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-base font-semibold text-[#FAFAFA] mb-1">{plan.name}</h3>
        <p className="text-sm text-[#71717A]">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[#FAFAFA]">{symbol}{price.toLocaleString('tr-TR')}</span>
          <span className="text-sm text-[#71717A]">/ay</span>
        </div>
        {billing === 'yearly' && (
          <p className="text-xs text-green-400 mt-1">%20 tasarruf ediyorsunuz</p>
        )}
      </div>

      <Link href={`/${locale}/register`}>
        <Button
          className={cn(
            'w-full h-9 text-sm font-medium mb-6',
            highlighted
              ? 'bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8]'
              : 'bg-transparent border border-[#27272A] text-[#FAFAFA] hover:bg-[#18181B] hover:border-[#3F3F46]'
          )}
        >
          14 Gün Ücretsiz Deneyin
        </Button>
      </Link>

      <ul className="space-y-2.5">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className="h-3.5 w-3.5 text-[#22C55E] shrink-0 mt-0.5" />
            <span className="text-sm text-[#A1A1AA]">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className="border-b border-[#1E1E21] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className={cn(
          'text-sm font-medium transition-colors',
          open ? 'text-[#FAFAFA]' : 'text-[#A1A1AA] group-hover:text-[#FAFAFA]'
        )}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-[#52525B]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#71717A] pb-5 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LandingPage() {
  const t = useTranslations('landing');
  const locale = useLocale();
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [currency, setCurrency] = useState<'try' | 'usd'>('try');
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const plans = [
    { ...t.raw('pricing.plans.starter'), name: 'Starter' },
    { ...t.raw('pricing.plans.growth'), name: 'Growth', highlighted: true },
    { ...t.raw('pricing.plans.enterprise'), name: 'Enterprise' },
  ];

  const features = [
    { icon: 'Zap', ...t.raw('features.items.0') },
    { icon: 'Target', ...t.raw('features.items.1') },
    { icon: 'Truck', ...t.raw('features.items.2') },
    { icon: 'BarChart3', ...t.raw('features.items.3') },
  ] as any[];

  const faqItems = t.raw('faq.items') as any[];
  const howItWorksSteps = t.raw('howItWorks.steps') as any[];

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 h-16 border-b border-[#1E1E21]/50 glass"
      >
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <Logo size="sm" />
          <div className="hidden md:flex items-center gap-6">
            {['Özellikler', 'Fiyatlandırma', 'SSS'].map((item) => (
              <button
                key={item}
                className="text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitcher variant="full" />
            <Link href={`/${locale}/login`}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]"
              >
                Giriş
              </Button>
            </Link>
            <Link href={`/${locale}/register`}>
              <Button
                size="sm"
                className="h-8 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium"
              >
                Ücretsiz Deneyin
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex flex-col items-center justify-center pt-16 gradient-mesh"
      >
        {/* Background orbs */}
        <FloatingOrb className="w-[600px] h-[600px] bg-blue-500 -top-32 -left-64" />
        <FloatingOrb className="w-[400px] h-[400px] bg-purple-500 bottom-0 -right-48" />
        <FloatingOrb className="w-[300px] h-[300px] bg-green-500 top-1/2 left-1/4" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181B] border border-[#27272A] text-xs text-[#A1A1AA] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t('hero.badge')}
            <span className="text-[#52525B]">•</span>
            <Shield className="h-3 w-3" />
            <span>SOC 2</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            {t('hero.title').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span className="text-gradient-accent" style={{
                    background: 'linear-gradient(135deg, #FAFAFA 0%, #71717A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {line}
                  </span>
                ) : line}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[#71717A] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          >
            <Link href={`/${locale}/register`}>
              <Button
                size="lg"
                className="h-12 px-8 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-semibold text-base gap-2 shine-effect"
              >
                {t('hero.cta')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 border-[#27272A] bg-transparent text-[#FAFAFA] hover:bg-[#18181B] hover:border-[#3F3F46] font-medium text-base gap-2"
            >
              <Play className="h-4 w-4" />
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-3 text-xs text-[#52525B]"
          >
            <div className="flex -space-x-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-[#09090B] bg-gradient-to-br from-[#27272A] to-[#18181B]"
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span>{t('hero.trustedBy')}</span>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-16 mx-auto max-w-4xl"
          >
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-b from-[#E4E4E7]/5 to-transparent rounded-2xl blur-xl" />

            {/* Mock dashboard */}
            <div className="relative rounded-2xl border border-[#27272A] bg-[#0E0E10] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111113] border-b border-[#1E1E21]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 mx-3 h-6 rounded-md bg-[#18181B] flex items-center px-3">
                  <span className="text-[10px] text-[#52525B]">app.iadex.com/tr/dashboard</span>
                </div>
              </div>

              {/* Dashboard content preview */}
              <div className="p-4 grid grid-cols-4 gap-3">
                {/* Sidebar mock */}
                <div className="col-span-1 bg-[#0D0D0F] rounded-lg p-3 border border-[#1E1E21] space-y-2 hidden sm:block">
                  <div className="h-6 w-16 bg-[#E4E4E7]/10 rounded mb-4" />
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`h-5 rounded flex items-center gap-2 px-2 ${i === 0 ? 'bg-[#18181B]' : ''}`}>
                      <div className="w-3 h-3 rounded bg-[#27272A]" />
                      <div className="flex-1 h-2 bg-[#1E1E21] rounded" style={{ opacity: 1 - i * 0.1 }} />
                    </div>
                  ))}
                </div>

                {/* Main content mock */}
                <div className="col-span-4 sm:col-span-3 space-y-3">
                  {/* Stats row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { v: '47', l: 'İadeler', c: 'blue' },
                      { v: '%4.2', l: 'İade Oranı', c: 'green' },
                      { v: '3.2g', l: 'Ort. Çözüm', c: 'purple' },
                      { v: '₺12.4K', l: 'Geri Ödeme', c: 'yellow' },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        className="bg-[#111113] rounded-lg p-3 border border-[#27272A]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        <p className="text-lg font-bold text-[#FAFAFA]">{s.v}</p>
                        <p className="text-[10px] text-[#71717A] mt-0.5">{s.l}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Table mock */}
                  <div className="bg-[#111113] rounded-lg border border-[#27272A] overflow-hidden">
                    <div className="px-3 py-2 border-b border-[#1E1E21] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#FAFAFA]">Son İadeler</span>
                      <span className="text-xs text-[#52525B]">Tümünü Gör →</span>
                    </div>
                    {[
                      { num: 'RET-047', status: 'pending', color: 'yellow' },
                      { num: 'RET-046', status: 'approved', color: 'blue' },
                      { num: 'RET-045', status: 'shipped', color: 'purple' },
                      { num: 'RET-044', status: 'refunded', color: 'green' },
                    ].map((row, i) => (
                      <motion.div
                        key={i}
                        className="px-3 py-2 flex items-center justify-between border-b border-[#1E1E21] last:border-0"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.08 }}
                      >
                        <span className="text-xs font-mono text-[#A1A1AA]">{row.num}</span>
                        <div className="flex gap-2">
                          <div className="h-4 w-16 bg-[#18181B] rounded" />
                          <div className="h-4 w-12 bg-[#18181B] rounded" />
                          <div className={`h-4 px-2 rounded-full text-[9px] flex items-center
                            ${row.color === 'yellow' ? 'bg-yellow-400/10 text-yellow-400' : ''}
                            ${row.color === 'blue' ? 'bg-blue-400/10 text-blue-400' : ''}
                            ${row.color === 'purple' ? 'bg-purple-400/10 text-purple-400' : ''}
                            ${row.color === 'green' ? 'bg-green-400/10 text-green-400' : ''}
                          `}>
                            {row.status}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent" />
          </motion.div>
        </div>
      </motion.section>

      {/* PROBLEM SECTION */}
      <section className="relative py-32 border-t border-[#1E1E21]">
        <GlowLine />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {t('problems.title')}
            </h2>
            <p className="text-[#71717A] max-w-xl mx-auto">
              {t('problems.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {(t.raw('problems.items') as any[]).map((item: any, i: number) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="p-6 rounded-2xl bg-[#0E0E10] border border-[#27272A] hover:border-[#3F3F46] transition-colors"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">{item.title}</h3>
                <p className="text-sm text-[#71717A] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative py-32 border-t border-[#1E1E21]">
        <FloatingOrb className="w-[400px] h-[400px] bg-blue-500 right-0 top-1/2 -translate-y-1/2" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {t('features.title').split('\n').map((line: string, i: number) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-[#71717A] max-w-xl">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {features.map((feature: any, i: number) => {
              const Icon = featureIcons[feature.icon as keyof typeof featureIcons];
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="group relative p-6 rounded-2xl bg-[#0E0E10] border border-[#27272A] hover:border-[#3F3F46] overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E4E4E7]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center mb-4 group-hover:border-[#3F3F46] transition-colors">
                      {Icon && <Icon className="h-5 w-5 text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors" />}
                    </div>
                    <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">{feature.title}</h3>
                    <p className="text-sm text-[#71717A] leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-32 border-t border-[#1E1E21]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t('howItWorks.title')}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent hidden sm:block" />

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid sm:grid-cols-3 gap-10 relative"
            >
              {howItWorksSteps.map((step: any, i: number) => (
                <motion.div key={i} variants={staggerItem} className="text-center">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#111113] border border-[#27272A] flex items-center justify-center z-10 relative">
                      <span className="text-2xl font-bold text-[#FAFAFA]">{step.number}</span>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-[#E4E4E7]/5 blur-lg" />
                  </div>
                  <h3 className="text-base font-semibold text-[#FAFAFA] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#71717A] leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative py-32 border-t border-[#1E1E21]" id="pricing">
        <FloatingOrb className="w-[500px] h-[500px] bg-purple-500 left-1/2 -translate-x-1/2 top-0" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              {t('pricing.title')}
            </h2>
            <p className="text-[#71717A]">{t('pricing.subtitle')}</p>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {/* Billing toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#111113] border border-[#27272A]">
              {(['monthly', 'yearly'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={cn(
                    'px-4 py-1.5 rounded-md text-sm font-medium transition-all',
                    billing === b
                      ? 'bg-[#E4E4E7] text-[#09090B]'
                      : 'text-[#71717A] hover:text-[#FAFAFA]'
                  )}
                >
                  {b === 'monthly' ? 'Aylık' : 'Yıllık'}
                  {b === 'yearly' && (
                    <span className="ml-1.5 text-xs text-green-400">%20↓</span>
                  )}
                </button>
              ))}
            </div>

            {/* Currency toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#111113] border border-[#27272A]">
              {(['try', 'usd'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5',
                    currency === c
                      ? 'bg-[#E4E4E7] text-[#09090B]'
                      : 'text-[#71717A] hover:text-[#FAFAFA]'
                  )}
                >
                  {c === 'try' ? (
                    <><span>🇹🇷</span> TRY</>
                  ) : (
                    <><Globe className="h-3 w-3" /> USD</>
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-5"
          >
            {plans.map((plan: any) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                highlighted={plan.highlighted}
                locale={locale}
                billing={billing}
                currency={currency}
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-[#52525B] mt-8"
          >
            {t('pricing.trial')} • {t('pricing.noCard')}
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-[#1E1E21]">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight">{t('faq.title')}</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="rounded-2xl bg-[#0E0E10] border border-[#27272A] px-6"
          >
            {faqItems.map((item: any, i: number) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                index={i}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 border-t border-[#1E1E21]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl overflow-hidden border-glow"
          >
            <div className="absolute inset-0 gradient-mesh" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold tracking-tight mb-3">
                {t('cta.title')}
              </h2>
              <p className="text-[#71717A] mb-8">{t('cta.subtitle')}</p>
              <Link href={`/${locale}/register`}>
                <Button
                  size="lg"
                  className="h-12 px-10 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-semibold text-base shine-effect"
                >
                  {t('cta.button')}
                </Button>
              </Link>
              <p className="text-xs text-[#52525B] mt-4">{t('cta.subtext')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1E1E21] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Logo size="sm" />
            <div className="flex items-center gap-6">
              {['Gizlilik', 'Koşullar', 'İletişim'].map((link) => (
                <button key={link} className="text-sm text-[#52525B] hover:text-[#A1A1AA] transition-colors">
                  {link}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#52525B]">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
