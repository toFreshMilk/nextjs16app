import { NextRequest, NextResponse } from 'next/server';
import { getMockContracts } from '@/mock-data/contracts/contracts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const tenant = req.nextUrl.searchParams.get('tenant');
  const data = getMockContracts(tenant);
  return NextResponse.json(data);
}

