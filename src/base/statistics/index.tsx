// src/base/statistics/index.tsx
'use client';
import dynamic from 'next/dynamic';
const StatisticsPage = dynamic(() => import('./StatisticsPage'));
export default function StatisticsSwitcher() { return <StatisticsPage />; }