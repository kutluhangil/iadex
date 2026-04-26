'use client';
import { motion } from 'framer-motion';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <Sidebar />
      <Header />
      <main
        className={cn(
          'ml-60 pt-14 min-h-screen',
          className
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
