// src/app/[lang]/error.tsx
'use client';

import { useEffect } from 'react';

export default function TenantError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Tenant Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">An unexpected error occurred within the tenant application.</p>
        <button onClick={() => reset()} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
          Try again
        </button>
      </div>
    </div>
  );
}
