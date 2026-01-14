'use client';

import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <Link 
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

