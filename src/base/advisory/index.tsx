// src/base/advisory/index.tsx
'use client';
import dynamic from 'next/dynamic';
const AdvisoryPage = dynamic(() => import('./AdvisoryPage'));
export default function AdvisorySwitcher() { return <AdvisoryPage />; }