'use client';
import DashboardPage from '@/standard/dashboard/DashboardPage';

export default function DemoDashboardPage() {
    return (
        <div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg mb-6 flex justify-between items-center">
                <span>🚀 This is a demo environment. Data resets every 24 hours.</span>
                <button className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-bold">Upgrade</button>
            </div>
            {/* Reuse Standard Dashboard Logic */}
            <DashboardPage />
        </div>
    );
}
