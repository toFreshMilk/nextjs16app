// src/base/admin/AdminPage.tsx
'use client';
import React from 'react';
import StandardLayout from '@/base/layout/StandardLayout';

export default function AdminPage() {
    return (
        <StandardLayout>
            <h1 className="text-2xl font-bold mb-6">관리자 설정</h1>
            <div className="bg-white p-6 rounded shadow-sm min-h-[400px]">
                <p className="text-gray-500">사용자 관리 및 시스템 설정 영역</p>
            </div>
        </StandardLayout>
    );
}
