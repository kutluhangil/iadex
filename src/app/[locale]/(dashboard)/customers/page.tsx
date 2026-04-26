'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';
import { cn } from '@/lib/utils';

const mockCustomers = [
  {
    id: '1', name: 'Ayşe Kaya', email: 'ayse@mail.com',
    orders: 12, returns: 3, returnRate: 25, totalSpent: '₺8.450',
    lastReturn: '27 Nis', risk: 'high',
  },
  {
    id: '2', name: 'Mehmet Demir', email: 'mehmet@mail.com',
    orders: 28, returns: 2, returnRate: 7, totalSpent: '₺24.100',
    lastReturn: '26 Nis', risk: 'low',
  },
  {
    id: '3', name: 'Zeynep Çelik', email: 'zeynep@mail.com',
    orders: 6, returns: 1, returnRate: 17, totalSpent: '₺3.670',
    lastReturn: '25 Nis', risk: 'medium',
  },
  {
    id: '4', name: 'Ali Öztürk', email: 'ali@mail.com',
    orders: 45, returns: 1, returnRate: 2, totalSpent: '₺42.300',
    lastReturn: '24 Nis', risk: 'low',
  },
  {
    id: '5', name: 'Fatma Arslan', email: 'fatma@mail.com',
    orders: 3, returns: 3, returnRate: 100, totalSpent: '₺1.200',
    lastReturn: '23 Nis', risk: 'high',
  },
];

const riskConfig: Record<string, { label: string; className: string }> = {
  low: { label: 'Düşük', className: 'bg-green-400/10 text-green-400 border border-green-400/20' },
  medium: { label: 'Orta', className: 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' },
  high: { label: 'Yüksek', className: 'bg-red-400/10 text-red-400 border border-red-400/20' },
};

export default function CustomersPage() {
  const [search, setSearch] = useState('');

  const filtered = mockCustomers.filter((c) =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-[#FAFAFA] tracking-tight"
          >
            Müşteriler
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-[#71717A] mt-0.5"
          >
            İade davranışlarına göre müşteri analizi
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-xs"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#52525B]" />
        <Input
          placeholder="İsim veya e-posta ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-8 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] text-sm"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-[#111113] border-[#27272A] overflow-hidden">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3 border-b border-[#1E1E21]">
            {['Müşteri', 'Sipariş', 'İade', 'İade Oranı', 'Toplam Harcama', 'Risk'].map((h, i) => (
              <span key={i} className="text-xs font-medium text-[#71717A] uppercase tracking-wide">{h}</span>
            ))}
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {filtered.map((customer, i) => {
              const risk = riskConfig[customer.risk];
              return (
                <motion.div
                  key={customer.id}
                  variants={staggerItem}
                  className={cn(
                    'grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3.5 items-center',
                    'hover:bg-[#18181B]/60 transition-colors cursor-pointer',
                    i < filtered.length - 1 && 'border-b border-[#1E1E21]'
                  )}
                >
                  <div>
                    <p className="text-sm text-[#FAFAFA] font-medium truncate">{customer.name}</p>
                    <p className="text-xs text-[#52525B] truncate">{customer.email}</p>
                  </div>
                  <span className="text-sm text-[#A1A1AA]">{customer.orders}</span>
                  <span className="text-sm text-[#A1A1AA]">{customer.returns}</span>
                  <div className="flex items-center gap-1.5">
                    {customer.returnRate > 20
                      ? <TrendingUp className="h-3.5 w-3.5 text-red-400" />
                      : <TrendingDown className="h-3.5 w-3.5 text-green-400" />
                    }
                    <span className={cn(
                      'text-sm font-medium',
                      customer.returnRate > 20 ? 'text-red-400' : 'text-green-400'
                    )}>
                      %{customer.returnRate}
                    </span>
                  </div>
                  <span className="text-sm text-[#FAFAFA] font-medium">{customer.totalSpent}</span>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full w-fit', risk.className)}>
                    {risk.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
