'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Search, Check,
  ShoppingBag, Package, MessageSquare, ClipboardCheck,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const mockOrders = [
  {
    id: '1', number: '#1240', customer: 'Ayşe Kaya', email: 'ayse@mail.com',
    date: '27 Nis 2026', total: '₺2.450',
    items: [
      { id: 'i1', name: 'Mavi Slim Fit Kazak', sku: 'KAZ-001-XL', price: '₺450', qty: 1 },
      { id: 'i2', name: 'Beyaz Basic Tişört', sku: 'TIS-002-M', price: '₺250', qty: 2 },
      { id: 'i3', name: 'Siyah Denim Pantolon', sku: 'PAN-003-32', price: '₺750', qty: 1 },
    ],
  },
  {
    id: '2', number: '#1238', customer: 'Mehmet Demir', email: 'mehmet@mail.com',
    date: '26 Nis 2026', total: '₺890',
    items: [
      { id: 'i4', name: 'Spor Ayakkabı', sku: 'AYK-001-42', price: '₺890', qty: 1 },
    ],
  },
  {
    id: '3', number: '#1235', customer: 'Zeynep Çelik', email: 'zeynep@mail.com',
    date: '25 Nis 2026', total: '₺1.670',
    items: [
      { id: 'i5', name: 'Çiçekli Elbise', sku: 'ELB-001-S', price: '₺920', qty: 1 },
      { id: 'i6', name: 'Keten Gömlek', sku: 'GOM-002-M', price: '₺750', qty: 1 },
    ],
  },
];

const reasons = [
  { id: 'defective', label: 'Hatalı Ürün', desc: 'Ürün hasarlı veya kusurlu' },
  { id: 'wrong_size', label: 'Yanlış Beden', desc: 'Sipariş edilen beden gelmedi' },
  { id: 'wrong_item', label: 'Yanlış Ürün', desc: 'Farklı bir ürün gönderildi' },
  { id: 'not_as_described', label: 'Açıklamaya Uygun Değil', desc: 'Ürün açıklamayla örtüşmüyor' },
  { id: 'changed_mind', label: 'Fikir Değişikliği', desc: 'Müşteri ürünü istemedi' },
  { id: 'other', label: 'Diğer', desc: 'Başka bir sebep' },
];

const resolutions = [
  { id: 'refund', label: 'Geri Ödeme', desc: 'Tam iade yapılır' },
  { id: 'exchange', label: 'Değişim', desc: 'Farklı ürünle değişim' },
  { id: 'store_credit', label: 'Mağaza Kredisi', desc: 'Mağaza bakiyesi olarak eklenir' },
];

const steps = [
  { id: 1, label: 'Sipariş', icon: ShoppingBag },
  { id: 2, label: 'Ürünler', icon: Package },
  { id: 3, label: 'Sebep', icon: MessageSquare },
  { id: 4, label: 'Onay', icon: ClipboardCheck },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function NewReturnPage() {
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedResolution, setSelectedResolution] = useState('');
  const [note, setNote] = useState('');

  const filtered = mockOrders.filter((o) =>
    !search ||
    o.number.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedItemData = selectedOrder?.items.filter((i) => selectedItems.includes(i.id)) ?? [];
  const total = selectedItemData.reduce((acc, i) => {
    const num = parseFloat(i.price.replace('₺', '').replace('.', '').replace(',', '.'));
    return acc + num * i.qty;
  }, 0);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Back */}
      <div>
        <Link
          href={`/${locale}/returns`}
          className="flex items-center gap-1.5 text-sm text-[#71717A] hover:text-[#FAFAFA] transition-colors mb-4 w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          İadelere Dön
        </Link>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-[#FAFAFA] tracking-tight"
        >
          Yeni İade Oluştur
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-[#71717A] mt-0.5"
        >
          Müşteri adına iade talebi oluşturun
        </motion.p>
      </div>

      {/* Step indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-0"
      >
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => step > s.id && goTo(s.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                step === s.id
                  ? 'bg-[#E4E4E7] text-[#09090B]'
                  : step > s.id
                  ? 'text-[#71717A] hover:text-[#FAFAFA] cursor-pointer'
                  : 'text-[#3F3F46] cursor-default'
              )}
            >
              <div className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
                step === s.id ? 'bg-[#09090B] text-[#E4E4E7]' :
                step > s.id ? 'bg-green-400/20 text-green-400' : 'bg-[#27272A] text-[#52525B]'
              )}>
                {step > s.id ? <Check className="h-3 w-3" /> : s.id}
              </div>
              {s.label}
            </button>
            {i < steps.length - 1 && (
              <div className={cn('w-8 h-px mx-1', step > s.id ? 'bg-green-400/30' : 'bg-[#27272A]')} />
            )}
          </div>
        ))}
      </motion.div>

      {/* Step content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Step 1 — Order */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#52525B]" />
                  <Input
                    placeholder="Sipariş no veya müşteri ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9 bg-[#141416] border-[#27272A] text-[#FAFAFA] placeholder:text-[#52525B] text-sm"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  {filtered.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => { setSelectedOrder(order); setSelectedItems([]); }}
                      className={cn(
                        'w-full text-left p-4 rounded-xl border transition-all',
                        selectedOrder?.id === order.id
                          ? 'border-[#E4E4E7]/40 bg-[#E4E4E7]/5'
                          : 'border-[#27272A] bg-[#111113] hover:border-[#3F3F46] hover:bg-[#141416]'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center',
                            selectedOrder?.id === order.id ? 'bg-[#E4E4E7]/15' : 'bg-[#1E1E21]'
                          )}>
                            <ShoppingBag className={cn('h-4 w-4', selectedOrder?.id === order.id ? 'text-[#E4E4E7]' : 'text-[#52525B]')} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#FAFAFA] font-mono">{order.number}</p>
                            <p className="text-xs text-[#71717A]">{order.customer} · {order.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#FAFAFA]">{order.total}</p>
                          <p className="text-xs text-[#52525B]">{order.date}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — Items */}
            {step === 2 && selectedOrder && (
              <div className="space-y-3">
                <p className="text-xs text-[#71717A]">
                  {selectedOrder.number} — {selectedOrder.customer} siparişinden iade edilecek ürünleri seçin
                </p>
                {selectedOrder.items.map((item) => {
                  const checked = selectedItems.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={cn(
                        'w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3',
                        checked
                          ? 'border-[#E4E4E7]/40 bg-[#E4E4E7]/5'
                          : 'border-[#27272A] bg-[#111113] hover:border-[#3F3F46]'
                      )}
                    >
                      <div className={cn(
                        'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all',
                        checked ? 'bg-[#E4E4E7] border-[#E4E4E7]' : 'border-[#3F3F46] bg-transparent'
                      )}>
                        {checked && <Check className="h-3 w-3 text-[#09090B]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#FAFAFA]">{item.name}</p>
                        <p className="text-xs text-[#52525B] font-mono">{item.sku}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium text-[#FAFAFA]">{item.price}</p>
                        <p className="text-xs text-[#71717A]">×{item.qty}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 3 — Reason */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#71717A] mb-3">İade sebebini seçin</p>
                  <div className="grid grid-cols-2 gap-2">
                    {reasons.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedReason(r.id)}
                        className={cn(
                          'text-left p-3.5 rounded-xl border transition-all',
                          selectedReason === r.id
                            ? 'border-[#E4E4E7]/40 bg-[#E4E4E7]/5'
                            : 'border-[#27272A] bg-[#111113] hover:border-[#3F3F46]'
                        )}
                      >
                        <p className="text-sm font-medium text-[#FAFAFA]">{r.label}</p>
                        <p className="text-xs text-[#52525B] mt-0.5">{r.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-[#71717A] mb-3">Çözüm yöntemi</p>
                  <div className="grid grid-cols-3 gap-2">
                    {resolutions.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedResolution(r.id)}
                        className={cn(
                          'text-left p-3.5 rounded-xl border transition-all',
                          selectedResolution === r.id
                            ? 'border-[#E4E4E7]/40 bg-[#E4E4E7]/5'
                            : 'border-[#27272A] bg-[#111113] hover:border-[#3F3F46]'
                        )}
                      >
                        <p className="text-sm font-medium text-[#FAFAFA]">{r.label}</p>
                        <p className="text-xs text-[#52525B] mt-0.5">{r.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-[#71717A] mb-2">Notlar (isteğe bağlı)</p>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ek açıklama..."
                    rows={3}
                    className="w-full bg-[#141416] border border-[#27272A] rounded-xl px-3 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#52525B] resize-none focus:outline-none focus:ring-1 focus:ring-[#3F3F46] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 4 — Confirm */}
            {step === 4 && selectedOrder && (
              <div className="space-y-4">
                <Card className="p-5 bg-[#111113] border-[#27272A] space-y-4">
                  <div>
                    <p className="text-xs text-[#52525B] uppercase tracking-wide mb-2">Sipariş</p>
                    <p className="text-sm font-medium text-[#FAFAFA] font-mono">{selectedOrder.number}</p>
                    <p className="text-xs text-[#71717A]">{selectedOrder.customer}</p>
                  </div>
                  <div className="h-px bg-[#1E1E21]" />
                  <div>
                    <p className="text-xs text-[#52525B] uppercase tracking-wide mb-2">İade Ürünleri</p>
                    <div className="space-y-2">
                      {selectedItemData.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[#FAFAFA]">{item.name}</p>
                            <p className="text-xs text-[#52525B] font-mono">{item.sku}</p>
                          </div>
                          <span className="text-sm text-[#FAFAFA] font-medium">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-[#1E1E21]" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#52525B] uppercase tracking-wide mb-1">Sebep</p>
                      <p className="text-sm text-[#FAFAFA]">
                        {reasons.find((r) => r.id === selectedReason)?.label || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#52525B] uppercase tracking-wide mb-1">Çözüm</p>
                      <p className="text-sm text-[#FAFAFA]">
                        {resolutions.find((r) => r.id === selectedResolution)?.label || '—'}
                      </p>
                    </div>
                  </div>
                  {note && (
                    <>
                      <div className="h-px bg-[#1E1E21]" />
                      <div>
                        <p className="text-xs text-[#52525B] uppercase tracking-wide mb-1">Not</p>
                        <p className="text-sm text-[#A1A1AA]">{note}</p>
                      </div>
                    </>
                  )}
                  <div className="h-px bg-[#1E1E21]" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#71717A]">Toplam İade Tutarı</span>
                    <span className="text-base font-bold text-[#FAFAFA]">
                      ₺{total.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </Card>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-400/5 border border-blue-400/15">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <p className="text-xs text-[#71717A] leading-relaxed">
                    İade oluşturulduğunda müşteriye otomatik e-posta gönderilir ve kargo etiketi oluşturulur.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goTo(step - 1)}
          disabled={step === 1}
          className="h-8 gap-1.5 border-[#27272A] bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] disabled:opacity-30"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Geri
        </Button>

        {step < 4 ? (
          <Button
            size="sm"
            onClick={() => goTo(step + 1)}
            disabled={
              (step === 1 && !selectedOrder) ||
              (step === 2 && selectedItems.length === 0) ||
              (step === 3 && (!selectedReason || !selectedResolution))
            }
            className="h-8 gap-1.5 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium disabled:opacity-30"
          >
            İleri
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            size="sm"
            className="h-8 gap-1.5 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium"
            asChild
          >
            <Link href={`/${locale}/returns`}>
              <Check className="h-3.5 w-3.5" />
              İadeyi Oluştur
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
