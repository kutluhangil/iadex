'use client';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Check,
  X,
  Tag,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReturnStatusBadge, type ReturnStatus } from '@/components/shared/return-status-badge';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';
import { cn } from '@/lib/utils';

const mockReturns = [
  {
    id: '1', number: 'RET-2026-047', customer: 'Ayşe Kaya', email: 'ayse@mail.com',
    order: '#1234', reason: 'Hatalı Ürün', status: 'pending' as ReturnStatus,
    amount: '₺450', date: '27 Nis 2026', items: 1,
  },
  {
    id: '2', number: 'RET-2026-046', customer: 'Mehmet Demir', email: 'mehmet@mail.com',
    order: '#1231', reason: 'Yanlış Ürün', status: 'approved' as ReturnStatus,
    amount: '₺1.200', date: '26 Nis 2026', items: 2,
  },
  {
    id: '3', number: 'RET-2026-045', customer: 'Zeynep Çelik', email: 'zeynep@mail.com',
    order: '#1228', reason: 'Fikir Değişikliği', status: 'shipped' as ReturnStatus,
    amount: '₺890', date: '25 Nis 2026', items: 1,
  },
  {
    id: '4', number: 'RET-2026-044', customer: 'Ali Öztürk', email: 'ali@mail.com',
    order: '#1225', reason: 'Küçük Geldi', status: 'refunded' as ReturnStatus,
    amount: '₺340', date: '24 Nis 2026', items: 1,
  },
  {
    id: '5', number: 'RET-2026-043', customer: 'Fatma Arslan', email: 'fatma@mail.com',
    order: '#1220', reason: 'Hasarlı', status: 'rejected' as ReturnStatus,
    amount: '₺670', date: '23 Nis 2026', items: 3,
  },
  {
    id: '6', number: 'RET-2026-042', customer: 'Hasan Yıldız', email: 'hasan@mail.com',
    order: '#1218', reason: 'Tarife Uymuyor', status: 'label_created' as ReturnStatus,
    amount: '₺2.100', date: '22 Nis 2026', items: 2,
  },
  {
    id: '7', number: 'RET-2026-041', customer: 'Selin Kurt', email: 'selin@mail.com',
    order: '#1215', reason: 'Hatalı Ürün', status: 'received' as ReturnStatus,
    amount: '₺780', date: '21 Nis 2026', items: 1,
  },
];

const statusFilters = [
  { key: 'all', label: 'Tümü' },
  { key: 'pending', label: 'Beklemede' },
  { key: 'approved', label: 'Onaylandı' },
  { key: 'shipped', label: 'Kargoda' },
  { key: 'refunded', label: 'Geri Ödendi' },
  { key: 'rejected', label: 'Reddedildi' },
];

export default function ReturnsPage() {
  const t = useTranslations('returns');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = mockReturns.filter((r) => {
    const matchFilter = activeFilter === 'all' || r.status === activeFilter;
    const matchSearch = !search ||
      r.number.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.order.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-[#FAFAFA] tracking-tight"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-[#71717A] mt-0.5"
          >
            {filtered.length} iade • {t('subtitle')}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-[#27272A] bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]"
          >
            <Download className="h-3.5 w-3.5" />
            Dışa Aktar
          </Button>
          <Link href={`/${locale}/returns/new`}>
            <Button
              size="sm"
              className="h-8 gap-1.5 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium"
            >
              <Plus className="h-3.5 w-3.5" />
              {t('new')}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-3 flex-wrap"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#52525B]" />
          <Input
            placeholder="İade no, müşteri, sipariş ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] text-sm"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#111113] border border-[#27272A]">
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap',
                activeFilter === f.key
                  ? 'bg-[#27272A] text-[#FAFAFA]'
                  : 'text-[#71717A] hover:text-[#A1A1AA]'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-[#111113] border-[#27272A] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-[#1E1E21] bg-[#111113]">
            {[
              { label: t('table.returnNumber'), icon: ArrowUpDown },
              { label: t('table.customer') },
              { label: t('table.order') },
              { label: t('table.reason') },
              { label: t('table.amount') },
              { label: t('table.status') },
              { label: '' },
            ].map(({ label, icon: Icon }, i) => (
              <button
                key={i}
                className="flex items-center gap-1 text-xs font-medium text-[#71717A] uppercase tracking-wide hover:text-[#A1A1AA] transition-colors text-left"
              >
                {label}
                {Icon && <Icon className="h-3 w-3 opacity-50" />}
              </button>
            ))}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-[#52525B]">{t('empty.title')}</p>
              <p className="text-xs text-[#3F3F46] mt-1">{t('empty.subtitle')}</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filtered.map((ret, i) => (
                <motion.div
                  key={ret.id}
                  variants={staggerItem}
                  className={cn(
                    'grid grid-cols-[2fr_1.5fr_1fr_1.5fr_1fr_1fr_auto] gap-4 px-5 py-3.5 items-center',
                    'hover:bg-[#18181B]/60 transition-colors cursor-pointer group',
                    i < filtered.length - 1 && 'border-b border-[#1E1E21]'
                  )}
                >
                  <div className="min-w-0">
                    <span className="text-xs font-mono text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors">
                      {ret.number}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-[#FAFAFA] font-medium truncate">{ret.customer}</p>
                    <p className="text-xs text-[#52525B] truncate">{ret.email}</p>
                  </div>

                  <span className="text-xs text-[#71717A]">{ret.order}</span>

                  <span className="text-xs text-[#A1A1AA] truncate">{ret.reason}</span>

                  <span className="text-sm text-[#FAFAFA] font-medium tabular-nums">{ret.amount}</span>

                  <ReturnStatusBadge status={ret.status} locale={locale} />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-[#52525B] hover:text-[#FAFAFA] hover:bg-[#27272A] opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1F1F23] border-[#27272A] w-44">
                      <DropdownMenuItem asChild className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] cursor-pointer">
                        <Link href={`/${locale}/returns/${ret.id}`}>{t('actions.viewDetails')}</Link>
                      </DropdownMenuItem>
                      {ret.status === 'pending' && (
                        <>
                          <DropdownMenuSeparator className="bg-[#27272A]" />
                          <DropdownMenuItem className="text-sm text-green-400 hover:text-green-300 hover:bg-[#27272A] cursor-pointer gap-2">
                            <Check className="h-3.5 w-3.5" />
                            {t('actions.approve')}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-sm text-red-400 hover:text-red-300 hover:bg-[#27272A] cursor-pointer gap-2">
                            <X className="h-3.5 w-3.5" />
                            {t('actions.reject')}
                          </DropdownMenuItem>
                        </>
                      )}
                      {ret.status === 'approved' && (
                        <>
                          <DropdownMenuSeparator className="bg-[#27272A]" />
                          <DropdownMenuItem className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] cursor-pointer gap-2">
                            <Tag className="h-3.5 w-3.5" />
                            {t('actions.createLabel')}
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
