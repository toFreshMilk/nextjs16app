// src/core/services/serviceAction.ts
'use server';

import { revalidatePath } from 'next/cache';
import { getTenantService } from '@/core/config/tenant.config';
import type { ServiceKey } from '@/core/config/tenant.types';

// 보안을 위해 실행 가능한 메서드를 제한하고 싶다면 여기에 추가 (선택사항)
// const ALLOWED_METHODS = new Set(['approve', 'reject', 'create', 'update']);

export async function executeServiceAction(prevState: any, formData: FormData) {
  // 1. FormData 파싱
  const tenantId = formData.get('tenantId') as string;
  const serviceKey = formData.get('serviceKey') as ServiceKey;
  const methodName = formData.get('methodName') as string;
  const revalidateUrl = formData.get('revalidateUrl') as string;
  const argsJson = formData.get('args') as string;

  // 필수값 검증
  if (!tenantId || !serviceKey || !methodName) {
    return {
      success: false,
      message: 'Missing required parameters (tenantId, serviceKey, methodName)',
    };
  }

  try {
    // 2. 인자 파싱 (JSON 배열)
    // 예: [tenantId, contractId, { status: 'Active' }]
    const args = argsJson ? JSON.parse(argsJson) : [];

    // [변경점 1] throw 대신 직접 에러 응답 리턴
    if (!Array.isArray(args)) {
      return {
        success: false,
        message: 'Arguments must be an array',
      };
    }

    // 3. 서비스 로드 (타입은 동적이므로 any)
    const service = await getTenantService<any>(tenantId, serviceKey);

    // [변경점 2] throw 대신 직접 에러 응답 리턴
    // 4. 메서드 존재 여부 확인
    if (!service || typeof service[methodName] !== 'function') {
      return {
        success: false,
        message: `Method '${methodName}' not found in service '${serviceKey}'`,
      };
    }

    // 5. 실제 서비스 메서드 실행
    // await service.approve(tenantId, contractId) 와 동일
    const result = await service[methodName](...args);

    // 6. 성공 시 페이지 갱신
    //  router.refresh(); // 현재 페이지만 갱신 (빠름) 이거랑 조절해서 써야함.
    if (revalidateUrl) {
      const paths = revalidateUrl
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      for (const path of paths) {
        revalidatePath(path);
      }
    }

    // 서비스 메서드가 리턴한 값이 있다면 포함해서 응답
    return {
      success: true,
      message: 'Action executed successfully',
      data: result,
    };
  } catch (error) {
    // [변경점 3] 검증 로직은 위에서 return으로 처리했으므로,
    // 여기는 진짜 예측 불가능한 시스템 에러(DB 연결 실패, 내부 로직 에러 등)만 잡힘
    console.error(`[ServiceAction Error] ${serviceKey}.${methodName}:`, error);

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
