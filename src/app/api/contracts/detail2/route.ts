// src/app/api/contracts/detail2/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMockContracts } from '@/mock-data/contracts/contracts';

export const dynamic = 'force-dynamic';

// 추가 정보(우측 패널용) 예시 엔드포인트
export async function GET(req: NextRequest) {
  const tenant = req.nextUrl.searchParams.get('tenant');
  const data = getMockContracts(tenant);
  return NextResponse.json(data);
}
