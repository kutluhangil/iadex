'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocaleSwitcherProps {
  className?: string;
  variant?: 'icon' | 'full';
}

export function LocaleSwitcher({ className, variant = 'icon' }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-8 gap-1.5 text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]',
            className
          )}
        >
          {variant === 'full' ? (
            <>
              <span>{localeFlags[locale]}</span>
              <span className="text-xs font-medium">{localeNames[locale]}</span>
            </>
          ) : (
            <Languages className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#1F1F23] border-[#27272A] min-w-[140px]">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLocale(l)}
            className={cn(
              'cursor-pointer gap-2 text-sm',
              l === locale
                ? 'text-[#FAFAFA] bg-[#27272A]'
                : 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A]'
            )}
          >
            <span>{localeFlags[l]}</span>
            <span>{localeNames[l]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
