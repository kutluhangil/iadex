'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tag, Download, ExternalLink, Truck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';
import { cn } from '@/lib/utils';

const mockLabels = [
  {
    id: '1', returnNumber: 'RET-2026-047', customer: 'Ayşe Kaya',
    carrier: 'Yurtiçi Kargo', tracking: 'YK123456789TR', cost: '₺28',
    status: 'in_transit', created: '27 Nis', expires: '10 May',
  },
  {
    id: '2', returnNumber: 'RET-2026-046', customer: 'Mehmet Demir',
    carrier: 'Aras Kargo', tracking: 'AK987654321', cost: '₺35',
    status: 'created', created: '26 Nis', expires: '9 May',
  },
  {
    id: '3', returnNumber: 'RET-2026-045', customer: 'Zeynep Çelik',
    carrier: 'MNG Kargo', tracking: 'MNG456789', cost: '₺31',
    status: 'delivered', created: '25 Nis', expires: '8 May',
  },
  {
    id: '4', returnNumber: 'RET-2026-044', customer: 'Ali Öztürk',
    carrier: 'Yurtiçi Kargo', tracking: 'YK111222333TR', cost: '₺28',
    status: 'expired', created: '15 Nis', expires: '29 Nis',
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  created: { label: 'Oluşturuldu', className: 'bg-blue-400/10 text-blue-400 border border-blue-400/20' },
  in_transit: { label: 'Kargoda', className: 'bg-purple-400/10 text-purple-400 border border-purple-400/20' },
  delivered: { label: 'Teslim Edildi', className: 'bg-green-400/10 text-green-400 border border-green-400/20' },
  expired: { label: 'Süresi Doldu', className: 'bg-[#27272A] text-[#52525B] border border-[#3F3F46]' },
};

export default function LabelsPage() {
  return (
    <div className="space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-[#FAFAFA] tracking-tight"
        >
          Kargo Etiketleri
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-[#71717A] mt-0.5"
        >
          Oluşturulan kargo etiketleri ve takip numaraları
        </motion.p>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4"
      >
        {[
          { label: 'Toplam Etiket', value: '8', icon: Tag },
          { label: 'Kargoda', value: '3', icon: Truck },
          { label: 'Ort. Maliyet', value: '₺30.5', icon: null },
          { label: 'Bu Ay', value: '₺244', icon: null },
        ].map((stat, i) => (
          <Card key={i} className="p-4 bg-[#111113] border-[#27272A]">
            <p className="text-xs text-[#71717A] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#FAFAFA]">{stat.value}</p>
          </Card>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-[#111113] border-[#27272A] overflow-hidden">
          <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-[#1E1E21]">
            {['İade No', 'Müşteri', 'Kargo', 'Takip No', 'Durum', ''].map((h, i) => (
              <span key={i} className="text-xs font-medium text-[#71717A] uppercase tracking-wide">{h}</span>
            ))}
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            {mockLabels.map((label, i) => {
              const st = statusConfig[label.status];
              return (
                <motion.div
                  key={label.id}
                  variants={staggerItem}
                  className={cn(
                    'grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3.5 items-center',
                    'hover:bg-[#18181B]/60 transition-colors group',
                    i < mockLabels.length - 1 && 'border-b border-[#1E1E21]'
                  )}
                >
                  <span className="text-xs font-mono text-[#A1A1AA]">{label.returnNumber}</span>
                  <span className="text-sm text-[#FAFAFA] truncate">{label.customer}</span>
                  <div>
                    <p className="text-xs text-[#A1A1AA]">{label.carrier}</p>
                    <p className="text-xs text-[#52525B]">{label.cost}</p>
                  </div>
                  <span className="text-xs font-mono text-[#71717A]">{label.tracking}</span>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full w-fit', st.className)}>{st.label}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-[#52525B] hover:text-[#FAFAFA] hover:bg-[#27272A]">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-[#52525B] hover:text-[#FAFAFA] hover:bg-[#27272A]">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
