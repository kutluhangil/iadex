'use client';
import { useTranslations } from 'next-intl';
import { Search, Bell, User, ChevronDown, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  className?: string;
  onMenuClick?: () => void;
}

export function Header({ title, className, onMenuClick }: HeaderProps) {
  const t = useTranslations('common');

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 right-0 z-30 flex h-14 items-center gap-3 border-b border-[#1E1E21]',
        'bg-[#09090B]/80 backdrop-blur-sm px-4 md:px-6',
        'left-0 lg:left-60',
        className
      )}
    >
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="h-8 w-8 text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B] lg:hidden shrink-0"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Search */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#52525B]" />
        <Input
          placeholder={t('search')}
          className={cn(
            'pl-9 h-8 bg-[#141416] border-[#27272A] text-[#FAFAFA]',
            'placeholder:text-[#52525B] text-sm',
            'focus-visible:border-[#52525B] focus-visible:ring-1 focus-visible:ring-[#52525B]/30',
          )}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#52525B] font-mono hidden md:block">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Locale Switcher */}
        <LocaleSwitcher />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B] relative"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-400" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] pl-1 pr-2"
            >
              <div className="w-6 h-6 rounded-full bg-[#27272A] flex items-center justify-center">
                <User className="h-3 w-3 text-[#71717A]" />
              </div>
              <span className="text-xs font-medium hidden sm:block">Mağaza</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#1F1F23] border-[#27272A]">
            <DropdownMenuItem className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] cursor-pointer">
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] cursor-pointer">
              {t('settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#27272A]" />
            <DropdownMenuItem className="text-sm text-red-400 hover:text-red-300 hover:bg-[#27272A] cursor-pointer">
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}
