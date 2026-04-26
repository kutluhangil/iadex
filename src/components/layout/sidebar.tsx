'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  RotateCcw,
  ShoppingBag,
  Users,
  Tag,
  Zap,
  BarChart3,
  Settings,
  CreditCard,
  Eye,
  Plus,
  ChevronRight,
  X,
} from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  key: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNav: NavItem[] = [
  { key: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'returns', href: '/returns', icon: RotateCcw },
  { key: 'orders', href: '/orders', icon: ShoppingBag },
  { key: 'customers', href: '/customers', icon: Users },
  { key: 'labels', href: '/labels', icon: Tag },
  { key: 'automations', href: '/automations', icon: Zap },
  { key: 'analytics', href: '/analytics', icon: BarChart3 },
];

const bottomNav: NavItem[] = [
  { key: 'portalPreview', href: '/portal-preview', icon: Eye },
  { key: 'billing', href: '/settings/billing', icon: CreditCard },
  { key: 'settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export function Sidebar({ className, onClose }: SidebarProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    if (href === '/dashboard') return pathname === fullPath;
    return pathname.startsWith(fullPath);
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen w-60 flex-col',
        'bg-[#0D0D0F] border-r border-[#1E1E21]',
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center px-5 border-b border-[#1E1E21] justify-between">
        <Link href={`/${locale}/dashboard`} onClick={onClose}>
          <Logo size="sm" />
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-[#52525B] hover:text-[#FAFAFA] transition-colors lg:hidden">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* New Return CTA */}
      <div className="px-3 pt-4 pb-2">
        <Link href={`/${locale}/returns/new`}>
          <Button
            size="sm"
            className="w-full h-8 gap-2 bg-[#E4E4E7] text-[#09090B] hover:bg-[#D4D4D8] font-medium text-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            {t('newReturn')}
          </Button>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-0.5">
          {mainNav.map((item) => {
            const active = isActive(item.href);
            return (
              <motion.div
                key={item.key}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={`/${locale}${item.href}`}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors duration-150',
                    active
                      ? 'bg-[#18181B] text-[#FAFAFA] font-medium'
                      : 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B]/60'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-4 w-4 shrink-0',
                      active ? 'text-[#FAFAFA]' : 'text-[#52525B]'
                    )}
                  />
                  <span className="flex-1">{t(item.key)}</span>
                  {active && (
                    <ChevronRight className="h-3 w-3 text-[#52525B]" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Bottom Nav */}
      <div className="border-t border-[#1E1E21] px-2 py-3">
        <div className="space-y-0.5">
          {bottomNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors duration-150',
                  active
                    ? 'bg-[#18181B] text-[#FAFAFA] font-medium'
                    : 'text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B]/60'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {t(item.key)}
              </Link>
            );
          })}
        </div>

        {/* Plan badge */}
        <div className="mt-3 mx-1 p-3 rounded-lg bg-[#18181B] border border-[#27272A]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-[#FAFAFA]">Trial</span>
            <span className="text-xs text-[#71717A]">12 gün kaldı</span>
          </div>
          <div className="h-1 bg-[#27272A] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#E4E4E7] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '14%' }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <Link
            href={`/${locale}/settings/billing`}
            className="mt-2 block text-xs text-[#71717A] hover:text-[#FAFAFA] transition-colors"
          >
            Plan yükselt →
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}
