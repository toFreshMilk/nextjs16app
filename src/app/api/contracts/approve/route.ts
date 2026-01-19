// src/app/api/contracts/approve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { setMockContractOverride } from '@/mock-data/contracts/contracts';

export const dynamic = 'force-dynamic';

type Body = {
  tenant?: string;
  id?: string | number;
  comment?: string;
};

export async function POST(req: NextRequest) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    // ignore (non-json)
  }

  const tenant = (body.tenant ?? '').trim().toLowerCase() || 'standard';
  const id = body.id ?? '';

  if (!String(id)) {
    return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  }

  // 승인 시 'Done' 또는 'Active' 상태로 변경 (데모 로직)
  // 실제로는 DB 업데이트
  const success = setMockContractOverride(tenant, id, {
    status: 'Done', // 승인 완료 처리
  });

  if (!success) {
    return NextResponse.json({ ok: false, error: 'Contract not found' }, { status: 404 });
  }

  // 로그 등 추가 작업 수행 가능 (comment 사용)
  console.log(`[API] Contract approved: ${tenant}/${id}, comment: ${body.comment}`);

  return NextResponse.json({
    ok: true,
    tenant,
    id,
    comment: body.comment ?? '',
    status: 'Done'
  });
}
