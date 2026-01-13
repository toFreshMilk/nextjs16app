import { BarChart } from '@/uikit/chart/BarChart';

export function DashboardChart() {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h3 className="text-lg font-bold mb-4">Monthly Trends</h3>
            <BarChart data={[10, 20, 15, 30, 40]} labels={['Jan', 'Feb', 'Mar', 'Apr', 'May']} />
        </div>
    );
}
