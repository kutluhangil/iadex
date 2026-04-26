'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar — hidden on mobile, slides in as overlay */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-0 z-40 lg:hidden"
          >
            <Sidebar onClose={() => setMobileSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <Header onMenuClick={() => setMobileSidebarOpen((v) => !v)} />

      <main className={cn('lg:ml-60 pt-14 min-h-screen', className)}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="p-4 md:p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
