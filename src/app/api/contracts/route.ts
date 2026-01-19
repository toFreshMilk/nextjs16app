// src/app/api/contracts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMockContracts } from '@/mock-data/contracts/contracts';

// 정적 캐싱 방지 (항상 최신 데이터)
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const tenant = req.nextUrl.searchParams.get('tenant');
  const data = getMockContracts(tenant);
  return NextResponse.json(data);
}
