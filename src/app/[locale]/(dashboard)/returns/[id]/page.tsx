'use client';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  ArrowLeft, Check, X, Tag, FileText, Package,
  Mail, Clock, User, ShoppingBag,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReturnStatusBadge } from '@/components/shared/return-status-badge';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';

const mockReturn = {
  id: '1',
  number: 'RET-2026-047',
  status: 'pending' as const,
  createdAt: '27 Nisan 2026, 14:32',
  deadline: '11 Mayıs 2026',
  customer: {
    name: 'Ayşe Kaya',
    email: 'ayse@mail.com',
    phone: '+90 532 123 45 67',
    totalOrders: 12,
    totalReturns: 3,
  },
  order: {
    number: '#1234',
    date: '20 Nisan 2026',
    total: '₺2.450',
  },
  items: [
    { name: 'Mavi Slim Fit Kazak', sku: 'KAZ-001-XL', quantity: 1, price: '₺450' },
  ],
  reason: 'Hatalı Ürün',
  reasonDetail: 'Ürün dikişleri açık geldi, kullanılamaz durumda.',
  resolution: 'Geri Ödeme',
  photos: [],
  amount: '₺450',
};

const timeline = [
  {
    event: 'İade talebi oluşturuldu',
    actor: 'Ayşe Kaya (Müşteri)',
    time: '27 Nis 2026, 14:32',
    icon: FileText,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    event: 'Otomatik inceleme başlatıldı',
    actor: 'iadex Sistem',
    time: '27 Nis 2026, 14:32',
    icon: Clock,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    event: 'Müşteriye onay bekleniyor e-postası gönderildi',
    actor: 'iadex Sistem',
    time: '27 Nis 2026, 14:33',
    icon: Mail,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
];

export default function ReturnDetailPage() {
  const locale = useLocale();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back + Header */}
      <div>
        <Link
          href={`/${locale}/returns`}
          className="flex items-center gap-1.5 text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors mb-4 w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          İadelere Dön
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <h1 className="text-xl font-bold text-[#FAFAFA] tracking-tight font-mono">
                {mockReturn.number}
              </h1>
              <ReturnStatusBadge status={mockReturn.status} locale={locale} animate showDot />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-[#71717A] mt-0.5"
            >
              {mockReturn.createdAt}
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
              className="h-8 gap-1.5 border-red-500/30 bg-transparent text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <X className="h-3.5 w-3.5" />
              Reddet
            </Button>
            <Button
              size="sm"
              className="h-8 gap-1.5 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium"
            >
              <Check className="h-3.5 w-3.5" />
              Onayla
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left — Main Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 space-y-4"
        >
          {/* Items */}
          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h2 className="text-sm font-semibold text-[#FAFAFA] mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-[#71717A]" />
              İade Edilen Ürünler
            </h2>
            {mockReturn.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#1E1E21] last:border-0">
                <div>
                  <p className="text-sm text-[#FAFAFA] font-medium">{item.name}</p>
                  <p className="text-xs text-[#52525B] font-mono">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#FAFAFA]">{item.price}</p>
                  <p className="text-xs text-[#71717A]">×{item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 mt-1">
              <span className="text-sm text-[#71717A]">Toplam İade Tutarı</span>
              <span className="text-base font-bold text-[#FAFAFA]">{mockReturn.amount}</span>
            </div>
          </Card>

          {/* Reason */}
          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h2 className="text-sm font-semibold text-[#FAFAFA] mb-3">İade Sebebi</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#52525B] w-20">Sebep</span>
                <span className="text-sm text-[#FAFAFA] font-medium">{mockReturn.reason}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs text-[#52525B] w-20 mt-0.5">Açıklama</span>
                <p className="text-sm text-[#A1A1AA] leading-relaxed flex-1">{mockReturn.reasonDetail}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#52525B] w-20">Çözüm</span>
                <span className="text-sm text-[#FAFAFA]">{mockReturn.resolution}</span>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h2 className="text-sm font-semibold text-[#FAFAFA] mb-4">Zaman Çizelgesi</h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="relative space-y-4"
            >
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-[#1E1E21]" />
              {timeline.map((event, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="flex items-start gap-3 relative"
                >
                  <div className={`w-8 h-8 rounded-full ${event.bg} flex items-center justify-center shrink-0 z-10 border border-[#27272A]`}>
                    <event.icon className={`h-3.5 w-3.5 ${event.color}`} />
                  </div>
                  <div className="pt-1 flex-1 min-w-0">
                    <p className="text-sm text-[#FAFAFA]">{event.event}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-[#52525B]">{event.actor}</span>
                      <span className="text-xs text-[#3F3F46]">•</span>
                      <span className="text-xs text-[#52525B]">{event.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Card>
        </motion.div>

        {/* Right — Properties */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-4"
        >
          {/* Customer */}
          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h2 className="text-xs font-semibold text-[#71717A] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <User className="h-3 w-3" />
              Müşteri
            </h2>
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#FAFAFA]">{mockReturn.customer.name}</p>
              <p className="text-xs text-[#71717A]">{mockReturn.customer.email}</p>
              <p className="text-xs text-[#71717A]">{mockReturn.customer.phone}</p>
              <div className="flex gap-3 pt-1 text-xs text-[#52525B]">
                <span>{mockReturn.customer.totalOrders} sipariş</span>
                <span>•</span>
                <span>{mockReturn.customer.totalReturns} iade</span>
              </div>
            </div>
          </Card>

          {/* Order */}
          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h2 className="text-xs font-semibold text-[#71717A] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <ShoppingBag className="h-3 w-3" />
              Sipariş
            </h2>
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#FAFAFA] font-mono">{mockReturn.order.number}</p>
              <p className="text-xs text-[#71717A]">{mockReturn.order.date}</p>
              <p className="text-xs text-[#A1A1AA] font-medium">{mockReturn.order.total}</p>
            </div>
          </Card>

          {/* SLA */}
          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h2 className="text-xs font-semibold text-[#71717A] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              SLA
            </h2>
            <div className="space-y-2">
              <p className="text-xs text-[#71717A]">Son İşlem Tarihi</p>
              <p className="text-sm font-medium text-[#FAFAFA]">{mockReturn.deadline}</p>
              <div className="h-1.5 bg-[#27272A] rounded-full overflow-hidden mt-2">
                <div className="h-full w-[15%] bg-green-400 rounded-full" />
              </div>
              <p className="text-xs text-[#52525B]">14 gün kaldı</p>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h2 className="text-xs font-semibold text-[#71717A] uppercase tracking-wide mb-3">Hızlı İşlemler</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 gap-2 border-[#27272A] bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] justify-start"
              >
                <Tag className="h-3.5 w-3.5" />
                Etiket Oluştur
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 gap-2 border-[#27272A] bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] justify-start"
              >
                <Mail className="h-3.5 w-3.5" />
                E-posta Gönder
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
