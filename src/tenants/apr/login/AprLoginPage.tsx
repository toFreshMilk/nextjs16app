'use client';

import { useState } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

export default function AprLoginPage() {
  const { config } = useAppConfig();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = `/${config.id}/dashboard`;
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50/30 p-4">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl p-10 border border-rose-100">
        <div className="text-center mb-10">
          {/* APR 로고 (텍스트로 대체) */}
          <h1 className="text-5xl font-black text-rose-600 tracking-tighter mb-2">APR</h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Global Beauty Tech</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-rose-400 font-bold">APR ID</label>
              <input 
                type="email" 
                defaultValue="employee@apr-corp.com"
                className="w-full px-4 py-3 bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition text-sm"
              />
            </div>
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-rose-400 font-bold">Password</label>
              <input 
                type="password" 
                defaultValue="........"
                className="w-full px-4 py-3 bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition text-sm tracking-widest"
              />
            </div>
          </div>

          <div className="flex justify-between text-sm text-rose-600 font-medium">
            <button type="button" className="hover:underline">인트라넷 계정 찾기</button>
            <button type="button" className="hover:underline text-slate-400">비밀번호 재설정</button>
          </div>

          <div className="space-y-3 pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition shadow-lg shadow-rose-200 active:translate-y-0.5 disabled:opacity-70"
            >
              {loading ? '인증 중...' : '로그인'}
            </button>
            
            <button 
              type="button"
              className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition shadow-sm text-sm flex items-center justify-center gap-2"
            >
              <span>🏢</span> 외부 협력사 로그인
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-[10px] text-slate-300">
          COPYRIGHT © APR CORPORATION. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  );
}

