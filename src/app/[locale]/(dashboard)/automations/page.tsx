'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Zap, Play, Pause, MoreHorizontal, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';
import { cn } from '@/lib/utils';

const mockRules = [
  {
    id: '1',
    name: 'Otomatik Onay (Düşük Riskli)',
    description: '₺200 altı, hatalı/hasarlı ürün iadeleri otomatik onaylanır',
    trigger: 'return_created',
    triggerLabel: 'İade Oluşturulduğunda',
    conditions: ['Tutar ≤ ₺200', 'Sebep: Hatalı/Hasarlı'],
    actions: ['Otomatik Onayla', 'E-posta Gönder', 'Etiket Oluştur (Yurtiçi)'],
    isActive: true,
    runCount: 128,
    lastRun: '2 saat önce',
  },
  {
    id: '2',
    name: 'VIP Müşteri Hızlı İade',
    description: '5+ sipariş veren müşteriler için otomatik hızlandırılmış süreç',
    trigger: 'return_created',
    triggerLabel: 'İade Oluşturulduğunda',
    conditions: ['Sipariş Sayısı ≥ 5'],
    actions: ['Otomatik Onayla', 'VIP E-posta Gönder', 'Etiket Oluştur (Aras)', 'Etiket: vip-return'],
    isActive: true,
    runCount: 34,
    lastRun: '1 gün önce',
  },
  {
    id: '3',
    name: 'Yüksek Tutarlı İade Bildirimi',
    description: '₺1000 üzeri iadeleri mağaza sahibine otomatik bildir',
    trigger: 'return_created',
    triggerLabel: 'İade Oluşturulduğunda',
    conditions: ['Tutar ≥ ₺1.000'],
    actions: ['Kişiye Ata (Mağaza Sahibi)', 'Not Ekle', 'E-posta Gönder'],
    isActive: true,
    runCount: 12,
    lastRun: '3 gün önce',
  },
  {
    id: '4',
    name: 'SLA Uyarı',
    description: 'SLA süresi dolmak üzere olan iadeleri hatırlat',
    trigger: 'return_deadline_approaching',
    triggerLabel: 'SLA Yaklaşırken (24h)',
    conditions: ['Durum: Beklemede veya Onaylandı'],
    actions: ['E-posta Gönder (Hatırlatma)', 'Slack Bildirimi'],
    isActive: false,
    runCount: 8,
    lastRun: '5 gün önce',
  },
];

const templates = [
  { icon: '⚡', name: 'Otomatik Onay', description: 'Düşük riskli iadeleri anında onayla' },
  { icon: '👑', name: 'VIP Müşteri', description: 'VIP müşterilere öncelikli süreç' },
  { icon: '🔔', name: 'SLA Uyarı', description: 'Vadesi yaklaşan iadeleri hatırlat' },
  { icon: '📦', name: 'Otomatik Geri Ödeme', description: 'İnceleme sonrası geri öde' },
];

export default function AutomationsPage() {
  const [rules, setRules] = useState(mockRules);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

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
            Otomasyonlar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-[#71717A] mt-0.5"
          >
            Tekrar eden işlemleri otomatikleştirin
          </motion.p>
        </div>
        <Button
          size="sm"
          className="h-8 gap-1.5 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium"
        >
          <Plus className="h-3.5 w-3.5" />
          Yeni Kural
        </Button>
      </div>

      {/* Templates */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-sm font-semibold text-[#FAFAFA] mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-400" />
          Hazır Şablonlar
        </h2>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {templates.map((tmpl, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2, borderColor: '#3F3F46' }}
              transition={{ duration: 0.15 }}
            >
              <Card className="p-4 bg-[#0E0E10] border-[#27272A] cursor-pointer hover:border-[#3F3F46] transition-colors">
                <span className="text-2xl mb-3 block">{tmpl.icon}</span>
                <h3 className="text-sm font-medium text-[#FAFAFA] mb-1">{tmpl.name}</h3>
                <p className="text-xs text-[#71717A]">{tmpl.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-[#52525B] hover:text-[#A1A1AA] transition-colors">
                  Kullan <ChevronRight className="h-3 w-3" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Rules */}
      <div>
        <h2 className="text-sm font-semibold text-[#FAFAFA] mb-3">Aktif Kurallar</h2>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-3"
        >
          {rules.map((rule) => (
            <motion.div key={rule.id} variants={staggerItem}>
              <Card className={cn(
                'p-5 bg-[#111113] border-[#27272A] transition-colors',
                !rule.isActive && 'opacity-60'
              )}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={cn(
                      'mt-0.5 w-2 h-2 rounded-full shrink-0',
                      rule.isActive ? 'bg-green-400 animate-pulse' : 'bg-[#3F3F46]'
                    )} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-[#FAFAFA] truncate">{rule.name}</h3>
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full shrink-0',
                          rule.isActive
                            ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                            : 'bg-[#18181B] text-[#52525B] border border-[#27272A]'
                        )}>
                          {rule.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                      <p className="text-xs text-[#71717A] mb-3">{rule.description}</p>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                        <div>
                          <span className="text-[#52525B] uppercase tracking-wide font-medium text-[10px] block mb-1">Tetikleyici</span>
                          <span className="text-[#A1A1AA] bg-[#18181B] px-2 py-0.5 rounded">{rule.triggerLabel}</span>
                        </div>
                        <div>
                          <span className="text-[#52525B] uppercase tracking-wide font-medium text-[10px] block mb-1">Koşullar</span>
                          <div className="flex flex-wrap gap-1">
                            {rule.conditions.map((c, i) => (
                              <span key={i} className="text-[#A1A1AA] bg-[#18181B] px-2 py-0.5 rounded">{c}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[#52525B] uppercase tracking-wide font-medium text-[10px] block mb-1">Aksiyonlar</span>
                          <div className="flex flex-wrap gap-1">
                            {rule.actions.map((a, i) => (
                              <span key={i} className="text-[#A1A1AA] bg-[#18181B] px-2 py-0.5 rounded">{a}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-xs text-[#52525B]">
                        <span>{rule.runCount} kez çalıştı</span>
                        <span>Son: {rule.lastRun}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleRule(rule.id)}
                      className="h-8 w-8 text-[#52525B] hover:text-[#FAFAFA] hover:bg-[#27272A]"
                    >
                      {rule.isActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#52525B] hover:text-[#FAFAFA] hover:bg-[#27272A]"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1F1F23] border-[#27272A]">
                        <DropdownMenuItem className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] cursor-pointer">
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] cursor-pointer">
                          Kopyala
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm text-red-400 hover:text-red-300 hover:bg-[#27272A] cursor-pointer">
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
