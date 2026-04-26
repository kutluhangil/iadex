'use client';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import {
  ExternalLink, Copy, Check, Smartphone, Monitor,
  Palette, Globe, Eye,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const storeSlug = 'moda-store';
const portalUrl = `/tr/portal/${storeSlug}`;

export default function PortalPreviewPage() {
  const locale = useLocale();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://iadex.io/portal/${storeSlug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            Müşteri Portalı
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-[#71717A] mt-0.5"
          >
            Müşterilerinizin iade başlattığı sayfa
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8 gap-1.5 border-[#27272A] bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Kopyalandı' : 'Linki Kopyala'}
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1.5 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium"
            asChild
          >
            <Link href={portalUrl} target="_blank">
              <ExternalLink className="h-3.5 w-3.5" />
              Portala Git
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-4 gap-4"
      >
        {[
          { label: 'Bu Ay Ziyaret', value: '284', icon: Eye },
          { label: 'İade Başlatıldı', value: '31', icon: Globe },
          { label: 'Dönüşüm Oranı', value: '%10.9', icon: Palette },
          { label: 'Ort. Süre', value: '2.4 dk', icon: Smartphone },
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
        className="grid grid-cols-3 gap-5"
      >
        {/* Preview */}
        <div className="col-span-2 space-y-3">
          {/* View mode toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-[#111113] border border-[#27272A]">
              {([
                { mode: 'desktop', icon: Monitor },
                { mode: 'mobile', icon: Smartphone },
              ] as const).map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    'px-2.5 py-1 rounded-md flex items-center gap-1.5 text-xs font-medium transition-all',
                    viewMode === mode ? 'bg-[#27272A] text-[#FAFAFA]' : 'text-[#71717A] hover:text-[#A1A1AA]'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {mode === 'desktop' ? 'Masaüstü' : 'Mobil'}
                </button>
              ))}
            </div>
            <span className="text-xs text-[#52525B]">
              iadex.io/portal/{storeSlug}
            </span>
          </div>

          {/* Iframe preview */}
          <Card className="bg-[#0E0E10] border-[#27272A] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1E1E21]">
              <div className="flex gap-1.5">
                {['bg-red-500/50', 'bg-yellow-500/50', 'bg-green-500/50'].map((c, i) => (
                  <div key={i} className={cn('w-2.5 h-2.5 rounded-full', c)} />
                ))}
              </div>
              <div className="flex-1 mx-3 bg-[#1A1A1D] rounded-md px-3 py-1">
                <p className="text-xs text-[#3F3F46] font-mono">iadex.io/portal/{storeSlug}</p>
              </div>
            </div>
            <div className={cn(
              'flex items-start justify-center p-6 transition-all duration-300',
              viewMode === 'mobile' ? 'py-8' : ''
            )}>
              <div className={cn(
                'transition-all duration-300 overflow-hidden rounded-xl',
                viewMode === 'mobile' ? 'w-80' : 'w-full'
              )}>
                <iframe
                  src={portalUrl}
                  className="w-full border-0"
                  style={{ height: viewMode === 'mobile' ? '600px' : '480px' }}
                  title="Müşteri Portalı Önizleme"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Settings sidebar */}
        <div className="space-y-4">
          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h3 className="text-xs font-semibold text-[#71717A] uppercase tracking-wide mb-4">Portal Ayarları</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#71717A] block mb-1.5">Portal Linki</label>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0E0E10] border border-[#27272A]">
                  <p className="text-xs font-mono text-[#A1A1AA] flex-1 truncate">
                    iadex.io/portal/{storeSlug}
                  </p>
                  <button onClick={handleCopy} className="text-[#52525B] hover:text-[#FAFAFA] transition-colors shrink-0">
                    {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: 'Ücretsiz Kargo Etiketi', enabled: true },
                  { label: 'Fotoğraf Yükleme', enabled: false },
                  { label: 'Otomatik Onay', enabled: false },
                  { label: 'Müşteri Notu', enabled: true },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <span className="text-xs text-[#A1A1AA]">{setting.label}</span>
                    <div className={cn(
                      'w-7 h-4 rounded-full relative transition-colors cursor-pointer',
                      setting.enabled ? 'bg-[#E4E4E7]/20' : 'bg-[#27272A]'
                    )}>
                      <div className={cn(
                        'absolute top-0.5 w-3 h-3 rounded-full transition-all',
                        setting.enabled ? 'left-3.5 bg-[#E4E4E7]' : 'left-0.5 bg-[#52525B]'
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h3 className="text-xs font-semibold text-[#71717A] uppercase tracking-wide mb-4">İade Politikası</h3>
            <div className="space-y-2.5">
              {[
                { label: 'İade Süresi', value: '14 gün' },
                { label: 'Geri Ödeme', value: 'Ödeme yöntemi' },
                { label: 'Değişim', value: 'Açık' },
                { label: 'Mağaza Kredisi', value: 'Açık' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-[#71717A]">{item.label}</span>
                  <span className="text-xs font-medium text-[#FAFAFA]">{item.value}</span>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 mt-4 border-[#27272A] bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]"
            >
              Politikayı Düzenle
            </Button>
          </Card>

          <Card className="p-5 bg-[#111113] border-[#27272A]">
            <h3 className="text-xs font-semibold text-[#71717A] uppercase tracking-wide mb-3">Entegrasyon</h3>
            <p className="text-xs text-[#71717A] mb-3 leading-relaxed">
              Bu kodu Shopify temanıza ekleyerek portala erişim sağlayın.
            </p>
            <div className="p-3 rounded-lg bg-[#0E0E10] border border-[#1E1E21] font-mono text-[10px] text-[#71717A] leading-relaxed break-all">
              {`<a href="https://iadex.io/portal/${storeSlug}">İade Başlat</a>`}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
