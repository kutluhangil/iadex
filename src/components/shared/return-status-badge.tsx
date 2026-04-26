'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type ReturnStatus =
  | 'pending'
  | 'approved'
  | 'label_created'
  | 'shipped'
  | 'received'
  | 'inspected'
  | 'refunded'
  | 'rejected';

const statusConfig: Record<ReturnStatus, { label: string; labelEn: string; className: string; dot: string }> = {
  pending: {
    label: 'Beklemede',
    labelEn: 'Pending',
    className: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    dot: 'bg-yellow-400',
  },
  approved: {
    label: 'Onaylandı',
    labelEn: 'Approved',
    className: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    dot: 'bg-blue-400',
  },
  label_created: {
    label: 'Etiket Hazır',
    labelEn: 'Label Ready',
    className: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    dot: 'bg-indigo-400',
  },
  shipped: {
    label: 'Kargoda',
    labelEn: 'Shipped',
    className: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    dot: 'bg-purple-400',
  },
  received: {
    label: 'Alındı',
    labelEn: 'Received',
    className: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    dot: 'bg-orange-400',
  },
  inspected: {
    label: 'İncelendi',
    labelEn: 'Inspected',
    className: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    dot: 'bg-cyan-400',
  },
  refunded: {
    label: 'Geri Ödendi',
    labelEn: 'Refunded',
    className: 'bg-green-500/10 text-green-400 border border-green-500/20',
    dot: 'bg-green-400',
  },
  rejected: {
    label: 'Reddedildi',
    labelEn: 'Rejected',
    className: 'bg-red-500/10 text-red-400 border border-red-500/20',
    dot: 'bg-red-400',
  },
};

interface StatusBadgeProps {
  status: ReturnStatus;
  locale?: string;
  animate?: boolean;
  showDot?: boolean;
  className?: string;
}

export function ReturnStatusBadge({
  status,
  locale = 'tr',
  animate = false,
  showDot = false,
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const label = locale === 'tr' ? config.label : config.labelEn;

  const badge = (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full',
        config.className,
        className
      )}
    >
      {showDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
      )}
      {label}
    </span>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {badge}
      </motion.div>
    );
  }

  return badge;
}
