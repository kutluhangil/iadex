'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  RotateCcw,
  TrendingDown,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReturnStatusBadge } from '@/components/shared/return-status-badge';
import { staggerContainer, staggerItem, cardHover } from '@/lib/utils/animations';

const stats = [
  {
    key: 'totalReturns',
    value: 47,
    unit: '',
    change: +12,
    icon: RotateCcw,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    key: 'returnRate',
    value: 4.2,
    unit: '%',
    change: -0.3,
    icon: TrendingDown,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    key: 'avgResolution',
    value: 3.2,
    unit: ' gün',
    change: -0.5,
    icon: Clock,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    key: 'totalRefunds',
    value: '₺12.450',
    unit: '',
    change: +8,
    icon: DollarSign,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
];

const recentReturns = [
  {
    id: '1',
    number: 'RET-2026-047',
    customer: 'Ayşe Kaya',
    order: '#1234',
    reason: 'defective',
    status: 'pending' as const,
    amount: '₺450',
    date: '27 Nis',
  },
  {
    id: '2',
    number: 'RET-2026-046',
    customer: 'Mehmet Demir',
    order: '#1231',
    reason: 'wrong_item',
    status: 'approved' as const,
    amount: '₺1.200',
    date: '26 Nis',
  },
  {
    id: '3',
    number: 'RET-2026-045',
    customer: 'Zeynep Çelik',
    order: '#1228',
    reason: 'changed_mind',
    status: 'shipped' as const,
    amount: '₺890',
    date: '25 Nis',
  },
  {
    id: '4',
    number: 'RET-2026-044',
    customer: 'Ali Öztürk',
    order: '#1225',
    reason: 'too_small',
    status: 'refunded' as const,
    amount: '₺340',
    date: '24 Nis',
  },
  {
    id: '5',
    number: 'RET-2026-043',
    customer: 'Fatma Arslan',
    order: '#1220',
    reason: 'damaged',
    status: 'rejected' as const,
    amount: '₺670',
    date: '23 Nis',
  },
];

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-bold text-[#FAFAFA] tracking-tight"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm text-[#71717A] mt-0.5"
          >
            Bugün, 27 Nisan 2026
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-[#27272A] bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {t('syncOrders')}
          </Button>
          <Link href={`/${locale}/returns/new`}>
            <Button
              size="sm"
              className="h-8 gap-1.5 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium"
            >
              <Plus className="h-3.5 w-3.5" />
              {t('createReturn')}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={stat.key} variants={staggerItem}>
            <motion.div
              whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-5 bg-[#111113] border-[#27272A] hover:border-[#3F3F46] transition-colors cursor-default">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change >= 0
                      ? <ArrowUpRight className="h-3 w-3" />
                      : <ArrowDownRight className="h-3 w-3" />
                    }
                    {Math.abs(stat.change)}{typeof stat.change === 'number' && stat.change % 1 !== 0 ? '' : '%'}
                  </div>
                </div>
                <div className="space-y-1">
                  <motion.p
                    className="text-2xl font-bold text-[#FAFAFA] tabular-nums"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  >
                    {stat.value}{stat.unit}
                  </motion.p>
                  <p className="text-xs text-[#71717A]">{t(`stats.${stat.key}`)}</p>
                  <p className="text-xs text-[#52525B]">{t('stats.vsLastMonth')}</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Returns */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#FAFAFA]">{t('recentReturns')}</h2>
          <Link
            href={`/${locale}/returns`}
            className="text-xs text-[#71717A] hover:text-[#FAFAFA] transition-colors flex items-center gap-1"
          >
            {t('viewAll')}
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <Card className="bg-[#111113] border-[#27272A] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr_1fr_1fr] gap-4 px-4 py-2.5 border-b border-[#1E1E21] bg-[#111113]">
            {['İade No', 'Müşteri', 'Sipariş', 'Sebep', 'Tutar', 'Durum'].map((header) => (
              <span key={header} className="text-xs font-medium text-[#71717A] uppercase tracking-wide">
                {header}
              </span>
            ))}
          </div>

          {/* Rows */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {recentReturns.map((ret, i) => (
              <motion.div
                key={ret.id}
                variants={staggerItem}
                className={`grid grid-cols-[2fr_1.5fr_1fr_1.5fr_1fr_1fr] gap-4 px-4 py-3 items-center hover:bg-[#18181B]/50 transition-colors cursor-pointer group ${
                  i < recentReturns.length - 1 ? 'border-b border-[#1E1E21]' : ''
                }`}
              >
                <span className="text-xs font-mono text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors">
                  {ret.number}
                </span>
                <span className="text-sm text-[#FAFAFA] font-medium truncate">{ret.customer}</span>
                <span className="text-xs text-[#71717A]">{ret.order}</span>
                <span className="text-xs text-[#A1A1AA] capitalize">
                  {ret.reason.replace('_', ' ')}
                </span>
                <span className="text-sm text-[#FAFAFA] font-medium tabular-nums">{ret.amount}</span>
                <ReturnStatusBadge status={ret.status} locale={locale} />
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
