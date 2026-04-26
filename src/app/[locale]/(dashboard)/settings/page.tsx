'use client';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Store, CreditCard, Users, Bell, Plug, ChevronRight,
  Globe, Shield, Palette,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';

const settingsSections = [
  {
    icon: Store,
    title: 'Mağaza Ayarları',
    description: 'Shopify bağlantısı, mağaza bilgileri, iade politikası',
    href: '/settings/store',
    badge: null,
  },
  {
    icon: CreditCard,
    title: 'Fatura & Plan',
    description: 'Mevcut plan, kullanım durumu, faturalar',
    href: '/settings/billing',
    badge: 'Trial',
  },
  {
    icon: Users,
    title: 'Ekip Üyeleri',
    description: 'Kullanıcılar, roller ve erişim yönetimi',
    href: '/settings/team',
    badge: '1/1',
  },
  {
    icon: Bell,
    title: 'Bildirimler',
    description: 'E-posta, Slack ve webhook bildirimleri',
    href: '/settings/notifications',
    badge: null,
  },
  {
    icon: Plug,
    title: 'Entegrasyonlar',
    description: 'Kargo şirketleri, Shopify ve diğer entegrasyonlar',
    href: '/settings/integrations',
    badge: null,
  },
  {
    icon: Palette,
    title: 'Portal Özelleştirme',
    description: 'Müşteri portal tasarımı, logo ve renkler',
    href: '/portal-preview',
    badge: null,
  },
  {
    icon: Globe,
    title: 'Dil & Bölge',
    description: 'Uygulama dili, para birimi, saat dilimi',
    href: '/settings/general',
    badge: 'TR',
  },
  {
    icon: Shield,
    title: 'Güvenlik',
    description: 'Şifre, iki faktörlü doğrulama, oturum yönetimi',
    href: '/settings/security',
    badge: null,
  },
];

export default function SettingsPage() {
  const locale = useLocale();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-[#FAFAFA] tracking-tight"
        >
          Ayarlar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-[#71717A] mt-0.5"
        >
          Hesabınızı ve mağazanızı yönetin
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-2"
      >
        {settingsSections.map((section) => (
          <motion.div key={section.href} variants={staggerItem}>
            <Link href={`/${locale}${section.href}`}>
              <Card className="p-4 bg-[#111113] border-[#27272A] hover:border-[#3F3F46] hover:bg-[#18181B]/30 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center shrink-0 group-hover:border-[#3F3F46] transition-colors">
                    <section.icon className="h-4 w-4 text-[#71717A] group-hover:text-[#A1A1AA] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-medium text-[#FAFAFA]">{section.title}</h3>
                      {section.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#27272A] text-[#71717A] font-medium">
                          {section.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#71717A] truncate">{section.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#3F3F46] group-hover:text-[#52525B] transition-colors shrink-0" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
