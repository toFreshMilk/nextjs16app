import { BarChart } from '@/uikit/chart/BarChart';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export function DashboardChart() {
  const { config } = useAppConfig();
  
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 transition-shadow hover:shadow-xl hover:shadow-slate-200/50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">월별 계약 체결 추이</h3>
          <p className="text-sm text-slate-500 mt-1">최근 6개월간의 데이터를 보여줍니다.</p>
        </div>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 text-slate-600 outline-none focus:ring-2 focus:ring-slate-200">
          <option>최근 6개월</option>
          <option>최근 1년</option>
        </select>
      </div>
      
      <div className="h-64">
        <BarChart 
          data={[45, 72, 58, 91, 64, 85]} 
          labels={['1월', '2월', '3월', '4월', '5월', '6월']}
          color={config.theme.primaryColor}
        />
      </div>
    </div>
  );
}

