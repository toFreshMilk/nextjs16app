'use client';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { StatCard } from '@/uikit/card/StatCard';

export default function DashboardPage() {
    const { config } = useAppConfig();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard Overviewㅂㅂㅂㅂㅂㅂ</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Active Contracts" value="150" />
                <StatCard title="Pending Approvals" value="12" highlight />
                <StatCard title="Expiring Soon" value="5" />
            </div>

            {config.features.ai && (
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <h3 className="font-semibold text-indigo-900">AI Legal Assistant Active</h3>
                    <p className="text-sm text-indigo-700">Contract analysis is running in background.</p>
                </div>
            )}
        </div>
    );
}
