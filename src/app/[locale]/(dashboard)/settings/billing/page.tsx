'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, Zap, ArrowUpRight, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    price: 1499,
    features: ['100 iade/ay', '1 mağaza', '3 otomasyon', 'Yurtiçi Kargo', 'Email desteği'],
    current: false,
  },
  {
    name: 'Growth',
    price: 4499,
    features: ['500 iade/ay', '3 mağaza', 'Sınırsız otomasyon', 'Tüm kargo', 'Öncelikli destek'],
    current: true,
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 11999,
    features: ['Sınırsız iade', '10 mağaza', 'Sınırsız her şey', 'Dedicated destek', 'API erişimi'],
    current: false,
  },
];

const usage = {
  returns: { used: 12, limit: 20, label: 'İade' },
  labels: { used: 8, limit: 20, label: 'Etiket' },
  emails: { used: 24, limit: 100, label: 'E-posta' },
};

export default function BillingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-[#FAFAFA] tracking-tight"
        >
          Fatura & Plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-[#71717A] mt-0.5"
        >
          Aboneliğinizi ve kullanımınızı yönetin
        </motion.p>
      </div>

      {/* Current Plan Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="p-5 bg-[#111113] border-[#E4E4E7]/15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E4E4E7]/10 flex items-center justify-center">
                <Zap className="h-4 w-4 text-[#E4E4E7]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#FAFAFA]">Growth Trial — 12 gün kaldı</p>
                <p className="text-xs text-[#71717A]">Deneme süresi dolduğunda Starter planına geçer</p>
              </div>
            </div>
            <Button
              size="sm"
              className="h-8 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium gap-1.5"
            >
              <CreditCard className="h-3.5 w-3.5" />
              Plan Seç
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Usage */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-sm font-semibold text-[#FAFAFA] mb-3">Bu Ay Kullanım</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(usage).map(([key, u]) => {
            const pct = Math.round((u.used / u.limit) * 100);
            const color = pct < 60 ? 'bg-green-400' : pct < 85 ? 'bg-yellow-400' : 'bg-red-400';
            return (
              <Card key={key} className="p-4 bg-[#111113] border-[#27272A]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#71717A]">{u.label}</span>
                  <span className="text-xs text-[#52525B]">%{pct}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-[#FAFAFA]">{u.used}</span>
                  <span className="text-xs text-[#52525B]">/ {u.limit}</span>
                </div>
                <div className="h-1.5 bg-[#27272A] rounded-full overflow-hidden">
                  <motion.div
                    className={cn('h-full rounded-full', color)}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, delay: 0.4 + Math.random() * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Plans */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#FAFAFA]">Planlar</h2>
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-[#111113] border border-[#27272A]">
            {(['monthly', 'yearly'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-all',
                  billing === b ? 'bg-[#27272A] text-[#FAFAFA]' : 'text-[#71717A] hover:text-[#A1A1AA]'
                )}
              >
                {b === 'monthly' ? 'Aylık' : 'Yıllık (-20%)'}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-3 gap-4"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={staggerItem}>
              <Card className={cn(
                'p-5 relative',
                plan.current
                  ? 'bg-[#111113] border-[#E4E4E7]/20'
                  : 'bg-[#0E0E10] border-[#27272A] hover:border-[#3F3F46] transition-colors'
              )}>
                {plan.current && (
                  <div className="absolute -top-2.5 left-4">
                    <span className="bg-[#E4E4E7] text-[#09090B] text-xs font-bold px-2.5 py-0.5 rounded-full">
                      Mevcut Plan
                    </span>
                  </div>
                )}
                <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-[#FAFAFA]">
                    ₺{(billing === 'yearly' ? Math.round(plan.price * 0.8) : plan.price).toLocaleString('tr-TR')}
                  </span>
                  <span className="text-xs text-[#71717A]">/ay</span>
                </div>
                <ul className="space-y-1.5 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-400 shrink-0" />
                      <span className="text-xs text-[#A1A1AA]">{f}</span>
                    </li>
                  ))}
                </ul>
                {plan.current ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 border-[#27272A] bg-transparent text-[#52525B] cursor-default"
                    disabled
                  >
                    Mevcut Plan
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className={cn(
                      'w-full h-8 gap-1',
                      plan.name === 'Enterprise'
                        ? 'bg-[#18181B] border border-[#27272A] text-[#FAFAFA] hover:bg-[#27272A]'
                        : 'bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8]'
                    )}
                  >
                    {plan.name === 'Enterprise' ? 'İletişime Geç' : 'Yükselt'}
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
