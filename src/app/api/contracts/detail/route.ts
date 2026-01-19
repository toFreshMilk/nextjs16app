// src/app/api/contracts/detail/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMockContracts } from '@/mock-data/contracts/contracts';

export const dynamic = 'force-dynamic';

// 상세 정보도 예시로 전체 리스트에서 필터링하는 구조를 가정 (실무에선 DB 조회)
export async function GET(req: NextRequest) {
  const tenant = req.nextUrl.searchParams.get('tenant');
  const data = getMockContracts(tenant);
  return NextResponse.json(data);
}
