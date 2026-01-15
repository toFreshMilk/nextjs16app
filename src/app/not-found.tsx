// src/app/not-found.tsx
'use client';
import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-4">Workspace Not Found</p>
      <Link href="/" className="text-blue-600 underline">Go Home</Link>
    </div>
  );
}

