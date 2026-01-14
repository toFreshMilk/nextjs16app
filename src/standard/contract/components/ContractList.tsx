export function ContractList() {
  const contracts = [
    { id: 101, title: '2026년도 소프트웨어 유지보수 계약', partner: '(주)테크솔루션', status: 'Active', date: '2026-01-14', amount: '₩150,000,000' },
    { id: 102, title: '비밀유지서약서 (NDA)', partner: '스타트업 A', status: 'Draft', date: '2026-01-13', amount: '-' },
    { id: 103, title: '클라우드 서비스 이용 약관', partner: 'AWS Korea', status: 'Review', date: '2026-01-10', amount: '$5,000' },
    { id: 104, title: '마케팅 대행 용역 계약', partner: '애드에이전시', status: 'Expired', date: '2025-12-31', amount: '₩30,000,000' },
    { id: 105, title: '사무실 임대차 계약 갱신', partner: '위워크 타워', status: 'Active', date: '2025-11-20', amount: '₩24,000,000' },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Active: 'bg-green-100 text-green-700 ring-green-600/20',
      Draft: 'bg-slate-100 text-slate-700 ring-slate-600/20',
      Review: 'bg-orange-100 text-orange-700 ring-orange-600/20',
      Expired: 'bg-red-100 text-red-700 ring-red-600/20',
    };
    return styles[status] || styles['Draft'];
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 font-semibold text-slate-500 w-20">ID</th>
              <th className="px-6 py-4 font-semibold text-slate-500">계약명</th>
              <th className="px-6 py-4 font-semibold text-slate-500">거래처</th>
              <th className="px-6 py-4 font-semibold text-slate-500">상태</th>
              <th className="px-6 py-4 font-semibold text-slate-500">계약금액</th>
              <th className="px-6 py-4 font-semibold text-slate-500 text-right">등록일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {contracts.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors cursor-pointer">
                <td className="px-6 py-4 text-slate-400 font-mono">#{item.id}</td>
                <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-slate-600">{item.partner}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{item.amount}</td>
                <td className="px-6 py-4 text-slate-400 text-right">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Placeholder */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-500">
        <span>Showing 5 of 124 results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Prev</button>
          <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">Next</button>
        </div>
      </div>
    </div>
  );
}

