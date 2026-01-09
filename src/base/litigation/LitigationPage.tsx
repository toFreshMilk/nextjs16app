// src/base/litigation/LitigationPage.tsx
'use client';
import React from 'react';
import StandardLayout from '@/base/layout/StandardLayout';

export default function LitigationPage() {
    return (
        <StandardLayout>
            <h1 className="text-2xl font-bold mb-6">소송 관리</h1>
            <div className="bg-white p-6 rounded shadow-sm min-h-[400px]">
                <p className="text-gray-500">소송 관리 목록 영역</p>
            </div>
        </StandardLayout>
    );
}