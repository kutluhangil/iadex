'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Search, Package, ArrowRight, Check, ChevronRight,
  Truck, RotateCcw, MapPin, Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const mockOrderLookup: Record<string, {
  number: string; customer: string; date: string; items: {
    id: string; name: string; sku: string; price: string; qty: number; image?: string;
  }[];
}> = {
  '#1240': {
    number: '#1240', customer: 'Ayşe Kaya', date: '27 Nisan 2026',
    items: [
      { id: 'i1', name: 'Mavi Slim Fit Kazak', sku: 'KAZ-001-XL', price: '₺450', qty: 1 },
      { id: 'i2', name: 'Beyaz Basic Tişört', sku: 'TIS-002-M', price: '₺250', qty: 2 },
    ],
  },
  '#1238': {
    number: '#1238', customer: 'Mehmet Demir', date: '26 Nisan 2026',
    items: [
      { id: 'i3', name: 'Spor Ayakkabı', sku: 'AYK-001-42', price: '₺890', qty: 1 },
    ],
  },
};

const reasons = [
  { id: 'defective', label: 'Hatalı / Hasarlı Ürün' },
  { id: 'wrong_size', label: 'Yanlış Beden' },
  { id: 'wrong_item', label: 'Yanlış Ürün Geldi' },
  { id: 'not_as_described', label: 'Açıklamaya Uygun Değil' },
  { id: 'changed_mind', label: 'Fikir Değişikliği' },
];

const resolutions = [
  { id: 'refund', label: 'Para İadesi', icon: RotateCcw, desc: 'Ödeme yönteminize iade' },
  { id: 'exchange', label: 'Değişim', icon: Package, desc: 'Başka ürünle değiştir' },
  { id: 'store_credit', label: 'Mağaza Kredisi', icon: Check, desc: 'Bir sonraki alışverişte kullan' },
];

type Step = 'lookup' | 'items' | 'reason' | 'confirm' | 'success';

const storeInfo = {
  name: 'Moda Store',
  logo: null,
  primaryColor: '#E4E4E7',
};

export default function CustomerPortalPage() {
  const [step, setStep] = useState<Step>('lookup');
  const [orderInput, setOrderInput] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<typeof mockOrderLookup[string] | null>(null);
  const [error, setError] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedResolution, setSelectedResolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = () => {
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const found = mockOrderLookup[orderInput.trim()];
      if (found) {
        setOrder(found);
        setStep('items');
      } else {
        setError('Sipariş bulunamadı. Sipariş numaranızı ve e-posta adresinizi kontrol edin.');
      }
    }, 800);
  };

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col">
      {/* Portal Header */}
      <header className="border-b border-[#1E1E21] bg-[#09090B]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E4E4E7]/10 border border-[#27272A] flex items-center justify-center">
              <Package className="h-3.5 w-3.5 text-[#E4E4E7]" />
            </div>
            <span className="text-sm font-semibold text-[#FAFAFA]">{storeInfo.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#52525B]">
            <span>Powered by</span>
            <span className="text-[#A1A1AA] font-mono font-semibold">iadex</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">

            {/* Step: Lookup */}
            {step === 'lookup' && (
              <motion.div
                key="lookup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#111113] border border-[#27272A] flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="h-6 w-6 text-[#71717A]" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">İade Talebi</h1>
                  <p className="text-sm text-[#71717A]">Siparişinizi bulun ve iade işlemini başlatın</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-[#71717A] mb-1.5 block">Sipariş Numarası</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#52525B]" />
                      <Input
                        placeholder="#1234"
                        value={orderInput}
                        onChange={(e) => setOrderInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                        className="pl-9 h-10 bg-[#111113] border-[#27272A] text-[#FAFAFA] placeholder:text-[#3F3F46] focus:border-[#3F3F46]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#71717A] mb-1.5 block">E-posta Adresi</label>
                    <Input
                      type="email"
                      placeholder="ornek@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                      className="h-10 bg-[#111113] border-[#27272A] text-[#FAFAFA] placeholder:text-[#3F3F46] focus:border-[#3F3F46]"
                    />
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400"
                    >
                      {error}
                    </motion.p>
                  )}
                  <Button
                    onClick={handleLookup}
                    disabled={!orderInput || !email || isLoading}
                    className="w-full h-10 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-semibold gap-2 disabled:opacity-40"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-[#09090B]/30 border-t-[#09090B] rounded-full animate-spin" />
                    ) : (
                      <>Siparişi Bul <ArrowRight className="h-4 w-4" /></>
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#3F3F46]">
                  <div className="flex-1 h-px bg-[#1E1E21]" />
                  <span>veya</span>
                  <div className="flex-1 h-px bg-[#1E1E21]" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Clock, label: 'Hızlı İşlem', sub: '5 dakika' },
                    { icon: Truck, label: 'Ücretsiz Kargo', sub: 'Etiket dahil' },
                    { icon: MapPin, label: 'Takip', sub: 'Anlık durum' },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-[#0E0E10] border border-[#1E1E21] text-center">
                      <item.icon className="h-4 w-4 text-[#52525B] mx-auto mb-1.5" />
                      <p className="text-xs font-medium text-[#A1A1AA]">{item.label}</p>
                      <p className="text-[10px] text-[#3F3F46]">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step: Select Items */}
            {step === 'items' && order && (
              <motion.div
                key="items"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-lg font-bold text-[#FAFAFA]">Ürün Seçin</h2>
                  <p className="text-sm text-[#71717A] mt-0.5">
                    {order.number} siparişinden iade etmek istediğiniz ürünleri seçin
                  </p>
                </div>
                <div className="space-y-2">
                  {order.items.map((item) => {
                    const checked = selectedItems.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={cn(
                          'w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3',
                          checked
                            ? 'border-[#E4E4E7]/30 bg-[#E4E4E7]/5'
                            : 'border-[#27272A] bg-[#111113] hover:border-[#3F3F46]'
                        )}
                      >
                        <div className={cn(
                          'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all',
                          checked ? 'bg-[#E4E4E7] border-[#E4E4E7]' : 'border-[#3F3F46]'
                        )}>
                          {checked && <Check className="h-3 w-3 text-[#09090B]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#FAFAFA]">{item.name}</p>
                          <p className="text-xs text-[#52525B] font-mono">{item.sku}</p>
                        </div>
                        <span className="text-sm font-medium text-[#FAFAFA] shrink-0">{item.price}</span>
                      </button>
                    );
                  })}
                </div>
                <Button
                  onClick={() => setStep('reason')}
                  disabled={selectedItems.length === 0}
                  className="w-full h-10 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-semibold gap-2 disabled:opacity-40"
                >
                  Devam Et <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {/* Step: Reason & Resolution */}
            {step === 'reason' && (
              <motion.div
                key="reason"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-lg font-bold text-[#FAFAFA]">İade Sebebi</h2>
                  <p className="text-sm text-[#71717A] mt-0.5">Neden iade etmek istiyorsunuz?</p>
                </div>
                <div className="space-y-2">
                  {reasons.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedReason(r.id)}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between',
                        selectedReason === r.id
                          ? 'border-[#E4E4E7]/30 bg-[#E4E4E7]/5'
                          : 'border-[#27272A] bg-[#111113] hover:border-[#3F3F46]'
                      )}
                    >
                      <span className="text-sm text-[#FAFAFA]">{r.label}</span>
                      {selectedReason === r.id && (
                        <Check className="h-4 w-4 text-[#E4E4E7] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                <div>
                  <p className="text-sm font-medium text-[#FAFAFA] mb-3">Nasıl çözüm istersiniz?</p>
                  <div className="space-y-2">
                    {resolutions.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedResolution(r.id)}
                        className={cn(
                          'w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-3',
                          selectedResolution === r.id
                            ? 'border-[#E4E4E7]/30 bg-[#E4E4E7]/5'
                            : 'border-[#27272A] bg-[#111113] hover:border-[#3F3F46]'
                        )}
                      >
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                          selectedResolution === r.id ? 'bg-[#E4E4E7]/15' : 'bg-[#1E1E21]'
                        )}>
                          <r.icon className={cn('h-4 w-4', selectedResolution === r.id ? 'text-[#E4E4E7]' : 'text-[#52525B]')} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#FAFAFA]">{r.label}</p>
                          <p className="text-xs text-[#71717A]">{r.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setStep('confirm')}
                  disabled={!selectedReason || !selectedResolution}
                  className="w-full h-10 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-semibold gap-2 disabled:opacity-40"
                >
                  İnceleyip Onayla <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {/* Step: Confirm */}
            {step === 'confirm' && order && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-lg font-bold text-[#FAFAFA]">İade Özeti</h2>
                  <p className="text-sm text-[#71717A] mt-0.5">Bilgilerinizi kontrol edip onaylayın</p>
                </div>
                <div className="rounded-2xl border border-[#27272A] bg-[#111113] divide-y divide-[#1E1E21] overflow-hidden">
                  <div className="px-5 py-4">
                    <p className="text-xs text-[#52525B] uppercase tracking-wide mb-2">Sipariş</p>
                    <p className="text-sm font-medium text-[#FAFAFA] font-mono">{order.number}</p>
                    <p className="text-xs text-[#71717A]">{order.customer}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-[#52525B] uppercase tracking-wide mb-2">İade Ürünleri</p>
                    {order.items.filter((i) => selectedItems.includes(i.id)).map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-1">
                        <p className="text-sm text-[#FAFAFA]">{item.name}</p>
                        <span className="text-sm font-medium text-[#FAFAFA]">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#52525B] uppercase tracking-wide mb-1">Sebep</p>
                      <p className="text-sm text-[#FAFAFA]">
                        {reasons.find((r) => r.id === selectedReason)?.label}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#52525B] uppercase tracking-wide mb-1">Çözüm</p>
                      <p className="text-sm text-[#FAFAFA]">
                        {resolutions.find((r) => r.id === selectedResolution)?.label}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#0E0E10] border border-[#1E1E21] text-xs text-[#71717A] leading-relaxed">
                  Talebiniz onaylandıktan sonra e-posta adresinize kargo etiketi gönderilecektir. Ürünleri aldığımızda seçtiğiniz çözüm yöntemine göre işlem yapılacaktır.
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full h-10 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-semibold gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-[#09090B]/30 border-t-[#09090B] rounded-full animate-spin" />
                  ) : (
                    <><Check className="h-4 w-4" /> İade Talebini Gönder</>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Step: Success */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto"
                >
                  <Check className="h-9 w-9 text-green-400" />
                </motion.div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#FAFAFA]">İade Talebiniz Alındı</h2>
                  <p className="text-sm text-[#71717A] max-w-sm mx-auto">
                    E-posta adresinize kargo etiketi ve takip bilgileri gönderildi. İadenizi takip edebilirsiniz.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#FAFAFA]">Talep oluşturuldu</p>
                      <p className="text-xs text-[#52525B]">RET-2026-048 numarasıyla</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                      <Truck className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#FAFAFA]">Kargo etiketi hazır</p>
                      <p className="text-xs text-[#52525B]">E-postanızı kontrol edin</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setStep('lookup');
                    setOrderInput('');
                    setEmail('');
                    setOrder(null);
                    setSelectedItems([]);
                    setSelectedReason('');
                    setSelectedResolution('');
                  }}
                  className="text-xs text-[#52525B] hover:text-[#A1A1AA] transition-colors"
                >
                  Yeni iade başlat
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
