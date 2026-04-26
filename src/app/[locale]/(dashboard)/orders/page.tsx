'use client';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { RefreshCw, Search, ExternalLink, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';
import { cn } from '@/lib/utils';

const mockOrders = [
  {
    id: '1', number: '#1240', customer: 'Ayşe Kaya', email: 'ayse@mail.com',
    items: 3, total: '₺2.450', financial: 'paid', fulfillment: 'fulfilled',
    date: '27 Nis 2026', hasReturn: false,
  },
  {
    id: '2', number: '#1238', customer: 'Mehmet Demir', email: 'mehmet@mail.com',
    items: 1, total: '₺890', financial: 'partially_refunded', fulfillment: 'fulfilled',
    date: '26 Nis 2026', hasReturn: true,
  },
  {
    id: '3', number: '#1235', customer: 'Zeynep Çelik', email: 'zeynep@mail.com',
    items: 2, total: '₺1.670', financial: 'paid', fulfillment: 'partial',
    date: '25 Nis 2026', hasReturn: false,
  },
  {
    id: '4', number: '#1234', customer: 'Ali Öztürk', email: 'ali@mail.com',
    items: 1, total: '₺450', financial: 'refunded', fulfillment: 'fulfilled',
    date: '24 Nis 2026', hasReturn: true,
  },
  {
    id: '5', number: '#1231', customer: 'Fatma Arslan', email: 'fatma@mail.com',
    items: 4, total: '₺3.200', financial: 'paid', fulfillment: 'fulfilled',
    date: '23 Nis 2026', hasReturn: false,
  },
];

const financialStatusConfig: Record<string, { label: string; className: string }> = {
  paid: { label: 'Ödendi', className: 'bg-green-400/10 text-green-400 border border-green-400/20' },
  refunded: { label: 'İade Edildi', className: 'bg-red-400/10 text-red-400 border border-red-400/20' },
  partially_refunded: { label: 'Kısmi İade', className: 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' },
};

export default function OrdersPage() {
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [syncing, setSyncing] = useState(false);

  const filtered = mockOrders.filter((o) =>
    !search ||
    o.number.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-[#FAFAFA] tracking-tight"
          >
            Siparişler
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-[#71717A] mt-0.5"
          >
            Shopify siparişlerinizi yönetin
          </motion.p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 border-[#27272A] bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]"
          onClick={handleSync}
          disabled={syncing}
        >
          <RefreshCw className={cn('h-3.5 w-3.5', syncing && 'animate-spin')} />
          {syncing ? 'Sync ediliyor...' : 'Sync Et'}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3"
      >
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#52525B]" />
          <Input
            placeholder="Sipariş no, müşteri ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] text-sm"
          />
        </div>
        <div className="flex items-center gap-1 text-xs text-[#52525B]">
          Son sync: 2 saat önce
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-[#111113] border-[#27272A] overflow-hidden">
          <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-[#1E1E21]">
            {['Sipariş No', 'Müşteri', 'Ürünler', 'Tutar', 'Durum', ''].map((h, i) => (
              <span key={i} className="text-xs font-medium text-[#71717A] uppercase tracking-wide">{h}</span>
            ))}
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {filtered.map((order, i) => {
              const fin = financialStatusConfig[order.financial];
              return (
                <motion.div
                  key={order.id}
                  variants={staggerItem}
                  className={cn(
                    'grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3.5 items-center',
                    'hover:bg-[#18181B]/60 transition-colors cursor-pointer group',
                    i < filtered.length - 1 && 'border-b border-[#1E1E21]'
                  )}
                >
                  <span className="text-sm font-medium text-[#FAFAFA] font-mono">{order.number}</span>
                  <div>
                    <p className="text-sm text-[#FAFAFA] truncate">{order.customer}</p>
                    <p className="text-xs text-[#52525B] truncate">{order.email}</p>
                  </div>
                  <span className="text-sm text-[#A1A1AA]">{order.items} ürün</span>
                  <span className="text-sm text-[#FAFAFA] font-medium">{order.total}</span>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full w-fit', fin.className)}>{fin.label}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-[#52525B] hover:text-[#FAFAFA] hover:bg-[#27272A] opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1F1F23] border-[#27272A] w-44">
                      <DropdownMenuItem className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] cursor-pointer">
                        Detayları Gör
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] cursor-pointer gap-1.5">
                        <Link href={`/${locale}/returns/new`}>
                          İade Oluştur
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] cursor-pointer gap-1.5">
                        <ExternalLink className="h-3 w-3" />
                        Shopify'da Aç
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              );
            })}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
