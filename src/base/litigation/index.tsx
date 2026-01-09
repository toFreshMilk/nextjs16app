// src/base/litigation/index.tsx
'use client';
import dynamic from 'next/dynamic';
const LitigationPage = dynamic(() => import('./LitigationPage'));
export default function LitigationSwitcher() { return <LitigationPage />; }