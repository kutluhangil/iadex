'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  animate?: boolean;
}

const sizes = {
  sm: { icon: 20, text: 'text-base' },
  md: { icon: 28, text: 'text-xl' },
  lg: { icon: 40, text: 'text-3xl' },
};

export function Logo({ size = 'md', className, showText = true, animate = false }: LogoProps) {
  const { icon, text } = sizes[size];

  const content = (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* Icon mark */}
      <div
        className="relative flex items-center justify-center rounded-lg bg-[#E4E4E7] shrink-0"
        style={{ width: icon, height: icon }}
      >
        <svg
          width={icon * 0.6}
          height={icon * 0.6}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z"
            stroke="#09090B"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 2V8M8 8L14 5.5M8 8L2 5.5M8 8V14"
            stroke="#09090B"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <span className={cn('font-bold tracking-tight text-[#FAFAFA]', text)}>
          iadex
        </span>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
