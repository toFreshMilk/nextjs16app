// src/base/admin/index.tsx
'use client';
import dynamic from 'next/dynamic';
const AdminPage = dynamic(() => import('./AdminPage'));
export default function AdminSwitcher() { return <AdminPage />; }