'use client';

import { BarChart } from '@/uikit/chart/BarChart';

export default function AprDashboardPage() {
  const cards = [
    { title: '결재 진행중', value: 12, sub: '건' },
    { title: '승인 대기', value: 4, sub: '건', highlight: true },
    { title: '이번 달 완료', value: 158, sub: '건' },
    { title: '반려', value: 2, sub: '건', alert: true },
  ];

  return (
    <div className="flex gap-6 bg-slate-50/50 p-6 -m-10 min-h-screen">
      <div className="flex-1 space-y-6">
        
        {/* 상단 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {cards.map((c, i) => (
            <div key={i} className={`p-6 rounded-2xl shadow-sm border flex flex-col justify-between h-32 transition-transform hover:-translate-y-1 ${
              c.highlight ? 'bg-rose-50 border-rose-100' : 
              c.alert ? 'bg-red-50 border-red-100' : 'bg-white border-slate-100'
            }`}>
              <h3 className={`font-bold text-sm ${c.highlight ? 'text-rose-800' : 'text-slate-500'}`}>{c.title}</h3>
              <div className="text-right">
                <span className={`text-4xl font-bold ${c.highlight ? 'text-rose-600' : c.alert ? 'text-red-600' : 'text-slate-900'}`}>
                  {c.value}
                </span>
                <span className="text-xs text-slate-400 ml-1">{c.sub}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* 차트 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* KPI 카드 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-500 mb-4">평균 계약 검토 소요 시간</h3>
            <div className="space-y-6 mt-8">
              <div className="flex justify-between items-end border-b border-rose-100 pb-2">
                <span className="text-sm font-bold text-rose-900">Global (US/JP)</span>
                <div>
                  <span className="text-4xl font-bold text-slate-900">2.1</span> <span className="text-sm text-slate-500">day</span>
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                <span className="text-sm font-bold text-slate-700">Domestic (KR)</span>
                <div>
                  <span className="text-4xl font-bold text-slate-900">0.8</span> <span className="text-sm text-slate-500">day</span>
                </div>
              </div>
            </div>
          </div>

          {/* 도넛 차트 (CSS) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center relative">
            <h3 className="absolute top-6 left-6 text-sm font-bold text-slate-600">계약 유형별 비중</h3>
            <div className="w-40 h-40 rounded-full border-[16px] border-rose-500 flex items-center justify-center relative mt-4">
              <div className="text-center">
                <div className="text-xs text-slate-500">Active Docs</div>
                <div className="text-3xl font-bold text-slate-900">1,240</div>
              </div>
              {/* Fake Donut Segments */}
              <div className="absolute inset-0 rounded-full border-[16px] border-slate-200 border-l-transparent border-b-transparent rotate-45 pointer-events-none"></div>
            </div>
            <div className="flex gap-4 mt-6 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-rose-500"></span> 유통/판매</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-300"></span> 기타</span>
            </div>
          </div>

          {/* 바 차트 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h3 className="text-sm font-bold text-slate-600 mb-4">국가별 계약 체결 현황</h3>
             <BarChart 
               data={[85, 45, 60, 30, 20]} 
               labels={['KR', 'US', 'JP', 'CN', 'HK']}
               color="#e11d48" // Rose-600
             />
          </div>
        </div>

        {/* 하단 공지사항 (APR 스타일) */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg text-white flex justify-between items-center">
           <div>
             <div className="flex items-center gap-2 mb-1">
               <span className="bg-rose-600 text-xs px-2 py-0.5 rounded font-bold">NOTICE</span>
               <span className="font-bold text-lg">2026년도 상반기 표준 계약서 양식 업데이트 안내</span>
             </div>
             <p className="text-slate-400 text-sm">해외 법인 계약 시 필수 첨부 서류가 변경되었습니다. 확인 부탁드립니다.</p>
           </div>
           <button className="px-4 py-2 border border-slate-600 rounded hover:bg-white hover:text-slate-900 transition text-sm">자세히 보기</button>
        </div>
      </div>

      {/* 우측 사이드바 (일정, 버튼) */}
      <div className="w-72 space-y-4 hidden xl:block">
         <button className="w-full py-4 bg-rose-600 text-white font-bold rounded-lg shadow-lg shadow-rose-200 hover:bg-rose-700 transition flex items-center justify-center gap-2">
           <span>✍️</span> 신규 계약 작성
         </button>
         <button className="w-full py-4 bg-white text-rose-600 border border-rose-200 font-bold rounded-lg shadow-sm hover:bg-rose-50 transition flex items-center justify-center gap-2">
           <span>⚖️</span> 법률 자문 요청
         </button>

         {/* 캘린더 위젯 */}
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
           <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
             <h3 className="font-bold text-lg text-rose-900">Schedule</h3>
             <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full">Today</span>
           </div>
           
           {/* 달력 그리드 */}
           <div className="text-center mb-4 font-bold text-slate-800">JANUARY 2026</div>
           <div className="grid grid-cols-7 text-xs text-center gap-y-4 mb-6 text-slate-500 font-medium">
             <span className="text-red-400">S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
             <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
             <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
             <span>12</span><span>13</span><span className="w-6 h-6 bg-rose-600 text-white rounded-full mx-auto flex items-center justify-center shadow-md shadow-rose-300">14</span><span>15</span><span>16</span><span>17</span>
           </div>

           <div className="space-y-3">
             <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-rose-500 text-xs">
               <span className="block font-bold text-slate-700 mb-1">14:00 PM</span>
               미국 법인 계약 검토 회의 (Zoom)
             </div>
             <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-slate-300 text-xs text-slate-400">
               <span className="block font-bold text-slate-500 mb-1">17:00 PM</span>
               주간 업무 보고 마감
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}

