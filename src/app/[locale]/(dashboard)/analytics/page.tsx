'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';

const lineData = [
  { day: 'Pzt', returns: 3 }, { day: 'Sal', returns: 7 }, { day: 'Çar', returns: 4 },
  { day: 'Per', returns: 8 }, { day: 'Cum', returns: 12 }, { day: 'Cmt', returns: 5 },
  { day: 'Paz', returns: 2 }, { day: 'Pzt', returns: 9 }, { day: 'Sal', returns: 11 },
  { day: 'Çar', returns: 6 }, { day: 'Per', returns: 8 }, { day: 'Cum', returns: 14 },
  { day: 'Cmt', returns: 7 }, { day: 'Paz', returns: 3 },
];

const reasonData = [
  { name: 'Hatalı Ürün', value: 32, color: '#EF4444' },
  { name: 'Yanlış Ürün', value: 24, color: '#3B82F6' },
  { name: 'Tarife Uymuyor', value: 18, color: '#8B5CF6' },
  { name: 'Fikir Değişikliği', value: 14, color: '#F59E0B' },
  { name: 'Beden Sorunu', value: 8, color: '#22C55E' },
  { name: 'Diğer', value: 4, color: '#6B7280' },
];

const productData = [
  { name: 'Mavi Kazak XL', returns: 12 },
  { name: 'Siyah Pantolon', returns: 9 },
  { name: 'Kırmızı Elbise', returns: 8 },
  { name: 'Beyaz Gömlek', returns: 6 },
  { name: 'Yeşil Mont', returns: 5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1F1F23] border border-[#27272A] rounded-lg px-3 py-2">
        <p className="text-xs text-[#71717A] mb-1">{label}</p>
        <p className="text-sm font-medium text-[#FAFAFA]">
          {payload[0].value} iade
        </p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const t = useTranslations('analytics');
  const [range, setRange] = useState('14d');

  const ranges = [
    { key: '7d', label: '7G' },
    { key: '14d', label: '14G' },
    { key: '30d', label: '30G' },
    { key: '90d', label: '90G' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-[#FAFAFA] tracking-tight"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-[#71717A] mt-0.5"
          >
            {t('subtitle')}
          </motion.p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-[#111113] border border-[#27272A]">
            {ranges.map((r) => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  range === r.key
                    ? 'bg-[#27272A] text-[#FAFAFA]'
                    : 'text-[#71717A] hover:text-[#A1A1AA]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-[#27272A] bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]"
          >
            <Download className="h-3.5 w-3.5" />
            CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {[
          { label: 'Toplam İade', value: '47', change: +12, up: true },
          { label: 'İade Oranı', value: '%4.2', change: -0.3, up: false },
          { label: 'Ort. Çözüm', value: '3.2 gün', change: -0.5, up: false },
          { label: 'Geri Ödeme', value: '₺12.4K', change: +8, up: true },
        ].map((stat, i) => (
          <motion.div key={i} variants={staggerItem}>
            <Card className="p-5 bg-[#111113] border-[#27272A]">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-[#71717A]">{stat.label}</span>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.up ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <p className="text-2xl font-bold text-[#FAFAFA] tabular-nums">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-5"
      >
        {/* Line Chart */}
        <Card className="xl:col-span-2 p-6 bg-[#111113] border-[#27272A]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-[#FAFAFA]">{t('charts.returnTrend')}</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#E4E4E7]" />
              <span className="text-xs text-[#71717A]">İade Sayısı</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E21" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: '#52525B', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#52525B', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={24}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="returns"
                stroke="#E4E4E7"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#E4E4E7', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6 bg-[#111113] border-[#27272A]">
          <h2 className="text-sm font-semibold text-[#FAFAFA] mb-6">{t('charts.reasonBreakdown')}</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={reasonData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {reasonData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-1.5">
            {reasonData.slice(0, 4).map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-[#71717A] truncate max-w-[120px]">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-[#A1A1AA]">%{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-[#111113] border-[#27272A]">
          <h2 className="text-sm font-semibold text-[#FAFAFA] mb-6">{t('charts.topProducts')}</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={productData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E21" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: '#52525B', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: '#71717A', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="returns" fill="#27272A" radius={[0, 4, 4, 0]}>
                {productData.map((_, index) => (
                  <Cell key={index} fill={index === 0 ? '#E4E4E7' : '#27272A'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
}
